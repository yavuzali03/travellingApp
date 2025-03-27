import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {TopBar} from "../components/topBar";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

export const MyTrips = ()=>{
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar isBackground={false} title={"Gezilerim"} buttonNumber={1} leftIcon={faAngleLeft} />
                <Text>gezilerim</Text>
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
