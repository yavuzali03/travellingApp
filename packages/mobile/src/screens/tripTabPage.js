import * as React from 'react';
import {View, Text, useWindowDimensions, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import { useStyle } from '../contexts/styleContext';

const {width, height} = Dimensions.get('window');
const TripsScreen = ({ trip }) => {
    const styleContext = useStyle(); // ✅ eklendi
    return (
        <View style={styles.page}>
            <Text style={[styleContext.title, { textAlign: 'left' }]}>{trip.title}</Text>
            <Text style={styleContext.text}>{trip.description}</Text>

            <TouchableOpacity
                onPress={()=>console.log("harcama eklendi")}
                style={{width : width*0.2 , height : width*0.2 , backgroundColor :"red" ,borderRadius : 20 , position : "absolute" , bottom : 20 , right : 50}}>

            </TouchableOpacity>
        </View>
    );
};

const MapScreen = ({ trip }) => {
    const styleContext = useStyle(); // ✅ eklendi
    return (
        <View style={styles.page}>
            <Text style={[styleContext.title, { textAlign: 'left' }]}>{trip.title}</Text>
            <Text style={styleContext.text}>{trip.description}</Text>
        </View>
    );
};

const ProfileScreen = ({ trip }) => {
    const styleContext = useStyle(); // ✅ eklendi
    return (
        <View style={styles.page}>
            <Text style={[styleContext.title, { textAlign: 'left' }]}>{trip.title}</Text>
            <Text style={styleContext.text}>{trip.description}</Text>
        </View>
    );
};

export const TripTabPage = ({ trip }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const routes = [
        { key: 'trips', title: 'Anasayfa' },
        { key: 'map', title: 'Harcamalar' },
        { key: 'profile', title: 'Bilgiler' },
    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'trips':
                return <TripsScreen trip={trip} />;
            case 'map':
                return <MapScreen trip={trip} />;
            case 'profile':
                return <ProfileScreen trip={trip} />;
            default:
                return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            swipeEnabled={true}
            style={{ padding: 12 }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    style={styles.tabBar}
                    indicatorStyle={styles.indicator}
                    activeColor={'#FFFFF8'}
                    inactiveColor={'#ED1C24'}
                    pressColor="transparent"
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFF8',
    },
    tabBar: {
        backgroundColor: '#FFFFF8',
        elevation: 0,
        shadowOpacity: 0,
        height: 48,
    },
    indicator: {
        backgroundColor: '#ED1C24',
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        top: 8,
        zIndex: -1,
        borderRadius: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});
