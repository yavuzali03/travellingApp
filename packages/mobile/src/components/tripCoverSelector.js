import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import {requestGalleryPermission} from "../utils/permission";
import * as ImagePicker from "react-native-image-crop-picker";


const TripCoverSelector = ({ selectedImage, setSelectedImage, setSelectedFile }) => {

    const handlePickImage = async () => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) {
            Alert.alert("İzin Gerekli", "Galeriye erişim reddedildi.");
            return;
        }

        try {
            const image = await ImagePicker.openPicker({
                width: 1200,
                height: 700,
                cropping: true,
                cropperCircleOverlay: false,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });

            const imageUri = image.path;
            setSelectedImage(imageUri);
            setSelectedFile({
                uri: imageUri,
                name: image.filename || 'trip-cover.jpg',
                type: image.mime || 'image/jpeg',
            });

        } catch (error) {
            console.warn("Görsel seçimi iptal edildi veya hata:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Kapak Fotoğrafı</Text>
            <TouchableOpacity onPress={handlePickImage} style={styles.imageContainer}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholder}>Görsel seç</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        width: "80%",
    },
    label: {
        fontSize: 14,
        color: "#444",
        marginBottom: 6,
    },
    imageContainer: {
        height: 150,
        borderRadius: 10,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        width : 150
    },
    placeholder: {
        color: "#888",
        fontSize: 14,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});

export default TripCoverSelector;
