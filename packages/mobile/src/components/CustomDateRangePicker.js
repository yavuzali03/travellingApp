import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";

const { width } = Dimensions.get("window");

export const CustomDateRangePicker = ({ visible, onClose, onConfirm }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onDayPress = (day) => {
        const date = day.dateString;

        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (new Date(date) < new Date(startDate)) {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

    const handleConfirm = () => {
        if (startDate && endDate) {
            onConfirm(startDate, endDate);
            onClose();
            setTimeout(() => {
                setStartDate(null);
                setEndDate(null);
            }, 300);
        }
    };

    const format = (dateStr) => {
        if (!dateStr) return "-- -- ----";
        const date = new Date(dateStr);
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return date.toLocaleDateString("en-US", options).toUpperCase();
    };

    const getMarkedDates = (start, end) => {
        if (!start) return {};

        const marked = {
            [start]: {
                startingDay: true,
                color: "#ED1C24",
                textColor: "#fff",
            },
        };

        if (!end || start === end) {
            marked[start].endingDay = true;
            return marked;
        }

        let current = new Date(start);
        const endDate = new Date(end);

        while (current < endDate) {
            const next = new Date(current);
            next.setDate(current.getDate() + 1);
            const dateStr = next.toISOString().split("T")[0];

            if (dateStr === end) {
                marked[dateStr] = {
                    endingDay: true,
                    color: "#ED1C24",
                    textColor: "#fff",
                };
            } else {
                marked[dateStr] = {
                    color: "#ED1C24",
                    textColor: "#fff",
                };
            }

            current = next;
        }

        return marked;
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Tarih Aralığı Seç</Text>

                    {/* Üstteki tarih kutuları */}
                    <View style={styles.headerContainer}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Başlangıç tarihi</Text>
                            <Text style={styles.dateValue}>{format(startDate)}</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Bitiş tarihi</Text>
                            <Text style={styles.dateValue}>{format(endDate)}</Text>
                        </View>
                    </View>

                    {/* Takvim */}
                    <Calendar
                        onDayPress={onDayPress}
                        markingType="period"
                        markedDates={getMarkedDates(startDate, endDate)}
                        theme={{
                            selectedDayBackgroundColor: "#ED1C24",
                            todayTextColor: "#ED1C24",
                            arrowColor: "#ED1C24",
                            textDayFontWeight: "500",
                            textMonthFontWeight: "bold",
                            textMonthFontSize: 18,
                        }}
                    />

                    {/* Butonlar */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancel}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm}>
                            <Text style={styles.confirm}>Tamam</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
        color : "#ED1C24"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    dateBox: {
        flex: 1,
        backgroundColor: "#F3F3EB",
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 5,
        alignItems: "center",
    },
    dateLabel: {
        fontSize: 12,
        color: "#888",
    },
    dateValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    cancel: {
        fontSize: 16,
        color: "#888",
    },
    confirm: {
        fontSize: 16,
        color: "#ED1C24",
        fontWeight: "bold",
    },
});


