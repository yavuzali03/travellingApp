import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faCheckDouble, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { MediaCollage } from "./mediaCollage";

export const ChatBubble = ({
                               content,
                               isMine,
                               createdAt,
                               hasBeenSeen,
                               messageType = 'text',
                               mediaList,
                               mediaIndex
                           }) => {
    const navigation = useNavigation();

    const time = new Date(createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const renderContent = () => {
        if (Array.isArray(content)) {
            return (
                <MediaCollage
                    mediaList={content}
                    onPressItem={(index) => {
                        navigation.navigate('mediaPreview', {
                            mediaList: content,
                            initialIndex: index
                        });
                    }}
                />
            );
        }

        if (messageType === 'image') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (mediaList && typeof mediaIndex === 'number') {
                            navigation.navigate('mediaPreview', {
                                mediaList,
                                initialIndex: mediaIndex
                            });
                        }
                    }}
                >
                    <Image
                        source={{ uri: content }}
                        style={styles.media}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            );
        }

        if (messageType === 'video') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (mediaList && typeof mediaIndex === 'number') {
                            navigation.navigate('mediaPreview', {
                                mediaList,
                                initialIndex: mediaIndex
                            });
                        }
                    }}
                >
                    <View style={styles.videoContainer}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/video.png' }} // İstersen burayı video thumb yaparsın
                            style={styles.videoThumb}
                        />
                        <FontAwesomeIcon icon={faPlay} size={32} color="#fff" style={styles.playIcon} />
                    </View>
                </TouchableOpacity>
            );
        }

        return <Text style={styles.messageText}>{content}</Text>;
    };

    return (
        <View style={{ alignSelf: isMine ? 'flex-end' : 'flex-start' }}>
            <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}>
                {renderContent()}
                <View style={styles.meta}>
                    <Text style={[styles.timeText, isMine ? styles.textMine : styles.textOther]}>
                        {time}
                    </Text>
                    {isMine && (
                        <FontAwesomeIcon
                            size={16}
                            color={hasBeenSeen ? '#19B000' : '#B2B4B6'}
                            style={styles.seenIcon}
                            icon={hasBeenSeen ? faCheckDouble : faCheck}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 12,
        marginBottom: 10,
    },
    bubbleMine: {
        backgroundColor: '#E5F4FF',
        borderBottomRightRadius: 0,
    },
    bubbleOther: {
        backgroundColor: '#F3F3EB',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#313335',
    },
    textMine: {
        color: "#313335"
    },
    textOther: {
        color: '#313335',
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 6,
    },
    timeText: {
        fontSize: 10,
        marginRight: 4,
    },
    seenIcon: {
        marginTop: 1,
    },
    media: {
        width: 220,
        height: 220,
        borderRadius: 8,
        marginBottom: 6,
    },
    videoContainer: {
        position: 'relative',
        width: 220,
        height: 220,
        backgroundColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    videoThumb: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        opacity: 0.3,
        position: 'absolute',
    },
    playIcon: {
        zIndex: 2,
    },
});
