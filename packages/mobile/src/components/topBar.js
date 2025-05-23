import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";


export const TopBar = ({
                           isBackground = false,
                           title = '',
                           buttonNumber = 0,
                           leftOnePress = () => {},
                           rightOnePress = () => {},
                           leftIcon = null,
                           rightIcon = null
                       })=>{

    const backgroundColor = isBackground ? "rgba(178, 180, 182, 0.5)" : null;

    const navigation = useNavigation();
    return (
        <View>
            {buttonNumber === 1 ?(
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=>leftOnePress} style={[styles.button , {backgroundColor : backgroundColor ,left : 20}]}>
                        {leftIcon && <FontAwesomeIcon icon={leftIcon} size={24} color={"#313335"}/>}
                    </TouchableOpacity>

                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            ) :
                (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={leftOnePress} style={[styles.button , {backgroundColor : backgroundColor,left : 20}]}>
                            {leftIcon && <FontAwesomeIcon icon={leftIcon} size={24} color={backgroundColor ? "#FFFFF8" : "#313335"}/>}
                        </TouchableOpacity>

                        <Text style={styles.buttonText}>{title}</Text>

                        <TouchableOpacity onPress={rightOnePress} style={[styles.button , {backgroundColor : backgroundColor,right :20}]}>
                            {rightIcon && <FontAwesomeIcon icon={rightIcon} size={24} color={backgroundColor ? "#FFFFF8" : "#313335"}/>}
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: "#FFFFF8",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 60,
        paddingHorizontal : 20
    },
    button: {
        width : 40,
        height : 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#313335",
        textAlign : "center"
    }
})
