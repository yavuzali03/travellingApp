const multer = require('multer');
const mime = require('mime-types');
const path = require('path');
const User = require('../models/User');
const Trip = require('../models/Trip');
const MessageRoom = require('../models/MessageRoom');
//const {compressImage, compressVideo} = require('./compressMediaFiles.js')
const fs = require('fs');

// Ortak storage yapılandırması dinamik hale getirilir
const createStorage = (folderName, nameGenerator) => multer.diskStorage({
    destination: (req, file, cb) => cb(null, `uploads/${folderName}`),
    filename: (req, file, cb) => {
        const ext = mime.extension(file.mimetype) || 'bin';
        const filename = nameGenerator(req, ext);
        cb(null, filename);
    }
});

// 🧩 Ortak multer wrapper
const createUploader = (storage, fieldName = 'media') => multer({ storage }).single(fieldName);



// 📌 1. Profil resmi yükle
const uploadProfileImage = (req, res) => {
    const storage = createStorage('profile-images', (req, ext) =>
        `${req.params.userId || 'default'}.${ext}`
    );
    const upload = createUploader(storage, 'image');

    upload(req, res, async function (err) {
        if (err) return res.status(500).json({ error: "G\u00f6rsel y\u00fckleme hatas\u0131" });
        if (!req.file) return res.status(400).json({ error: "Dosya bulunamad\u0131" });

        const fileUrl = `http://${req.hostname}:5002/uploads/profile-images/${req.file.filename}`;

        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { profileImage: fileUrl },
                { new: true }
            );

            return res.status(200).json({
                imageUrl: fileUrl,
                message: 'Profil resmi g\u00fcncellendi.',
                user
            });
        } catch (e) {
            return res.status(500).json({ error: "Veritaban\u0131 hatas\u0131" });
        }
    });
};


// 📌 2. Mesaj medyası yükle
const uploadMessageMedia = (req, res) => {
    const storage = createStorage('message-media', (req, ext) =>
        `msg_${Date.now()}.${ext}`
    );
    const upload = createUploader(storage);

    upload(req, res, async function (err) {
        if (err) return res.status(500).json({ error: "Medya yükleme hatası" });
        if (!req.file) return res.status(400).json({ error: "Dosya bulunamadı" });

        try {
            const fileUrl = `http://${req.hostname}:5002/uploads/message-media/${req.file.filename}`;
            return res.status(200).json({ url: fileUrl, message: 'Medya başarıyla yüklendi.' });
        } catch (e) {
            console.error("⚠️ Medya yükleme hatası:", e);
            return res.status(500).json({ error: "Yükleme sırasında hata oluştu." });
        }
    });
};


const uploadTripProfileImage = (req, res) => {
    const storage = createStorage('trip-profile-images', (req, ext) =>
        `${req.params.tripId || 'trip'}.${ext}`
    );
    const upload = createUploader(storage, 'image');

    upload(req, res, async function (err) {
        if (err) return res.status(500).json({ error: "Görsel yükleme hatası" });
        if (!req.file) return res.status(400).json({ error: "Dosya bulunamadı" });

        const fileUrl = `http://${req.hostname}:5002/uploads/trip-profile-images/${req.file.filename}`;

        try {
            const trip = await Trip.findByIdAndUpdate(
                req.params.tripId,
                { profileImage: fileUrl },
                { new: true }
            );

            await MessageRoom.updateOne(
                { roomId: `trip_${trip._id}` },
                { groupPhoto: fileUrl }
            );

            return res.status(200).json({
                imageUrl: fileUrl,
                message: 'Gezi kapak görseli güncellendi.',
                trip
            });
        } catch (e) {
            return res.status(500).json({ error: "Veritabanı hatası" });
        }
    });
};
module.exports = {
    uploadProfileImage,
    uploadMessageMedia,
    uploadTripProfileImage
};
