import {View, Text, StyleSheet, SafeAreaView} from "react-native";
import {useUser} from "../contexts/userContext";
import {TopBar} from "../components/topBar";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import useAuthViewModel from "../viewmodels/authViewModels";

export const Profile = ()=> {
    const {user} = useUser();
    const {handleLogout} = useAuthViewModel();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar isBackground={false} title={"Profil"} buttonNumber={2} leftIcon={faAngleLeft} rightIcon={faAngleRight} />
                <Text>Profile Screen</Text>
                <Text>{user.firstName}</Text>

                <Text onPress={()=>handleLogout()}>Çıkış Yap </Text>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "flex-start",
        alignItems: "center"
    }
})
