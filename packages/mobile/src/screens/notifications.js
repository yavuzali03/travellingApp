import {Dimensions, FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useStyle} from "../contexts/styleContext";
import {useUser} from "../contexts/userContext";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {TopBar} from "../components/topBar";

import {useEffect, useState} from "react";

import {ButtonOutlined} from "../components/buttonOutlined";
import {ButtonFilled} from "../components/buttonFilled";
import useFriendsViewModel from "../viewmodels/friendsViewModel";

export const Notifications = () => {
    const {user} = useUser()
    console.log("notifications 2: ",user)
    const styleContext = useStyle();
    const {getFriendRequestsData ,acceptRequest,declineRequest} = useFriendsViewModel();

    const {width, height} = Dimensions.get("window");

    const [friendRequests , setFriendRequests] = useState([]);

    useEffect(() => {

        async function getFriendsRequest(userId) {
            const response = await getFriendRequestsData(userId)
            setFriendRequests(response);
        }
        getFriendsRequest(user._id)

    }, []);

    console.log("notifications 1: ",friendRequests)

    const renderItem = ({item}) => {
        return (
            <View style={styleContext.renderItemContainer}>
                <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "center" ,}}>
                    <View style={{width : width*0.1 , height : width*0.1  , borderRadius : width*0.05 , backgroundColor : "red"}}></View>
                    <Text style={[styleContext.text ,{paddingLeft : 10}]}>{item.friendId.username}</Text>
                </View>

                <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "space-around",width : width*0.4}}>
                    <ButtonOutlined height={width*0.09} width={width*0.16} title={"reddet"} onPress={() => declineRequest(user._id , item.friendId._id)}/>
                    <ButtonFilled height={width*0.09} width={width*0.2} title={"Kabul Et"} onPress={() => acceptRequest(user._id , item.friendId._id)} />

                </View>


            </View>

        )
    }

    return(
        <SafeAreaView style={styleContext.container}>
            <View style={styleContext.container}>
                <TopBar isBackground={false} title={"Bildirimler"} buttonNumber={1} leftIcon={faAngleLeft} rightIcon={faAngleRight} />
                <FlatList
                    data={friendRequests}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => renderItem({item})}/>
            </View>
        </SafeAreaView>
    )
}
