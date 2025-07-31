import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, RESULTS,request} from "react-native-permissions";


export const requestCameraPermission = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (err) {
        console.warn("Kamera izni reddedildi:", err);
        return false;
    }
};


export const requestLocationPermission = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return true;
    } catch (err) {
        console.warn("Konum izni reddedildi:", err);
        return false;
    }
};



export const requestGalleryPermission = async () => {
    // Web'de dosya seçici kullanıldığı için özel bir izin gerekmez
    return true;
};
