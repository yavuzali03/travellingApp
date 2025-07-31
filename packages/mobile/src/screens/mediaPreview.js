import React from 'react';
import {View, FlatList, Image, Dimensions, Text, StyleSheet, Platform} from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

export const MediaPreview = ({ route }) => {
    const { mediaList, initialIndex = 0 } = route.params;

    const convertToAccessibleUrl = (url) => {
        if (!url) return null;

        if (Platform.OS === 'android' && url.includes('localhost')) {
            return url.replace('localhost', '10.0.2.2');
        }

        return url;
    };
    const renderItem = ({ item }) => {
        return (
            <View style={styles.mediaContainer}>
                {/* 👤 Üstte kullanıcı bilgileri */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: item.sender?.profileImage }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.senderName}>
                            {item.sender?.firstName} {item.sender?.lastName}
                        </Text>
                        <Text style={styles.sentAt}>
                            {new Date(item.createdAt).toLocaleString()}
                        </Text>
                    </View>
                </View>

                {/* 🖼️ Medya */}
                {item.messageType === 'image' ? (
                    <Image
                        source={{ uri: convertToAccessibleUrl(item.content) }}
                        style={styles.media}
                        resizeMode="contain"
                    />
                ) : (
                    <Video
                        source={{ uri: item.content }}
                        style={styles.media}
                        resizeMode="contain"
                        controls
                        paused={false}
                    />
                )}
            </View>
        );
    };

    return (
        <FlatList
            data={mediaList}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            initialScrollIndex={initialIndex}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(data, index) => (
                { length: width, offset: width * index, index }
            )}
            style={{ backgroundColor: '#000' }}
        />
    );
};

const styles = StyleSheet.create({
    mediaContainer: {
        width,
        height,
        backgroundColor: '#000',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    senderName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sentAt: {
        color: '#ccc',
        fontSize: 12,
    },
    media: {
        width,
        height: height - 80,
        alignSelf: 'center',
    },
});
