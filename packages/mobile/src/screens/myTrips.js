import {FlatList, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from "react-native";
import {TopBar} from "../components/topBar";
import {
    faAngleLeft,
    faAngleRight,
    faCalendar,
    faCalendarDays,
    faLocation,
    faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import useTripViewModel from "../viewmodels/tripViewModel";
import {useEffect, useState} from "react";
import {useUser} from "../contexts/userContext";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";

export const MyTrips = ()=>{
    const {user} = useUser();
    const {getUserTrips} = useTripViewModel()

    const [trips, setTrips] = useState([])

    const navigation = useNavigation();

    useEffect( () => {
        const getTrips = async (userId) => {
            try {
                const response = await getUserTrips(userId);
                setTrips(response);
                console.log(response)
            }catch (err){
                console.log(err.message)
            }
        }
        getTrips(user._id)
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("tripDashboard",{item})}>
                {/* Görsel */}
                {item.profileImage ? (
                    <Image source={{ uri: item.profileImage }} style={styles.image} />
                ) : (
                    <View style={[styles.image, { backgroundColor: "#ccc" }]} />
                )}

                {/* Metin alanı */}
                <View style={styles.infoContainer}>
                    {/* Tarih */}
                    <View style={styles.row}>
                        <FontAwesomeIcon icon={faCalendarDays} size={12} color="#999" />
                        <Text style={styles.dateText}>
                            {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>

                    {/* Başlık */}
                    <Text style={styles.title}>{item.title}</Text>

                    {/* Açıklama */}
                    <View style={styles.row}>
                        <FontAwesomeIcon icon={faLocationDot} size={12} color="#aaa" />
                        <Text style={styles.desc}>{item.description || "Konum bilgisi yok"}</Text>
                    </View>
                </View>

                {/* Yön ikonu */}
                <FontAwesomeIcon icon={faAngleRight} size={12} color="#999" />
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar isBackground={false} title={"Gezilerim"} buttonNumber={1} leftIcon={faAngleLeft} />
                <FlatList
                    data={trips}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => (renderItem({item}))}
                />
            </View>

        </SafeAreaView>
    )
}
const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    card: {
        width: width * 0.9,
        backgroundColor: "#f5f5ef",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 8,
        alignSelf: "center",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: "#999",
        marginLeft: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
    },
    desc: {
        fontSize: 13,
        color: "#777",
        marginLeft: 4,
    },
})
