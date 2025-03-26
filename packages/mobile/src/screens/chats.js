import {SafeAreaView, StyleSheet, Text} from "react-native";

export const Chats = ()=>{
    return (
        <SafeAreaView style={styles.container}>
            <Text>Chats</Text>
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
