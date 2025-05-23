import {View, Text, SafeAreaView,StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useUser} from "../contexts/userContext";
import {SearchBar} from "../components/searchBar";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {IconWithBadge} from "../components/iconWithBadge";
import {useEffect, useState} from "react";
import {useStyle} from "../contexts/styleContext";
import {Search} from "./search";



export const Home = ()=>{

    const navigation = useNavigation();
    const {user} = useUser();
    const styleContext = useStyle();
    const [searchText, setSearchText] = useState("");
    const [friendsRequest, setFriendsRequest] = useState(null);

    const [onSearch, setOnSearch] = useState(false);

    console.log("homescreen 1: ",user._id)

    useEffect(() => {
        if (user?.friendRequests) {
            setFriendsRequest(user.friendRequests.length);
        }
    }, [user]);

    return (
        <SafeAreaView style={styleContext.container}>
            <View style={styleContext.container}>
                <View style={styles.header}>
                    <SearchBar value={searchText} setValue={setSearchText} onFocus={()=>setOnSearch(true)} onBlur={()=>setOnSearch(false)}/>
                    <IconWithBadge icon={faBell} badgeCount={friendsRequest} onPress={() => navigation.navigate("notifications")}/>
                </View>
                {onSearch ? (
                        <Search searchValue={searchText}/>
                    ) :
                    (
                        <View>
                            <Text>hoşgeldiniz</Text>
                        </View>
                    )}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    header : {
        flexDirection : "row",
        width : "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal : 20
    }
})
