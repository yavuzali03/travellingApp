
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
    Dimensions,
    SafeAreaView, ActivityIndicator
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faStar, faMapMarkerAlt, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {TopBar} from "../components/topBar";
import {useStyle} from "../contexts/styleContext";
import {GeminiApi, GeminiService} from "../services/geminiApi";
import {ButtonFilled} from "../components/buttonFilled";

const { width } = Dimensions.get('window');

const PlaceDetails = () => {
    const route = useRoute();
    const { place } = route.params;
    const navigation = useNavigation();
    const styleContext = useStyle()

    const [placeData, setPlaceData] = useState(null);
    const itemWidth = width * 0.9;
    const openInMaps = () => {
        if (place?.maps_url) {
            Linking.openURL(place.maps_url);
        }
    };
    useEffect(() => {
        const geminiInfo = async (place)=> {
            try {
                const response = await GeminiService(place.city , place.location.coordinates , place.name);
                setPlaceData(response);
            }catch(error) {
                console.error(error);
            }
        }
        geminiInfo(place);
    }, []);

    console.log("placeData: ",place)

    if (!placeData) {
        return (
            <View style={{flex : 1,justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size={"large"} color={"black"}/>
            </View>

        )
    }
    return (
        <SafeAreaView style={styleContext.container}>
            <TopBar title={place.name} leftIcon={faAngleLeft} leftOnePress={()=>navigation.goBack()} />
            {place?.photo && (
                <Image source={{ uri: place.photo }} style={styles.image} />
            )}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}}>
                <View style={styles.header}>
                    <Text style={styleContext.title}>{place.name}</Text>

                    <View style={styles.rating}>
                        <FontAwesomeIcon icon={faStar} size={18} color={"#343a40"}/>
                        <Text style={styles.ratingText}>{place.rating}</Text>
                    </View>

                </View>

                <View style={{backgroundColor : "#F3F3EB",width : itemWidth , padding : 15 , borderRadius : width*0.03}}>
                    <Text style={styleContext.text}>{placeData}</Text>
                    <Text style={[styleContext.text,{textAlign : "center",color :"#2D2D74" , fontWeight:"bold"}]}>Bu yazı yapay zeka ile oluşturulmuştur.</Text>
                </View>
            </ScrollView>
                <View style={{width : width , alignItems : "center", justifyContent: "center" , margin : 15}}>
                    <ButtonFilled onPress={openInMaps} title={"Haritada aç"} width={itemWidth} height={50}/>
                </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 10,
        backgroundColor: '#fff'
    },
    image: {
        width: width,
        height: width,
        resizeMode : "contain",
    },
    header: {
        marginTop: 10,
        alignItems: 'center'
    },
    rating: {
        width: width*0.2,
        height: width*0.1,
        backgroundColor: "#FFD900",
        top : 0,
        right : 0,
        alignItems: "center",
        justifyContent : "center",
        borderRadius: 12,
        borderColor : "#FFF200",
        borderWidth : 3,
        flexDirection : "row",
        margin : 5

    },
    ratingText: {
        color: '#343a40',
        paddingStart : 2,
        fontFamily : "Montserrat-Bold",
        fontSize : width*0.035,
    },
    city: {
        marginTop: 8,
        fontSize: 16,
        color: '#444'
    },
    section: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    address: {
        marginLeft: 10,
        fontSize: 15,
        color: '#333'
    },
    mapButton: {
        backgroundColor: '#ED1C24',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        justifyContent : "center",
        alignItems: "center",
        width : width*0.9,
    },
    mapButtonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default PlaceDetails;
