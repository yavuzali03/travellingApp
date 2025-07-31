import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions ,Image} from "react-native";
import { useUser } from "../contexts/userContext";
import { TopBar } from "../components/topBar";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import useAuthViewModel from "../viewmodels/authViewModel";
import { useStyle } from "../contexts/styleContext";
import { NavItem } from "../components/navItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import useUserViewModel from "../viewmodels/userViewModel";
import { ButtonFilled } from "../components/buttonFilled";
import FriendsViewModel from "../viewmodels/friendsViewModel";
import {ButtonOutlined} from "../components/buttonOutlined";

export const Profile = () => {
    const { user: currentUser } = useUser();
    const { handleLogout } = useAuthViewModel();
    const { getUserData } = useUserViewModel();
    const { sendRequest , cancelRequest} = FriendsViewModel();
    const styleContext = useStyle();
    const navigation = useNavigation();
    const route = useRoute();
    const { width, height } = Dimensions.get("window");

    const [userData, setUserData] = useState(null);
    const [friendStatus, setFriendStatus] = useState(null);

    const isMyProfile = !route.params?.userId || route.params?.userId === currentUser._id;

    useEffect(() => {
        const targetUserId = route.params?.userId;

        if (isMyProfile) {
            setUserData(currentUser);
        } else {
            getUserData({ userId: targetUserId }).then((data) => {
                if (data) setUserData(data);
                else console.warn("Kullanıcı verisi gelmedi");
            });

            const isFriend = currentUser.friends?.includes(targetUserId);
            const isSent = currentUser.friendRequests?.some(
                (r) => r.friendId === targetUserId && r.direction === "sent"
            );
            const isReceived = currentUser.friendRequests?.some(
                (r) => r.friendId === targetUserId && r.direction === "received"
            );

            if (isFriend) setFriendStatus("friend");
            else if (isReceived) setFriendStatus("received");
            else if (isSent) setFriendStatus("sent");
            else setFriendStatus(null);
        }
    }, []);

    console.log(userData);

    const handleSendRequest = async () => {
        try {
            await sendRequest(currentUser._id, userData._id);
            setFriendStatus("sent");
        } catch (error) {
            console.error("Arkadaşlık isteği gönderilemedi:", error);
        }
    };

    const handleCancelRequest = async () => {
        try {
            await cancelRequest(currentUser._id, userData._id);
            setFriendStatus(null);
        }catch (error) {
            console.log(error)
        }
    }

    if (!userData) return <Text>Yükleniyor...</Text>;

    const roomId = [currentUser._id, userData._id].sort().join("_");
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar
                    isBackground={false}
                    title={"Profil"}
                    buttonNumber={2}
                    rightIcon={isMyProfile ? faUserPen : null}
                    rightOnePress={()=>navigation.navigate("settings")}
                />

                <View style={styles.userContainer}>

                        <Image
                            source={{ uri: userData.profileImage }}
                            style={styles.avatar}
                        />

                    <Text style={styleContext.title}>{userData.username}</Text>
                    <Text style={styleContext.text}>{userData.firstName} {userData.lastName}</Text>
                </View>

                <View style={styles.profileContainer}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={styleContext.title}>Geziler</Text>
                        <Text style={[styleContext.title, { color: "#ED1C24" }]}>{userData.trips?.length ?? 0}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={styleContext.title}>Arkadaşlar</Text>
                        <Text style={[styleContext.title, { color: "#ED1C24" }]}>{userData.friends?.length ?? 0}</Text>
                    </View>
                </View>

                {isMyProfile ? (
                    <>
                        <NavItem onPress={() => navigation.navigate("friendsScreen")} />
                        <Text onPress={() => handleLogout()}>Çıkış Yap</Text>
                    </>
                ) : friendStatus === "friend" ? (
                    <>
                    <ButtonFilled width={width * 0.8} height={50} title={"Arkadaşsınız"} />
                        <View style={{margin : 10}}></View>
                    <ButtonFilled  width={width * 0.8} height={50} title={"mesaj gönder"} onPress={() =>
                        navigation.navigate("chat", {
                            roomId,
                            roomType: "private", // 🔥 bu eksikti
                            currentUser: currentUser._id,
                            otherUser: {
                                _id: userData._id,
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                username: userData.username,
                                profileImage: userData.profileImage,
                            }
                        })}/>
                    </>
                ) : friendStatus === "received" ? (
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <ButtonFilled
                            width={width * 0.38}
                            height={50}
                            title={"Kabul Et"}
                            onPress={() => console.log("Kabul Et")}
                        />
                        <ButtonFilled
                            width={width * 0.38}
                            height={50}
                            title={"Reddet"}
                            onPress={() => console.log("Reddet")}
                        />
                    </View>
                ) : friendStatus === "sent" ? (
                    <ButtonOutlined
                        width={width * 0.8}
                        height={50}
                        title={"İstek Gönderildi"}
                        onPress={() => handleCancelRequest()}
                    />
                ) : (
                    <ButtonFilled
                        width={width * 0.8}
                        height={50}
                        title={"Arkadaş Ekle"}
                        onPress={()=>handleSendRequest()}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    userContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: height * 0.3,
    },
    avatar: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        backgroundColor: "green"
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: width,
        height: width * 0.16,
        marginBottom: 20
    }
});
