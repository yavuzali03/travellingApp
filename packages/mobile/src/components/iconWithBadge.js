import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const IconWithBadge = ({ icon, badgeCount ,onPress}) => {
    return (
        <TouchableOpacity style={{ width: 30, height: 30, margin: 5 }} onPress={onPress}>
            <FontAwesomeIcon icon={icon} size={30} color="#313335" />
            {badgeCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        right:  0,
        top: -4,
        backgroundColor: "red",
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth : 1,
        borderColor: "#FFFFF8",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
});
