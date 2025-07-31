import React, { useEffect, useRef } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import useMessageViewModel from "../viewmodels/messageViewModel";
import { useIsFocused } from "@react-navigation/native";
import { useStyle } from "../contexts/styleContext";
import { MessageTopBar } from "../components/messageTopBar";
import { socket } from "../services/socket";
import { ChatBubble } from "../components/chatBubble";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export const ChatScreen = ({ route, navigation }) => {
    const {
        roomId,
        roomType,
        currentUser,
        otherUser,
        groupName,
        groupPhoto,
        participants
    } = route.params;

    const isFocused = useIsFocused();
    const styleContext = useStyle();
    const flatListRef = useRef(null);

    const {
        messages,
        messageInput,
        setMessageInput,
        sendMessage,
        seenMessage,
        isTyping,
        isOnline,
        selectMediaAndSend,
    } = useMessageViewModel({ roomId, currentUser, otherUser, roomType });

    const isPrivate = roomType === 'private';
    const allMediaMessages = messages.filter(m => m.messageType === 'image' || m.messageType === 'video');

    useEffect(() => {
        if (messages.length > 0 && isFocused && roomId && currentUser) {
            seenMessage();
        }
    }, [messages.length, isFocused, roomId, currentUser]);

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages.length]);

    const handleSendMessage = () => {
        sendMessage();
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderMessageItem = ({ item }) => {
        const isMine = item.sender._id === currentUser;

        const seenUserIds = (item.seenBy || []).map(entry =>
            typeof entry.user === 'object' ? entry.user._id : entry.user
        );
        const totalOthers = participants?.filter(p => p._id !== currentUser).length || 0;
        const othersSeenCount = seenUserIds.filter(id => id !== currentUser).length;

        const hasBeenSeen = roomType === 'private'
            ? othersSeenCount > 0
            : othersSeenCount >= totalOthers;

        const isMedia = item.messageType === 'image' || item.messageType === 'video';
        const indexOfThisMedia = isMedia
            ? allMediaMessages.findIndex(m => m.content === item.content)
            : -1;

        return (
            <TouchableOpacity
                onLongPress={() => {
                    navigation.navigate("messageInfo", {
                        message: {
                            ...item,
                            seenBy: item.seenBy?.map(entry => ({
                                ...entry,
                                seenAt: typeof entry.seenAt === 'string' ? entry.seenAt : entry.seenAt.toISOString()
                            }))
                        },
                        participants: participants || [],
                        currentUserId: currentUser
                    });
                }}
            >
                <ChatBubble
                    content={item.content}
                    isMine={isMine}
                    createdAt={item.createdAt}
                    hasBeenSeen={hasBeenSeen}
                    messageType={item.messageType}
                    mediaList={isMedia ? allMediaMessages : []}
                    mediaIndex={isMedia ? indexOfThisMedia : 0}
                />
            </TouchableOpacity>
        );
    };

    console.log(messages);

    return (
        <View style={[styleContext.container, { width: "100%" ,justifyContent :null , alignItems :null}]}>
            <MessageTopBar
                isGroup={roomType === 'group'}
                photoUrl={roomType === 'group' ? groupPhoto : otherUser?.profileImage}
                title={roomType === 'group' ? groupName : `${otherUser?.firstName} ${otherUser?.lastName}`}
                isTyping={isTyping}
                isOnline={isOnline}
                onBackPress={() => navigation.goBack()}
            />

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item, index) => item._id || index.toString()}
                renderItem={renderMessageItem}
                contentContainerStyle={{ padding: 12 }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                {/* 📎 Medya Gönder Butonu */}
                <TouchableOpacity onPress={selectMediaAndSend}>
                    <FontAwesomeIcon icon={faPaperclip} size={22} style={{ marginRight: 10 }} />
                </TouchableOpacity>

                {/* Mesaj inputu */}
                <TextInput
                    value={messageInput}
                    onChangeText={(text) => {
                        setMessageInput(text);
                        socket.emit('typing', { roomId, userId: currentUser });
                    }}
                    placeholder="Mesajınızı yazın"
                    style={{ flex: 1, borderWidth: 1, backgroundColor: '#FFF', padding: 8, borderRadius: 8 }}
                />

                {/* Gönder butonu */}
                <Button title="Gönder" onPress={handleSendMessage} color="#2D2D74" />
            </View>
        </View>
    );
};
