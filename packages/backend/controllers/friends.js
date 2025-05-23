
const User = require("../models/User.js");
const mongoose = require("mongoose");

const sendFriendRequest = async (req, res) => {
    const senderId = req.params.userId;        // Giriş yapan kullanıcı ID'si (URL'den geliyor)
    const { friendId } = req.body;             // İstek gönderilen kişi (body'den geliyor)

    if (senderId === friendId) {
        return res.status(400).json({ message: "Kendine istek gönderemezsin." });
    }

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(friendId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        if (sender.friends.includes(friendId)) {
            return res.status(400).json({ message: "Zaten arkadaşsınız." });
        }

        const alreadySent = sender.friendRequests.some(
            (req) => req.friendId.toString() === friendId && req.direction === 'sent'
        );
        if (alreadySent) {
            return res.status(400).json({ message: "Zaten istek gönderdiniz." });
        }

        sender.friendRequests.push({ friendId, direction: 'sent' });
        receiver.friendRequests.push({ friendId: senderId, direction: 'received' });

        await sender.save();
        await receiver.save();

        return res.status(200).json({ message: "Arkadaşlık isteği gönderildi." });
    } catch (error) {
        console.error("sendFriendRequest error:", error);
        return res.status(500).json({ message: "Bir hata oluştu." });
    }
};


const acceptFriendRequest = async (req, res) => {
    const receiverId = req.params.userId;      // Giriş yapan kullanıcı (isteği kabul eden)
    const { friendId } = req.body;             // İsteği gönderen kullanıcı

    try {
        const receiver = await User.findById(receiverId);
        const sender = await User.findById(friendId);

        if (!receiver || !sender) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        // İstek var mı kontrolü
        const hasReceived = receiver.friendRequests.some(
            (req) => req.friendId.toString() === friendId && req.direction === 'received'
        );
        const hasSent = sender.friendRequests.some(
            (req) => req.friendId.toString() === receiverId && req.direction === 'sent'
        );

        if (!hasReceived || !hasSent) {
            return res.status(400).json({ message: "Arkadaşlık isteği bulunamadı." });
        }

        // Arkadaş dizisine ekle
        receiver.friends.push(friendId);
        sender.friends.push(receiverId);

        // İstekleri friendRequests dizilerinden kaldır
        receiver.friendRequests = receiver.friendRequests.filter(
            (req) => req.friendId.toString() !== friendId
        );
        sender.friendRequests = sender.friendRequests.filter(
            (req) => req.friendId.toString() !== receiverId
        );

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Arkadaşlık isteği kabul edildi." });
    } catch (err) {
        console.error("acceptFriendRequest error:", err);
        res.status(500).json({ message: "Bir hata oluştu." });
    }
};


const declineFriendRequest = async (req, res) => {
    const receiverId = req.params.userId;      // Giriş yapan kullanıcı (reddeden)
    const { friendId } = req.body;             // İsteği gönderen kullanıcı

    try {
        const receiver = await User.findById(receiverId);
        const sender = await User.findById(friendId);

        if (!receiver || !sender) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        // İstek var mı kontrolü
        const hasReceived = receiver.friendRequests.some(
            (req) => req.friendId.toString() === friendId && req.direction === 'received'
        );
        const hasSent = sender.friendRequests.some(
            (req) => req.friendId.toString() === receiverId && req.direction === 'sent'
        );

        if (!hasReceived || !hasSent) {
            return res.status(400).json({ message: "Arkadaşlık isteği bulunamadı." });
        }

        // Sadece friendRequests'ten sil (friends'e ekleme yok)
        receiver.friendRequests = receiver.friendRequests.filter(
            (req) => req.friendId.toString() !== friendId
        );
        sender.friendRequests = sender.friendRequests.filter(
            (req) => req.friendId.toString() !== receiverId
        );

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Arkadaşlık isteği reddedildi." });
    } catch (err) {
        console.error("declineFriendRequest error:", err);
        res.status(500).json({ message: "Bir hata oluştu." });
    }
};

const cancelFriendRequest = async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;

    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const friendObjectId = new mongoose.Types.ObjectId(friendId);


        const userUpdate = await User.updateOne(
            { _id: userObjectId, "friendRequests.friendId": friendObjectId, "friendRequests.direction": "sent" },
            {
                $pull: {
                    friendRequests: {
                        friendId: friendObjectId,
                        direction: "sent"
                    }
                }
            }
        );


        const friendUpdate = await User.updateOne(
            { _id: friendObjectId, "friendRequests.friendId": userObjectId, "friendRequests.direction": "received" },
            {
                $pull: {
                    friendRequests: {
                        friendId: userObjectId,
                        direction: "received"
                    }
                }
            }
        );


        if (userUpdate.modifiedCount === 0 && friendUpdate.modifiedCount === 0) {
            return res.status(404).json({ message: "Silinecek istek bulunamadı." });
        }

        return res.status(200).json({ message: "Arkadaşlık isteği başarıyla geri çekildi." });
    } catch (err) {
        console.error("İstek geri çekme hatası:", err);
        return res.status(500).json({ message: "İstek geri çekilemedi.", error: err.message });
    }
};


const getFriends = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate("friends", "-password");

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        return res.status(200).json(user.friends);
    } catch (err) {
        console.error("getFriends error:", err.message);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};

const getFriendRequests = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).populate({
            path: 'friendRequests.friendId', // friendId alanını populate et
            select: 'firstName lastName email profilePic username', // hangi alanlar dönsün istiyorsan yaz
        });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const receivedRequests = user.friendRequests.filter(
            (req) => req.direction === "received"
        );

        return res.status(200).json(receivedRequests);
    } catch (err) {
        console.error("getFriendRequests error:", err.message);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};





module.exports = {sendFriendRequest, acceptFriendRequest , declineFriendRequest,getFriends,getFriendRequests,cancelFriendRequest}
