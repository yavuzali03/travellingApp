import React, {useCallback, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    useWindowDimensions, RefreshControl, FlatList, Image,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useStyle } from '../contexts/styleContext';
import { useUser } from '../contexts/userContext';
import {ExpenseModal} from "../components/expenseModal";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEllipsisVertical, faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import useTripViewModel from "../viewmodels/tripViewModel";
import {useNavigation} from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

// 🟥 Anasayfa Sekmesi (placeholder)
const TripsScreen = ({ trip }) => {
    const styleContext = useStyle();
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();

    const handleAddExpense = async ({ amount, description }) => {
        try {
            const response = await axios.post(
                `http://10.0.2.2:5002/api/addExpenses/${trip._id}/${user._id}`,
                {
                    amount,
                    description,
                    receipt: null // şimdilik boş
                }
            );

            console.log("✅ Harcama eklendi:", response.data);
        } catch (err) {
            console.error("❌ Harcama eklenemedi:", err.message);
        }
    };

    return (
        <View style={styles.page}>
            <Text style={[styleContext.title, { textAlign: 'left' }]}>{trip.title}</Text>

            <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    backgroundColor: 'red',
                    borderRadius: 20,
                    position: 'absolute',
                    bottom: 20,
                    right: 50,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} size={40} color={'white'} />
            </TouchableOpacity>

            <ExpenseModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddExpense}
            />
        </View>
    );
};

// 🟩 Harcamalar Sekmesi (placeholder)
const MapScreen = ({ trip }) => {
    const style = useStyle();
    const { getUserTrip } = useTripViewModel();
    const { user } = useUser();
    const [refreshing, setRefreshing] = useState(false);
    const [tripData, setTripData] = useState(trip); // local state'e alın

    const totalAmount = tripData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const perPerson = tripData.participants.length > 0
        ? (totalAmount / tripData.participants.length).toFixed(2)
        : 0;

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const updatedTrip = await getUserTrip(tripData._id);
            setTripData(updatedTrip);
        } catch (err) {
            console.warn("Yenileme başarısız:", err.message);
        }
        setRefreshing(false);
    }, [tripData._id]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={style.title}>₺ {item.amount.toFixed(2)}</Text>
            <Text style={style.text}>{item.description}</Text>
            <Text style={style.text}>Ödeyen: {item.paidBy?.username || 'Bilinmiyor'}</Text>
            <Text style={style.text}>Tarih: {new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
    );

    return (
        <View style={[styles.page, { padding: 16 }]}>
            <View style={styles.summary}>
                <Text style={style.title}>Toplam Harcama: ₺ {totalAmount.toFixed(2)}</Text>
                <Text style={style.text}>Kişi başı: ₺ {perPerson}</Text>
            </View>

            <FlatList
                data={tripData.expenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={<Text style={style.text}>Henüz harcama yok.</Text>}
            />
        </View>
    );
};



// 🟦 Bilgiler Sekmesi (güncellendi)
const ProfileScreen = ({ trip }) => {
    const styleContext = useStyle();
    const { user: currentUser } = useUser();

     const RenderItem = ({item , tripCreatorId , index}) => {

        const styleContext = useStyle();
        const navigation = useNavigation();

        return (
            <TouchableOpacity onPress={() => navigation.navigate("profile", {userId: item._id})}>
                <View style={styleContext.renderItemContainer}>
                    <View style={{flexDirection: "row" , alignItems: "center" , justifyContent: "center" ,}}>
                        <Text style={{padding : 8, color :"#ed1c24", fontWeight : "bold"}}>{index+1}</Text>
                        <Image
                            source={{ uri: item.profileImage }}
                            style={styleContext.avatar}
                        />
                        <Text style={[styleContext.text ,{paddingLeft : 10}]}>{item.username}</Text>
                    </View>
                    {
                        item._id === tripCreatorId &&
                        (
                            <View style={{backgroundColor : "#fbd2d3" , borderRadius: 20 , borderWidth: 1 ,borderColor :"#ed1c24"}}>
                                <Text style={{padding : 6, color :"#ed1c24", fontWeight : "bold"}}>Organizatör</Text>
                            </View>
                        )
                    }


                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.page}>
            <Text style={[styleContext.title, { textAlign: 'left' }]}>{trip.title}</Text>
            <Text style={[styleContext.text, { marginBottom: 10 }]}>{trip.description}</Text>

            <Text style={styleContext.title}>Tarihler</Text>
            <Text style={styleContext.text}>
                Başlangıç: {new Date(trip.startDate).toLocaleDateString()}
            </Text>
            <Text style={styleContext.text}>
                Bitiş: {new Date(trip.endDate).toLocaleDateString()}
            </Text>

            <Text style={[styleContext.title, { marginTop: 16 }]}>Katılımcılar</Text>
            <FlatList
                data={trip.participants}
                renderItem={({item ,index})=> <RenderItem item={item} tripCreatorId={trip.creator} index={index} />
            }
            />
        </View>
    );
};

// 🔁 Tab Yapısı
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
    summary: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    card: {
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1
    }
});
