import React, {useState} from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Keyboard,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const { width } = Dimensions.get("window");

export const SearchBar = ({ value, setValue, setOnSearch }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        setOnSearch(true);
    };


    const handleClear = () => {
        setValue("");
        setOnSearch(false);
        setIsFocused(false);
        Keyboard.dismiss();
    };

    return (
        <View style={styles.textInputView}>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="#B2B4B6" />
            </TouchableOpacity>

            <TextInput
                keyboardType="default"
                returnKeyType="search"
                placeholder="Kullanıcı ara"
                placeholderTextColor="gray"
                style={styles.textInput}
                value={value}
                onChangeText={setValue}
                onFocus={handleFocus}
            />

            {isFocused && (
                <TouchableOpacity onPress={handleClear} style={{position :"absolute",right : 10}}>
                    <FontAwesomeIcon icon={faXmark} size={24} color="#B2B4B6" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: width * 0.6,
        paddingHorizontal: 10,
    },
    textInputView: {
        margin: 4,
        width: width * 0.8,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        borderRadius: 16,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#F3F3EB",
        backgroundColor: "#F3F3EB",
    },
});
