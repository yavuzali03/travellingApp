import {View, StyleSheet, SafeAreaView, Dimensions, Image, Text, TouchableOpacity} from "react-native";
import {useStyle} from "../contexts/styleContext";
import {TopBar} from "../components/topBar";
import {TripTabPage} from "./tripTabPage";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {useUser} from "../contexts/userContext";
import {useEffect, useState} from "react";

import useTripViewModel from "../viewmodels/tripViewModel";

export const TripDashboard = ({ route }) => {
    const trip = route.params.item;

    const { user } = useUser();
    const styleContext = useStyle();
    const [tripData, setTripData] = useState(null);
    const navigation = useNavigation();
    const { getUserTrip } = useTripViewModel();

    const roomId = `trip_${trip._id}`;
    const currentUserId = user._id;
    const { width } = Dimensions.get("window");

    useEffect(() => {
        const fetchData = async (tripId) => {
            const response = await getUserTrip(tripId);
            setTripData(response);
        };
        fetchData(trip._id);
    }, []);


    if (!tripData) {
        return (
            <SafeAreaView style={[styleContext.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={styleContext.text}>Gezi verisi yükleniyor...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styleContext.container, { alignItems: null }]}>
            <TopBar title={trip.title} />

            <Image
                source={{ uri: trip.profileImage }}
                width={width}
                height={width * (9 / 16)}
                resizeMode={"cover"}
            />

            <View style={{ justifyContent: "space-between", margin: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Text style={styleContext.title}>{trip.title}</Text>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 30,
                            backgroundColor: "red",
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() =>
                            navigation.navigate("chat", {
                                roomId: roomId,
                                roomType: "group",
                                currentUser: currentUserId,
                                otherUser: null,
                                groupName: trip.title,
                                groupPhoto: trip.profileImage,
                                participants: trip.participants,
                            })
                        }
                    >
                        <Text style={[styleContext.title, { color: "white", fontSize: 16 }]}>Sohbete git</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styleContext.text, { multiline: true, maxWidth: 250 }]}>
                    {trip.description}
                </Text>
            </View>

            <TripTabPage trip={tripData} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({

});
