import {FlatList, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";
import useMessageViewModel from "../viewmodels/messageViewModel";
import {useCallback, useEffect, useState} from "react";
import {TopBar} from "../components/topBar";

export const Chats = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const { getUserMessages, rooms,listenForNewMessages } = useMessageViewModel({ userId: user._id });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
            setIsLoading(true);
            if (user?._id)
                getUserMessages()
                    .then(()=>setIsLoading(false))

    }, [user]);

    useFocusEffect(
        useCallback(() => {
            getUserMessages();
            listenForNewMessages();
        }, [])
    );

    const getChatPhoto = (room, currentUserId) => {
        if (room.roomType === "private") {
            const otherUser = room.participants.find(p => p._id !== currentUserId);
            return otherUser?.profileImage;
        }
        return room.groupPhoto;
    };

    const getChatName = (room, currentUserId) => {
        if (room.roomType === "private") {
            const otherUser = room.participants.find(p => p._id !== currentUserId);
            return `${otherUser?.firstName || ""} ${otherUser?.lastName || ""}`;
        }
        return room.groupName || "Grup";
    };


    const renderChatItem = (room, currentUserId, navigation) => {
        const chatName = getChatName(room, currentUserId);
        const chatPhoto = getChatPhoto(room, currentUserId);

        const lastMessage = (() => {
            const msg = room.lastMessage;
            if (!msg) return "Henüz mesaj yok";
            if (msg.messageType === "image") return "📷 Fotoğraf";
            if (msg.messageType === "video") return "🎥 Video";
            return msg.content;
        })();

        const unreadCount = room.unreadCount || 0;

        return (
            <TouchableOpacity
                key={room._id}
                onPress={() =>
                    navigation.navigate("chat", {
                        roomId: room.roomId,
                        roomType: room.roomType,
                        currentUser: currentUserId,
                        otherUser:
                            room.roomType === "private"
                                ? room.participants.find(p => p._id !== currentUserId)
                                : null,
                        groupName: room.groupName,
                        groupPhoto: room.groupPhoto,
                        participants: room.participants,
                    })
                }
                style={styles.chatItem}
            >
                <View style={{flexDirection : "row" ,width : "100%"}}>
                    <Image source={{ uri: chatPhoto }} style={styles.chatImage} />
                    <View>
                            <Text style={styles.chatName}>{chatName}</Text>
                            <Text numberOfLines={1} style={styles.chatLastMessage}>
                                {lastMessage}
                            </Text>
                    </View>
                </View>
                {unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{unreadCount}</Text>
                    </View>
                )}

            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={[styles.container , {justifyContent : "flex-start" , alignItems : "center"}]}>
                <TopBar title={"Mesajlar"} />
                <Text>loading...</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <TopBar title={"Mesajlar"} />
            <FlatList
                keyExtractor={(item, index) => item._id || index.toString()}
                data={rooms}
                renderItem={({ item }) => renderChatItem(item, user._id, navigation)}
            />
        </SafeAreaView>
    );
};
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "center",
        alignItems: "center",
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal:  width*0.05 ,
        width: "100%",
        height: 70,
    },
    chatImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 10,
    },
    chatInfo: {
        flex: 1,
        justifyContent: "center",
    },
    chatName: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000",
    },
    chatLastMessage: {
        color: "#666",
        fontSize: 13,
        marginTop: 2,
    },
    unreadBadge: {
        position : "absolute",
        backgroundColor: "#FF3B30",
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        paddingHorizontal: 6,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        right : width*0.05,
    },
    unreadText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});
