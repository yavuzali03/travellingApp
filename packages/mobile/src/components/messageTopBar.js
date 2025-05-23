import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";


export const MessageTopBar = ({ isGroup, photoUrl, title, onBackPress, isTyping, isOnline }) => {
    const subText = isTyping
        ? 'Yazıyor...'
        : isGroup
            ? 'Grup Sohbeti'
            : isOnline
                ? 'Çevrimiçi'
                : 'Çevrimdışı';

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
               <FontAwesomeIcon icon= {faAngleLeft} size={24} color="#313335" />
            </TouchableOpacity>

            {photoUrl && (
                <Image source={{ uri: photoUrl }} style={styles.avatar} />
            )}

            <View>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={[styles.subtitle, isTyping && { color: '#ED1C24' }]}>
                    {subText}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#FFFFF8',
        flexDirection: 'row',
        alignItems: 'center',
        elevation : 10,
        width : "100%",
        paddingHorizontal : 20
    },
    backButton: {
        marginRight: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#2D2D74',
    },
    subtitle: {
        fontSize: 13,
        color: '#313335',
        marginTop: 2,
    },
});


