import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { requestLocationPermission } from '../utils/permission';
import PlaceCard from '../components/PlaceCard';
import usePlacesViewModel from '../viewmodels/placesViewModel';
import { useStyle } from '../contexts/styleContext';
import { TopBar } from '../components/topBar';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/userContext';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../components/searchBar'; // Eğer senin SearchBar özel bir bileşense bu şekilde
import { IconWithBadge } from '../components/iconWithBadge';
import {Search} from "./search";

const { width } = Dimensions.get('window');

export const Home = () => {
    const { getNearbyPlaces } = usePlacesViewModel();
    const styleContext = useStyle();
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [places, setPlaces] = useState({ hotels: [], foods: [], places: [] });
    const navigation = useNavigation();
    const { user } = useUser();
    const [searchText, setSearchText] = useState("");
    const [friendsRequest, setFriendsRequest] = useState(null);
    const [onSearch, setOnSearch] = useState(false);

    const checkLocationPermission = async () => {
        const result = await check(
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );
        if (result === RESULTS.GRANTED) {
            setPermissionGranted(true);
            getLocationAndFetch();
        }
    };

    const handlePermissionButton = async () => {
        const granted = await requestLocationPermission();
        if (granted) {
            setPermissionGranted(true);
            getLocationAndFetch();
        }
    };

    const getLocationAndFetch = () => {
        Geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;
                const response = await getNearbyPlaces(latitude, longitude);
                if (response) setPlaces(response);
            },
            error => {
                console.log("Konum hatası:", error.message);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        if (user?.friendRequests) {
            setFriendsRequest(user.friendRequests.length);
        }
    }, [user]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    return (
        <SafeAreaView style={[styleContext.container, {paddingHorizontal : 20}]}>
            <View style={styles.header}>
                <SearchBar
                    value={searchText}
                    setValue={setSearchText}
                    onFocus={() => setOnSearch(true)}
                    setOnSearch={setOnSearch}
                />
                <IconWithBadge icon={faBell} badgeCount={friendsRequest} onPress={() => navigation.navigate("notifications")} />
            </View>
            {
                onSearch ? (
                    <Search searchValue={searchText} onSearch={onSearch} setOnSearch={setOnSearch}/>
                ) :(
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: width*0.3}}>
                        {!permissionGranted ? (
                            <Button title="Konum İznini Ver" onPress={handlePermissionButton} />
                        ) : (
                            <>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.sectionTitle}>Yakınızdaki Gezilecek Yerler</Text>
                                    <View style={{ height: width * 0.75 + 20 }}>
                                        <FlatList
                                            horizontal
                                            data={places.places}
                                            renderItem={({ item }) => <PlaceCard place={item} />}
                                            keyExtractor={(item) => item._id}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.sectionTitle}>Yakınızdaki Restoranlar</Text>
                                    <View style={{ height: width * 0.75 + 20 }}>
                                        <FlatList
                                            horizontal
                                            data={places.foods}
                                            renderItem={({ item }) => <PlaceCard place={item} />}
                                            keyExtractor={(item) => item._id}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.sectionTitle}>Yakınızdaki Oteller</Text>
                                    <View style={{ height: width * 0.8 + 20 }}>
                                        <FlatList
                                            horizontal
                                            data={places.hotels}
                                            renderItem={({ item }) => <PlaceCard place={item} />}
                                            keyExtractor={(item) => item._id}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </ScrollView>
                )
            }


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginTop : 10
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 6
    }
});
