import {View, Text, StyleSheet, SafeAreaView, FlatList} from "react-native";
import {useUser} from "../contexts/userContext";
import {TopBar} from "../components/topBar";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import useAuthViewModel from "../viewmodels/authViewModel";

export const Profile = ()=> {
    const {user} = useUser();
    const {handleLogout} = useAuthViewModel();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar isBackground={false} title={"Profil"} buttonNumber={2} leftIcon={faAngleLeft} rightIcon={faAngleRight} />
                <Text>Profile Screen</Text>
                <Text>{user.firstName}</Text>
                <FlatList
                    data={user.friends}
                    contentContainerStyle={{backgroundColor : "red" , height : 400 , width : 300}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={{height : 50 , backgroundColor : "blue" , margin : 10}}>
                            <Text>{item}</Text>
                        </View>

                    )}
                ></FlatList>

                <Text onPress={()=>handleLogout()}>Çıkış Yap </Text>
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
    }
})
