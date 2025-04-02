import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from "react-native";
import React from "react";

export const ButtonOutlined = ({onPress, title}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const {width , height} = Dimensions.get("window");
const styles = StyleSheet.create({
    button: {
        width: width * 0.8,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginTop: 20,
        borderColor : "#ED1C24",
        borderWidth: 3,
    },
    buttonText: {
        fontSize: 18,
        color: "#ED1C24",
        fontWeight : "bold"
    }
})
