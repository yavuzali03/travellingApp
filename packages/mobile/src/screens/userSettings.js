import React, { useState } from 'react';
import {
    View,
    Button,
    Image,
    PermissionsAndroid,
    Platform,
    Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useUser } from '../contexts/userContext';
import {requestGalleryPermission} from "../utils/permission";

export const UserSettings = () => {
    const { user } = useUser();
    const userId = user._id;
    const [selectedImage, setSelectedImage] = useState(null);


    // 📷 Resim seç ve yükle
    const pickImage = async () => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) {
            Alert.alert('İzin Gerekli', 'Galeriye erişim reddedildi.');
            return;
        }

        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                quality: 0.8,
            },
            async (response) => {
                if (response.didCancel || response.errorCode) return;

                const asset = response.assets[0];
                if (!asset || !asset.uri) return;

                // 📌 content:// fix
                let imageUri = asset.uri;
                if (Platform.OS === 'android' && imageUri.startsWith('content://')) {
                    imageUri = imageUri.replace('content://', 'file://');
                }

                setSelectedImage(imageUri);

                const formData = new FormData();
                formData.append('image', {
                    uri: imageUri,
                    name: asset.fileName || 'profile.jpg',
                    type: asset.type || 'image/jpeg',
                });
                formData.append('userId', userId);

                try {
                    const res = await axios.post(
                        `http://10.196.137.84:5002/api/upload-profile/${user._id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );

                    console.log('✅ Yüklenen URL:', res.data.imageUrl);

                    // Eğer user güncellenecekse burada context set yapılabilir
                    // updateUser(res.data.user);

                } catch (err) {
                    console.error('❌ Yükleme hatası:', err.message);
                }
            }
        );
    };

    return (
        <View style={{ padding: 20 }}>
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 12 }}
                />
            )}
            <Button title="📷 Fotoğraf Seç" onPress={pickImage} />
        </View>
    );
};
