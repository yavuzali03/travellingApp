import { useState, useEffect } from 'react';
import { socket } from '../services/socket';
import {fetchMessagesService, getAllMessages, uploadMessageMediaService} from "../services/messageServices";

const fixImageUrl = (url) => {
    if (!url) return null;
    return url.replace('http://10.0.2.2:5002', 'http://localhost:5002');
};

const useMessageViewModel = ({ roomId = null, currentUser = null, otherUser = null, roomType = null, userId = null }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [rooms, setRooms] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(false);

    const isPrivate = roomType === 'private';

    const handleMessageInput = (text) => {
        setMessageInput(text);
        if (roomId && currentUser) {
            socket.emit('typing', { roomId, userId: currentUser });
        }
    };

    const getUserMessages = async () => {
        try {
            const response = await getAllMessages(userId);
            setRooms(response);
            return response;
        } catch (err) {
            console.error("Sohbet odaları alınamadı:", err.message);
            return [];
        }
    };

    const fetchMessages = async (append = false) => {
        if (!roomId) return;
        try {
            const skip = append ? messages.length : 0;
            const data = await fetchMessagesService(roomId, skip);
            const fixedData = data.map(msg => ({
                ...msg,
                content: msg.messageType === 'image' || msg.messageType === 'video' ? fixImageUrl(msg.content) : msg.content
            }));
            setMessages(prev =>
                append ? [...prev, ...fixedData] : fixedData
            );
        } catch (err) {
            console.error("Mesajları alırken hata:", err.message);
        }
    };

    let seenTimeout;

    const joinRoomAndListen = () => {
        if (!roomId) return;

        socket.emit('join_room', roomId);

        socket.on('receive_message', (msg) => {
            const fixedMsg = {
                ...msg,
                content: msg.messageType === 'image' || msg.messageType === 'video' ? fixImageUrl(msg.content) : msg.content
            };
            setMessages((prev) => [...prev, fixedMsg]);
        });

        socket.on('message_seen', ({ roomId: seenRoomId, userId: seenByUser }) => {
            if (seenRoomId !== roomId || seenByUser === currentUser) return;

            setMessages((prevMessages) =>
                prevMessages.map((msg) => {
                    const alreadySeen = msg.seenBy?.some(entry => entry.user === seenByUser);
                    if (!alreadySeen) {
                        return {
                            ...msg,
                            seenBy: [...(msg.seenBy || []), { user: seenByUser, seenAt: new Date() }],
                        };
                    }
                    return msg;
                })
            );
        });

        socket.on('user_typing', ({ roomId: typingRoomId, userId }) => {
            if (typingRoomId === roomId && userId !== currentUser) {
                setIsTyping(true);
                clearTimeout(seenTimeout);
                seenTimeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000); // 2 saniye sonra yazmayı bıraktı say
            }
        });

        socket.on('user_online', ({ userId: onlineUserId }) => {
            console.log("🟢 user_online geldi:", onlineUserId);
            if (otherUser && onlineUserId === otherUser._id) {
                setIsOnline(true);
            }
        });

        socket.on('user_offline', ({ userId: offlineUserId }) => {
            console.log("🔴 user_offline geldi:", offlineUserId);
            if (offlineUserId === otherUser?._id) {
                setIsOnline(false);
            }
        });
    };

    const sendMessage = () => {
        if (!messageInput.trim()) return;
        if (!roomId || !currentUser) return;

        const newMsg = {
            sender: currentUser,
            content: messageInput.trim(),
            messageType: 'text',
            ...(isPrivate && { receiver: otherUser }),
        };

        socket.emit('send_message', { roomId, roomType, message: newMsg });
        setMessageInput('');
    };

    const cleanup = () => {
        socket.off('receive_message');
        socket.off('message_seen');
        socket.off('rooms_updated');
        socket.off('user_typing');
        socket.off('user_online');
        socket.off('user_offline');

        clearTimeout(seenTimeout);
    };

    const seenMessage = () => {
        if (!roomId || !currentUser) return;
        socket.emit('seen_message', { roomId, userId: currentUser });
    };

    const listenForNewMessages = () => {
        socket.on('receive_message', (msg) => {
            console.log("🆕 Yeni mesaj geldi, sohbet listesi güncelleniyor");
            getUserMessages(); // ✅ unreadCount artık sadece buradan gelir
        });
    };

    const selectMediaAndSend = async (files) => {
        if (!files || files.length === 0) return;

        try {
            const uploads = await Promise.all(
                Array.from(files).map(async (file) => {
                    const uploadRes = await uploadMessageMediaService(file);

                    return {
                        sender: currentUser,
                        content: fixImageUrl(uploadRes.url),
                        messageType: file.type.startsWith('image') ? 'image' : 'video',
                        ...(isPrivate && { receiver: otherUser }),
                    };
                })
            );

            uploads.forEach((msg) => {
                socket.emit('send_message', { roomId, roomType, message: msg });
            });
        } catch (err) {
            console.error("⚠️ Toplu medya yükleme hatası:", err.message);
        }
    };

    // 🧠 Chat ekranı açıkken socket eventleri
    useEffect(() => {
        if (roomId && currentUser) {
            fetchMessages();
            joinRoomAndListen();
        }
        return cleanup;
    }, [roomId]);

    // 🔥 Chats ekranı açıkken rooms_updated event'ini dinle
    useEffect(() => {
        if (!roomId && userId) {
            const handleRoomsUpdate = () => {
                console.log("🔁 rooms_updated event alındı, sohbet listesi yenileniyor...");
                getUserMessages();
            };

            socket.on('rooms_updated', handleRoomsUpdate);
            return () => socket.off('rooms_updated', handleRoomsUpdate);
        }
    }, [roomId, userId]);

    useEffect(() => {
        if (otherUser?._id) {
            socket.emit('check_online', { userId: otherUser._id });

            const handleCheckOnlineResponse = ({ userId, isOnline }) => {
                if (userId === otherUser._id) {
                    setIsOnline(isOnline);
                }
            };

            socket.on('check_online_response', handleCheckOnlineResponse);
            return () => socket.off('check_online_response', handleCheckOnlineResponse);
        }
    }, [otherUser?._id]);

    return {
        // Chat ekranı için
        messages,
        messageInput,
        setMessageInput: handleMessageInput,
        sendMessage,
        seenMessage,
        isTyping,
        isOnline,
        selectMediaAndSend,
        fetchMessages,

        // Chats ekranı için
        getUserMessages,
        listenForNewMessages,
        rooms,
    };
};

export default useMessageViewModel;
