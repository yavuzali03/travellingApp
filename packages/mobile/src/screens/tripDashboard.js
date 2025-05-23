import {View, StyleSheet, SafeAreaView, Dimensions, Image, Text, TouchableOpacity} from "react-native";
import {useStyle} from "../contexts/styleContext";
import {TopBar} from "../components/topBar";
import {TripTabPage} from "./tripTabPage";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";

export const TripDashboard = ({route}) => {
    const trip = route.params.item;
    const styleContext = useStyle();

    const navigation = useNavigation();

    console.log(trip.title);
    console.log(trip);

    const {width} = Dimensions.get("window");
    return (
        <SafeAreaView style={[styleContext.container,{alignItems : null}]}>
            <TopBar title={trip.title} />

                <Image source={{uri: trip.profileImage}} width={width} height={width*(9/16)} resizeMode={"cover"} />
            <View style={{flexDirection: "row", justifyContent: "space-between" , alignItems: "center" , paddingHorizontal : 20}}>
                <View>
                    <Text style={styleContext.title}>{trip.title}</Text>
                    <Text style={styleContext.text}>{trip.description}</Text>
                </View>
                <TouchableOpacity
                    style={{width:100 , height:50 ,backgroundColor :"red" , borderRadius : 15, alignItems: "center" , justifyContent:"center"}}
                >
                    <Text>Sohbete git</Text>
                </TouchableOpacity>
            </View>

           <TripTabPage trip={trip} />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({

});
