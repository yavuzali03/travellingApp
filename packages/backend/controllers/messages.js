const Room = require('../models/MessageRoom.js');

const getMessages = async (req, res) => {
    const { roomId } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    try {
        const room = await Room.findOne({ roomId })
            .populate('messages.sender', 'firstName lastName username profileImage email phoneNumber')
            .populate('messages.seenBy.user', 'firstName lastName username profileImage email phoneNumber')
            .lean();

        if (!room) {
            return res.status(404).json({ error: 'Oda bulunamadı.' });
        }

        const messages = room.messages || [];

        // 🔁 Paginasyon uygula
        const paginatedMessages = messages
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .slice(skip, skip + limit);

        res.json(paginatedMessages);
    } catch (err) {
        console.error("⚠️ Hata:", err.message);
        res.status(500).json({ error: 'Mesajlar alınırken hata oluştu.' });
    }
};




const getUserRooms = async (req, res) => {
    try {
        const userId = req.params.userId;

        const rooms = await Room.find({ participants: userId })
            .populate('participants', 'firstName lastName username profileImage email phoneNumber')
            .populate('messages.sender', 'firstName lastName username profileImage email phoneNumber')
            .populate('messages.seenBy.user', 'firstName lastName username profileImage email phoneNumber')
            .lean();

        const roomsWithLastMessageAndUnread = rooms.map(room => {
            const messages = room.messages || [];

            // ✅ Tarihsel olarak en yeni mesajı bul (garanti)
            const lastMessage = messages.length > 0
                ? messages.reduce((latest, msg) =>
                        new Date(msg.createdAt) > new Date(latest.createdAt) ? msg : latest
                    , messages[0])
                : null;

            // ✅ Unread count hesapla
            let unreadCount = 0;
            for (const msg of messages) {
                if (String(msg.sender?._id || msg.sender) === userId) continue;

                const seenBy = msg.seenBy || [];
                const isSeen = seenBy.some(entry =>
                    String(entry.user?._id || entry.user) === userId
                );

                if (!isSeen) unreadCount++;
            }

            return {
                roomId: room.roomId,
                roomType: room.roomType,
                participants: room.participants,
                groupName: room.groupName,
                groupPhoto: room.groupPhoto,
                lastMessage,
                unreadCount
            };
        });

        const sortedRooms = roomsWithLastMessageAndUnread.sort((a, b) => {
            const aTime = new Date(a.lastMessage?.createdAt || 0);
            const bTime = new Date(b.lastMessage?.createdAt || 0);
            return bTime - aTime;
        });

        res.json(sortedRooms);
    } catch (err) {
        console.error('Room fetch error:', err);
        res.status(500).json({ message: "Sohbetler alınamadı", error: err.message });
    }
};



module.exports = { getMessages ,getUserRooms };
