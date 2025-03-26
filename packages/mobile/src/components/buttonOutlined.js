import {StyleSheet, View} from "react-native";

export const ButtonOutlined = ()=>{
    return (
        <View style={styles.container}>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        width : 50,
        height : 0,
        position: "absolute",
    }
})
