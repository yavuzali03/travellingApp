import {SafeAreaView, StyleSheet, Text} from "react-native";

export const CreateTrips = ()=>{
    return (
        <SafeAreaView style={styles.container}>
            <Text>CreateTrips</Text>
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
