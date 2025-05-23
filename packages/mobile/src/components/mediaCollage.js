// components/MediaCollage.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export const MediaCollage = ({ mediaList, onPressItem }) => {
    const displayItems = mediaList.slice(0, 4); // en fazla 4 öğe göster
    const remaining = mediaList.length - 4;

    return (
        <View style={styles.grid}>
            {displayItems.map((media, index) => (
                <TouchableOpacity key={index} onPress={() => onPressItem(index)}>
                    <Image source={{ uri: media.url }} style={styles.image} />
                    {index === 3 && remaining > 0 && (
                        <View style={styles.overlay}>
                            <Text style={styles.moreText}>+{remaining}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'flex-start'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    moreText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});
