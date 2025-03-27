import {View, Text, SafeAreaView,StyleSheet} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useUser} from "../contexts/userContext";

export const Home = ()=>{
    const navigation = useNavigation();

    const {user} = useUser()
    console.log("homescreen 1: ",user)

    return (
        <SafeAreaView style={styles.container}>
            <Text>hoşgeldiniz</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "center",
        alignItems: "center"
    }
})
