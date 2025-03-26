import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const Paginator = ({ data, scrollX }) => {

    const highligtBoxWidth = data.length*35;
    console.log(highligtBoxWidth);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.highlightBox,{width: highligtBoxWidth }]} />

            {data.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        key={index.toString()}
                        style={[styles.dot, { width: dotWidth, opacity }]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 64,
    },
    highlightBox: {
        position: "absolute",
        height: 24,
        backgroundColor: "rgba(200, 200, 200, 0.5)",
        borderRadius: 12,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "gray",
        marginHorizontal: 8,
    },
});

export default Paginator;
