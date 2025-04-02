import {View, StyleSheet, Text, Dimensions} from "react-native";

export const SearchBar = ()=>{
    return (
        <View style={styles.container}>

        </View>
    )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flexDirection: "row",
        width: width,
        height: 64,
        paddingHorizontal: 20
    }
})
