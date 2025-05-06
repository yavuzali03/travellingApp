import {View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, TouchableOpacity} from "react-native";
import {useUser} from "../contexts/userContext";
import {TopBar} from "../components/topBar";
import {faAngleLeft, faAngleRight, faEllipsisVertical, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useStyle} from "../contexts/styleContext";
import useFriendsViewModel from "../viewmodels/friendsViewModel";


export const Friends = ()=> {
    const [friends, setFriends] = useState([]);
    const {user} = useUser(); 
    const {getFriendsData} = useFriendsViewModel();
    const styleContext = useStyle();

    useEffect(() => {
        getFriendsData(user._id).then(
            (response) => setFriends(response))
    }, []);

    console.log("friends 1: ",friends)

    const renderItem = ({item}) => {
        return (
            <View style={styleContext.renderItemContainer}>
                <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "center" ,}}>
                    <View style={{width : width*0.1 , height : width*0.1  , borderRadius : width*0.05 , backgroundColor : "red"}}></View>
                    <Text style={[styleContext.text ,{paddingLeft : 10}]}>{item.username}</Text>
                </View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEllipsisVertical} size={24} color={"#313335"}/>
                </TouchableOpacity>

            </View>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar  isBackground={false} title={"Arkadaşlar"} buttonNumber={1} leftIcon={faAngleLeft} rightIcon={faAngleRight} />
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => renderItem({item})} />
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
    userContainer: {
        alignItems: "center",
        justifyContent: "center",
        width : width,
        height : height*0.3,
    },
    avatar : {
        width : width*0.3,
        height : width*0.3,
        borderRadius: width*0.15,
        backgroundColor : "green"
    },
})
