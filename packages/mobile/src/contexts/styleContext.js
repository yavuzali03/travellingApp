import { createContext, useContext } from "react";
import {Dimensions, StyleSheet} from "react-native";

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {

    const {width ,height} = Dimensions.get("window");
    const styleContext = StyleSheet.create({
        text: {
            fontSize: 16,
            color: "#313335",
        },
        title: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#313335",
        },
        button: {
            backgroundColor: "#ED1C24",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
        },
        buttonText: {
            color: "#fff",
            fontSize: 16,
        },
        container: {
            flex: 1,
            backgroundColor: "#FFFFF8",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        renderItemContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: width*0.9,
            height: width*0.15,
        },
        renderItemText: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#313335",
        }

    });

    return (
        <StyleContext.Provider value={styleContext}>
            {children}
        </StyleContext.Provider>
    );
};

export const useStyle = () => useContext(StyleContext);
