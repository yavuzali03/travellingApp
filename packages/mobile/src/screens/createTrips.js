import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {TopBar} from "../components/topBar";
import React, {useState} from "react";
import {ButtonFilled} from "../components/buttonFilled";
import {ButtonOutlined} from "../components/buttonOutlined";

export const CreateTrips = ()=>{

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [participants, setParticipants] = useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
               <TopBar title={"Yeni gezi oluştur"}/>

                <View style={styles.textInputView}>
                    <TextInput
                        keyboardType="default"
                        returnKeyType="next"
                        placeholder="gezi başlığı"
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                </View>

                <View style={styles.textInputView}>
                    <TextInput
                        keyboardType="default"
                        returnKeyType="next"
                        placeholder="gezi açıklaması"
                        placeholderTextColor="gray"
                        style={styles.textInput}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>


                <ButtonFilled title={"Oluştur"}/>
            </View>
        </SafeAreaView>
    )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    textInput: {
        width: width * 0.6,
        color: "gray",
        fontFamily: "Montserrat-Regular",
    },
    textInputView: {
        margin : 4,
        backgroundColor: "rgba(230, 230, 223, 0.4)",
        width: width * 0.8,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 16 ,
        paddingHorizontal: 10,

    },
})
