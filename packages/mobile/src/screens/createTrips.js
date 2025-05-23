import {
    Alert, Button,
    Dimensions, Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {TopBar} from "../components/topBar";
import React, {useEffect, useState} from "react";
import {ButtonFilled} from "../components/buttonFilled";
import {useUser} from "../contexts/userContext";
import {useStyle} from "../contexts/styleContext";
import TripViewModel from "../viewmodels/tripViewModel";
import {DropdownList} from "../components/dropdownList";
import useFriendsViewModel from "../viewmodels/friendsViewModel";
import {CustomDateRangePicker} from "../components/CustomDateRangePicker";
import TripCoverSelector from "../components/tripCoverSelector";


export const CreateTrips = () => {
    const {user} = useUser();
    const {getFriendsData} = useFriendsViewModel();
    const styleContext = useStyle();
    const { createTrip } = TripViewModel();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [participants, setParticipants] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [friends, setFriends] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [dateModalVisible, setDateModalVisible] = useState(false);


    useEffect(() => {
        async function getFriends(userId) {
            const response = await getFriendsData(userId);
            const formattedFriends = response.map(friend => ({
                label: friend.username,
                value: friend._id,
            }));
            setFriends(formattedFriends);
        }

        getFriends(user._id);
    }, []);

    const handleCreate = async () => {
        try {
            const response = await createTrip({
                creator: user._id,
                title,
                description,
                participants,
                startDate,
                endDate,
                selectedFile,
            });
            console.log(response)
        } catch (err) {
            console.error("Gezi oluşturulamadı:", err.message);
        }
    };


    const renderDateBoxes = () => {
        const format = (dateStr) => {
            if (!dateStr) return "-- -- ----";
            const date = new Date(dateStr);
            const options = { day: "2-digit", month: "short", year: "numeric" };
            return date.toLocaleDateString("en-US", options).toUpperCase();
        };

        return (
            <TouchableOpacity onPress={() => setDateModalVisible(true)} style={styles.headerContainer}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Başlangıç tarihi</Text>
                    <Text style={styles.dateValue}>{format(startDate)}</Text>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Başlangıç tarihi</Text>
                    <Text style={styles.dateValue}>{format(endDate)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopBar title={"Yeni gezi oluştur"} />

                <View style={styleContext.textInputView}>
                    <TextInput
                        placeholder="gezi başlığı"
                        placeholderTextColor="gray"
                        style={styleContext.textInput}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={[styleContext.textInputView, { height: width * 0.4, alignItems: "flex-start" }]}>
                    <TextInput
                        placeholder="gezi açıklaması"
                        placeholderTextColor="gray"
                        style={[styleContext.textInput, { height: "100%", textAlignVertical: "top" }]}
                        value={description}
                        multiline
                        onChangeText={setDescription}
                    />
                </View>

                <DropdownList data={friends} value={participants} setValue={setParticipants} />

                <View style={{margin : 10}}>
                    <Text style={styleContext.title}>Tarih aralığı</Text>
                    {renderDateBoxes()}
                    <CustomDateRangePicker
                        visible={dateModalVisible}
                        onClose={() => setDateModalVisible(false)}
                        onConfirm={(start, end) => {
                            setStartDate(start);
                            setEndDate(end);
                        }}
                    />
                </View>

                <TripCoverSelector
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    setSelectedFile={setSelectedFile}
                />


                <ButtonFilled title={"oluştur"} onPress={handleCreate} width={width * 0.8} height={50} />
            </View>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFF8",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    dateButton: {
        fontSize: 16,
        color: "#007bff",
        textDecorationLine: "underline",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: width * 0.8,
    },
    dateBox: {
        flex: 1,
        backgroundColor: "#F3F3EB",
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 5,
        alignItems: "center",
    },
    dateValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginTop: 4,
    },
    dateLabelLarge: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },

    dateLabel: {
        fontSize: 12,
        color: "#888",
    },

});
