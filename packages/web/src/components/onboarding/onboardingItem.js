import {Dimensions, StyleSheet, View,Text} from "react-native";


const OnboardinItem = ({item})=>{


return (
    <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
    </View>
    )
}
const {width , height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width : width,
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
    },
    text : {
        fontSize: 20,
        fontWeight: "normal",
    }
})

export default OnboardinItem;
