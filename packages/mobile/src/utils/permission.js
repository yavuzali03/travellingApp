import { PermissionsAndroid, Platform } from 'react-native';

export const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Kamera İzni',
                    message: 'Fotoğraf çekmek için kamera iznine ihtiyacımız var.',
                    buttonNeutral: 'Daha Sonra Sor',
                    buttonNegative: 'İptal',
                    buttonPositive: 'Tamam',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else {
        return true; // iOS için (react-native-permissions ile daha detaylı yapılır)
    }
};


export const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Konum Erişimi',
                    message: 'Harita ve konum paylaşımı için konum iznine ihtiyacımız var.',
                    buttonNeutral: 'Daha Sonra',
                    buttonNegative: 'Hayır',
                    buttonPositive: 'İzin Ver',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    } else {
        return true;
    }
};


export const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            let permission;
            if (Platform.Version >= 33) {
                // Android 13+
                permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
            } else {
                permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
            }

            const granted = await PermissionsAndroid.request(permission, {
                title: "Galeri Erişimi",
                message: "Gezi fotoğrafı seçebilmek için galeriye erişim izni gerekiyor.",
                buttonPositive: "Tamam",
                buttonNegative: "Reddet"
            });

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            console.warn("İzin hatası:", error);
            return false;
        }
    }
};
