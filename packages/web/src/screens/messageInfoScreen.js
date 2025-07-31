import React from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  messageBox: {
    marginBottom: '2rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    '& h3': {
      margin: '0 0 0.5rem 0',
      color: '#333',
      fontSize: '1.1rem'
    },
    '& p': {
      margin: 0,
      color: '#666',
      fontSize: '0.95rem',
      lineHeight: 1.5
    }
  },
  seenInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  seenSection: {
    '& h3': {
      margin: '0 0 1rem 0',
      color: '#333',
      fontSize: '1rem'
    }
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    gap: '1rem'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  userDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem'
  },
  userName: {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#333'
  },
  seenTime: {
    fontSize: '0.85rem',
    color: '#666'
  },
  seenIcon: {
    color: '#2196f3',
    fontSize: '0.9rem'
  }
};

const MessageInfoScreen = () => {
    const { message, participants, currentUserId } = useParams();
    const parsedMessage = JSON.parse(decodeURIComponent(message));
    const parsedParticipants = JSON.parse(decodeURIComponent(participants));

    const normalizeId = (user) => typeof user === 'object' ? user._id : user;
    const seenUserIds = (parsedMessage.seenBy || []).map(entry => normalizeId(entry.user));
    const filteredParticipants = parsedParticipants.filter(p => p._id !== currentUserId);
    const seenUsers = filteredParticipants.filter(p => seenUserIds.includes(p._id));
    const unseenUsers = filteredParticipants.filter(p => !seenUserIds.includes(p._id));

    const getSeenAt = (userId) => {
        const entry = parsedMessage.seenBy?.find(s => normalizeId(s.user) === userId);
        return entry?.seenAt;
    };

    return (
        <div style={styles.container}>
            <div style={styles.messageBox}>
                <h3>Mesaj:</h3>
                <p>{parsedMessage.content}</p>
            </div>

            <div style={styles.seenInfo}>
                {seenUsers.length > 0 && (
                    <div style={styles.seenSection}>
                        <h3>Görenler</h3>
                        {seenUsers.map(user => (
                            <div key={user._id} style={styles.userRow}>
                                <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} style={styles.userAvatar} />
                                <div style={styles.userDetails}>
                                    <span style={styles.userName}>{user.firstName} {user.lastName}</span>
                                    <span style={styles.seenTime}>
                                        {getSeenAt(user._id) ? new Date(getSeenAt(user._id)).toLocaleString('tr-TR') : 'Tarih yok'}
                                    </span>
                                </div>
                                <span style={styles.seenIcon}>✔✔</span>
                            </div>
                        ))}
                    </div>
                )}

                {unseenUsers.length > 0 && (
                    <div style={styles.seenSection}>
                        <h3>Görmeyenler</h3>
                        {unseenUsers.map(user => (
                            <div key={user._id} style={styles.userRow}>
                                <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} style={styles.userAvatar} />
                                <div style={styles.userDetails}>
                                    <span style={styles.userName}>{user.firstName} {user.lastName}</span>
                                    <span style={styles.seenTime}>Henüz görmedi</span>
                                </div>
                                <span style={styles.seenIcon}>✔</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageInfoScreen;
