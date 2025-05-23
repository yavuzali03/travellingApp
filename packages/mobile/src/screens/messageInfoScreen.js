import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export const MessageInfoScreen = ({ route }) => {
    const { message, participants, currentUserId } = route.params;

    // Normalize edilmiş ID listesi
    const normalizeId = (user) => typeof user === 'object' ? user._id : user;

    const seenUserIds = (message.seenBy || []).map(entry => normalizeId(entry.user));

    // currentUser hariç tüm kullanıcıları al
    const filteredParticipants = participants.filter(p => p._id !== currentUserId);

    const seenUsers = filteredParticipants.filter(p => seenUserIds.includes(p._id));
    const unseenUsers = filteredParticipants.filter(p => !seenUserIds.includes(p._id));

    const getSeenAt = (userId) => {
        const entry = message.seenBy?.find(s => normalizeId(s.user) === userId);
        return entry?.seenAt;
    };
    console.log("message.seenBy:", message.seenBy);
    console.log("participants:", participants);
    console.log("currentUserId:", currentUserId);
    return (
        <View style={styles.container}>
            {/* Mesaj kutusu */}
            <View style={styles.messageBox}>
                <Text style={styles.messageLabel}>Mesaj:</Text>
                <Text style={styles.messageContent}>{message.content}</Text>
            </View>

            <ScrollView>
                {/* 👁 Görenler */}
                {seenUsers.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Görenler</Text>
                        {seenUsers.map(user => (
                            <View key={user._id} style={styles.userRow}>
                                <Image source={{ uri: user.profileImage }} style={styles.avatar} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                                    <Text style={styles.seenTime}>
                                        {getSeenAt(user._id) ? new Date(getSeenAt(user._id)).toLocaleString() : 'Tarih yok'}
                                    </Text>
                                </View>
                                <Text style={styles.seenIcon}>✔✔</Text>
                            </View>
                        ))}
                    </>
                )}

                {/* 🙈 Görmeyenler */}
                {unseenUsers.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Görmeyenler</Text>
                        {unseenUsers.map(user => (
                            <View key={user._id} style={styles.userRow}>
                                <Image source={{ uri: user.profileImage }} style={styles.avatar} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                                    <Text style={styles.seenTime}>Henüz görmedi</Text>
                                </View>
                                <Text style={styles.seenIcon}>✔</Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    messageBox: {
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderRadius: 8,
    },
    messageLabel: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    messageContent: {
        fontSize: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 8,
        color: '#333',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userName: {
        fontWeight: '500',
        fontSize: 15,
    },
    seenTime: {
        fontSize: 12,
        color: '#666',
    },
    seenIcon: {
        fontSize: 16,
        color: '#4CAF50',
        marginLeft: 8,
    },
});
