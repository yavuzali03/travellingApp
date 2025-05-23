import {View, StyleSheet, Text, Dimensions, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export const SearchBar = ({value ,setValue, onFocus})=>{

    return (
        <View style={styles.textInputView}>
            <TouchableOpacity >
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color={"#B2B4B6"}/>
            </TouchableOpacity>

            <TextInput
                keyboardType="default"
                returnKeyType="search"
                placeholder="Kullanıcı ara"
                placeholderTextColor="gray"
                style={styles.textInput}
                value={value}
                onChangeText={(text) => setValue(text)}
                onFocus={onFocus}
            />
        </View>
    )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    textInput: {
        width: width * 0.7,
        paddingHorizontal: 10
    },
    textInputView: {
        margin : 4,
        width: width * 0.8,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 16 ,
        paddingHorizontal: 10,
        borderWidth : 2,
        borderColor: "#F3F3EB",
        backgroundColor : "#F3F3EB"

    },
})
