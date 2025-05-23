import {Image, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useStyle} from "../contexts/styleContext";
import {useNavigation} from "@react-navigation/native";
import React from "react";

export const RenderItem = ({item}) => {

    const {width, height} = useWindowDimensions();
    const styleContext = useStyle();
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("profile", {userId: item._id})}>
        <View style={styleContext.renderItemContainer}>
            <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "center" ,}}>
                <Image
                    source={{ uri: item.profileImage }}
                    style={styleContext.avatar}
                />
                <Text style={[styleContext.text ,{paddingLeft : 10}]}>{item.username}</Text>
            </View>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faEllipsisVertical} size={24} color={"#313335"}/>
            </TouchableOpacity>

        </View>
        </TouchableOpacity>
    )
}
