import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {TopBar} from "../components/topBar";
import React, {useEffect, useState} from "react";
import {ButtonFilled} from "../components/buttonFilled";
import {ButtonOutlined} from "../components/buttonOutlined";
import { MultiSelect } from "react-native-element-dropdown";
import {useUser} from "../contexts/userContext";
import useUserViewModel from "../viewmodels/userViewModel";
import {useStyle} from "../contexts/styleContext";

import TripViewModel from "../viewmodels/tripViewModel";
import {DropdownList} from "../components/dropdownList";
import useFriendsViewModel from "../viewmodels/friendsViewModel";

export const CreateTrips = ()=>{

    const [friends, setFriends] = useState([]);
    const {user} = useUser();
    const {getFriendsData} = useFriendsViewModel();
    const styleContext = useStyle();
    const { createTrip } = TripViewModel();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [participants, setParticipants] = useState([]);



    useEffect(() => {
        async function getFriends(userId) {
            const response = await getFriendsData(userId);

            const formattedFriends = response.map(friend => ({
                label: friend.username,
                value: friend._id,
            }));

            setFriends(formattedFriends);
        }

        getFriends(user._id);
    }, []);

    const handleCreate = async () => {
        try {
            const result = await createTrip({
                creator: user._id,
                title,
                description,
                participants, // MultiSelect’ten gelen array
            });

            console.log("Gezi oluşturuldu:", result);
        } catch (err) {
            console.error("Gezi oluşturulamadı:", err.message);
        }
    };

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

                <View style={[styles.textInputView , {height: width*0.4 , alignItems: "flex-start"}]}>
                    <TextInput
                        keyboardType="default"
                        returnKeyType="next"
                        placeholder="gezi açıklaması"
                        placeholderTextColor="gray"
                        style={[styles.textInput, { height: "100%", textAlignVertical: "top" }]}
                        value={description}
                        multiline={true}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>

                <DropdownList data={friends} value={participants} setValue={setParticipants} />


                <ButtonFilled title={"oluştur"} onPress={handleCreate} width={width*0.8} height={50} />

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
        width: width * 0.8,
        color: "gray",
        fontFamily: "Montserrat-Regular",
        paddingRight: 20,
    },
    textInputView: {
        margin : 4,
        backgroundColor: "rgba(230, 230, 223, 0.4)",
        width: width * 0.8,
        height:  50,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 16 ,
        paddingHorizontal: 10,

    },
})
