import {View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions} from "react-native";
import {useUser} from "../contexts/userContext";
import {TopBar} from "../components/topBar";
import {faAngleLeft, faAngleRight, faUserPen} from "@fortawesome/free-solid-svg-icons";
import useAuthViewModel from "../viewmodels/authViewModel";
import {useStyle} from "../contexts/styleContext";
import {NavItem} from "../components/navItem";
import {useNavigation} from "@react-navigation/native";

export const Profile = ()=> {
    const {user} = useUser();
    const navigation = useNavigation();
    const styleContext = useStyle();
    const {handleLogout} = useAuthViewModel();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar isBackground={false} title={"Profil"} buttonNumber={2} rightIcon={faUserPen}  />

                <View style={styles.userContainer}>
                            <View style={styles.avatar}></View>
                    <Text style={styleContext.title}>{user.username}</Text>
                    <Text style={styleContext.text}>{user.firstName} {user.lastName}</Text>
                </View>

                <View style = {styles.profileContainer}>

                    <View style={{justifyContent : "center" , alignItems: "center"}}>
                        <Text style={styleContext.title}>Geziler</Text>
                        <Text style={[styleContext.title , {color : "#ED1C24"}]}>{user.trips.length}</Text>
                    </View>

                    <View style={{justifyContent : "center" , alignItems: "center"}}>
                        <Text style={styleContext.title}>Arkadaşlar</Text>
                        <Text style={[styleContext.title , {color : "#ED1C24"}]}>{user.friends.length}</Text>
                    </View>

                </View>
                    <NavItem onPress={()=>navigation.getParent().navigate("friendsScreen")}/>

                <Text onPress={()=>handleLogout()}>Çıkış Yap </Text>
            </View>

        </SafeAreaView>
    )
}
const {width, height} = Dimensions.get("window");
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
        width : width,
        height : height*0.3,
    },
    avatar : {
        width : width*0.3,
        height : width*0.3,
        borderRadius: width*0.15,
        backgroundColor : "green"
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width : width,
        height : width*0.16,
        marginBottom : 20
    }
})
