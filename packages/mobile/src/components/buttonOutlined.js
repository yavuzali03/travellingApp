import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from "react-native";
import React from "react";

export const ButtonOutlined = ({onPress, title , width , height}) => {

    const borderRadius = height/3;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button , {width : width , height : height , borderRadius : borderRadius}]}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const {width , height} = Dimensions.get("window");
const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderColor : "#ED1C24",
        borderWidth: 3,
    },
    buttonText: {
        fontSize: 18,
        color: "#ED1C24",
        fontWeight : "bold"
    }
})
