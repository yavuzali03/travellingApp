const http = require('http');
const { Server } = require('socket.io');
const Room = require('../models/MessageRoom');
const User = require('../models/User');

let io;
const onlineUsers = new Set(); // ✅ Çevrimiçi kullanıcıları tutar

const socketIo = (app) => {
    const server = http.createServer(app);

    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log('✅ Yeni kullanıcı bağlandı:', socket.id);

        // 📥 Odaya katılım
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`📥 ${socket.id} joined room: ${roomId}`);
        });

        // 📨 Mesaj gönderildi
        socket.on('send_message', async ({ roomId, roomType, message }) => {
            try {
                let room = await Room.findOne({ roomId });

                if (!room) {
                    room = await Room.create({
                        roomId,
                        roomType,
                        participants: [message.sender, ...(roomType === "private" ? [message.receiver] : [])],
                        groupName: message.groupName || null,
                        groupPhoto: message.groupPhoto || null,
                        messages: [],
                    });
                    console.log("🆕 Yeni oda oluşturuldu:", roomId);
                }

                const newMessage = {
                    sender: message.sender,
                    content: message.content,
                    messageType: message.messageType || 'text',
                    createdAt: new Date(),
                    seenBy: [{
                        user: message.sender,
                        seenAt: new Date(),
                    }]
                };

                room.messages.push(newMessage);
                await room.save();

                room.participants.forEach(uid => {
                    io.to(uid.toString()).emit('rooms_updated');
                });

                const populatedSender = await User.findById(message.sender).select('firstName lastName username');

                const finalMessage = {
                    ...newMessage,
                    sender: populatedSender,
                    _id: room.messages[room.messages.length - 1]._id,
                };

                io.to(roomId).emit('receive_message', {
                    ...finalMessage,
                    roomId,
                });

            } catch (err) {
                console.error("❌ Mesaj kaydederken hata:", err.message);
            }
        });

        // 👁 Mesaj görüldü
        socket.on('seen_message', async ({ roomId, userId }) => {
            try {
                const now = new Date();
                const room = await Room.findOne({ roomId });
                if (!room) return;

                let modified = false;
                const startIndex = Math.max(0, room.messages.length - 50);

                for (let i = startIndex; i < room.messages.length; i++) {
                    const msg = room.messages[i];
                    if (String(msg.sender) === userId) continue;

                    const alreadySeen = msg.seenBy?.some(entry => String(entry.user) === userId);
                    if (!alreadySeen) {
                        msg.seenBy.push({ user: userId, seenAt: now });
                        modified = true;
                    }
                }

                if (modified) {
                    await Room.updateOne({ roomId }, { $set: { messages: room.messages } });

                    room.participants.forEach(uid => {
                        io.to(uid.toString()).emit('rooms_updated');
                    });

                    socket.to(roomId).emit('message_seen', { roomId, userId });
                }

            } catch (err) {
                console.error("❌ Mesaj görüldü güncellenemedi:", err.message);
            }
        });

        // ✍️ Yazıyor...
        socket.on('typing', ({ roomId, userId }) => {
            socket.to(roomId).emit('user_typing', { roomId, userId });
        });

        // 🟢 Çevrimiçi oldum
        socket.on('online', ({ userId }) => {
            socket.userId = userId;
            onlineUsers.add(userId); // ✅ listeye ekle
            socket.broadcast.emit('user_online', { userId });
            console.log('🟢 Online:', userId);
        });

        // 🔄 Online kontrol (manuel)
        socket.on('check_online', ({ userId }) => {
            const isOnline = onlineUsers.has(userId);
            socket.emit('check_online_response', { userId, isOnline });
        });

        // 🔴 Bağlantı kesildi
        socket.on('disconnect', () => {
            if (socket.userId) {
                onlineUsers.delete(socket.userId); // ❌ listeden çıkar
                socket.broadcast.emit('user_offline', { userId: socket.userId });
                console.log('🔴 Offline:', socket.userId);
            } else {
                console.log('🔌 Kullanıcı ayrıldı:', socket.id);
            }
        });
    });

    return server;
};

module.exports = socketIo;
module.exports.getIo = () => io;
