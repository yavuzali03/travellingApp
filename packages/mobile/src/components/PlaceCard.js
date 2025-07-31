import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking, StyleSheet, Dimensions} from 'react-native';
import {useStyle} from "../contexts/styleContext";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";

const {width, height} = Dimensions.get('window');

const PlaceCard = ({ place }) => {

    const styleContext = useStyle()
    const navigation = useNavigation();
    const openInMaps = () => {
        if (place?.maps_url) {
            Linking.openURL(place.maps_url);
        }
    };

    return (
        <TouchableOpacity onPress={() => navigation.navigate("placeDetails", { place })}>
        <View style={styles.card}>

            {place?.photo ? (
                <Image source={{ uri: place.photo }} style={styles.image} />
            ) : (
                <View style={styles.imagePlaceholder}><Text>📍</Text></View>
            )}
            <View style={styles.rating}>
                <FontAwesomeIcon icon={faStar} size={18} color={"#343a40"}/>
                <Text style={styles.ratingText}>{place.rating}</Text>
            </View>

            <View style={{alignItems: 'center' , justifyContent: 'center', flex : 0.5}}>
                <Text style={styleContext.title} numberOfLines={2} ellipsizeMode={"tail"}>{place.name}</Text>
            </View>

            <View  style={{alignItems: 'center' , justifyContent: 'center', flex : 0.5}}>
                <TouchableOpacity onPress={openInMaps} style={styles.button}>
                    <Text style={styles.buttonText}>Haritada Aç</Text>
                </TouchableOpacity>
            </View>


        </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        flex : 3,
        borderRadius: 12,
        marginTop: width*0.03,
        marginBottom: width*0.03,
        marginRight: width*0.03,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 2,
        width : width*0.5,
        height : width*0.75,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    image: {
        flex : 2,
        width : width*0.5,
        height : width*0.5,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        marginBottom: 6
    },
    imagePlaceholder: {
        width : width*0.5,
        height : width*0.5,
        borderRadius: 8,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontWeight: '600'
    },
    button: {
        marginTop: 4,
        backgroundColor: '#ED1C24',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        width: width*0.45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 13
    },
    rating: {
        width: width*0.15,
        height: width*0.08,
        backgroundColor: "#FFD900",
        position: 'absolute',
        top : 0,
        right : 0,
        alignItems: "center",
        justifyContent : "center",
        borderTopRightRadius: 12,
        borderColor : "#FFF200",
        borderWidth : 3,
        elevation : 15,
        flexDirection : "row"

    },
    ratingText: {
        color: '#343a40',
        paddingStart : 2,
        fontFamily : "Montserrat-Bold",
        fontSize : width*0.035,
    },
});

export default PlaceCard;
