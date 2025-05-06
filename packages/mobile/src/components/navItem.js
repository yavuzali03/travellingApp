import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";
import {useStyle} from "../contexts/styleContext";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight, faUserGroup} from "@fortawesome/free-solid-svg-icons";

export const NavItem = ({onPress}) => {

    const styleContext = useStyle();

    return (
        <TouchableOpacity onPress={onPress} style={styles.navItems}>
            <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "center" ,}}>
                <FontAwesomeIcon icon={faUserGroup} size={24} color={"#313335"}/>
                <Text style={[styleContext.text ,{paddingLeft : 10}]}>Arkadaşlar</Text>
            </View>

            <FontAwesomeIcon icon={faAngleRight} size={24} color={"#313335"}/>
        </TouchableOpacity>
    )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    navItems: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width*0.9,
        height: width*0.15,
        backgroundColor : "#FFFFF8",
        borderWidth : 2,
        borderColor : "#e6e6df",
        paddingHorizontal : 20,
        borderRadius : 24
    }
})
