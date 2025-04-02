import {View, Text, SafeAreaView,StyleSheet} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useUser} from "../contexts/userContext";
import {SearchBar} from "../components/searchBar";
import {TopBar} from "../components/topBar";


export const Home = ()=>{
    const navigation = useNavigation();

    const {user} = useUser()
    console.log("homescreen 1: ",user)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <SearchBar />
                <Text>hoşgeldiniz</Text>
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
