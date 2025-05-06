import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheck, faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {MultiSelect} from "react-native-element-dropdown";
import React from "react";
import {useStyle} from "../contexts/styleContext";

export const DropdownList = ({data ,value ,setValue}) => {

    const styleContext = useStyle();
    return(
    <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        dropdownStyle={{
            backgroundColor: "rgba(230, 230, 223, 0.4)",
            borderRadius: 16,
        }}
        containerStyle={{backgroundColor: "rgba(230, 230, 223, 0.4)"}}

        itemTextStyle={{ color: "#313335" }} // yazı rengi (isteğe bağlı)
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Arkadaş seçin"
        searchPlaceholder="Ara..."
        value={value}
        onChange={item => {
            setValue(item); // Seçilenler burada
        }}
        renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity
                style={{
                    backgroundColor: 'rgba(230, 230, 223, 0.4)',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 12,
                    margin: 4,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                onPress={() => unSelect && unSelect(item)}
            >
                <Text style={[styleContext.text,{marginRight : 6}]}>{item.label}</Text>
                <FontAwesomeIcon icon={faXmarkCircle} size={14} color="#ED1C24" />
            </TouchableOpacity>
        )}

        renderItem={(item, selected) => (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    backgroundColor: selected ? '#E6E6DF' : 'rgba(230, 230, 223, 0.4)',
                }}
            >
                <Text style={[styleContext.text,{flex : 1,marginRight : 6}]}>{item.label}</Text>
                {selected && (
                    <FontAwesomeIcon icon={faCheck} size={16} color="#ED1C24" />
                )}
            </View>
        )}
    />
)

}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    dropdown: {
        margin : 4,
        height: 50,
        width : width * 0.8,
        backgroundColor : "rgba(230, 230, 223, 0.4)",
        borderRadius: 16 ,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        color: "gray",
        fontSize : 14
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor : "rgba(230, 230, 223, 0.4)",
        borderWidth : 0
    },
})
