import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {TopBar} from "../components/topBar";

export const MyTrips = ()=>{
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar isBackground={false} title={"Gezilerim"} buttonNumber={1}/>
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
