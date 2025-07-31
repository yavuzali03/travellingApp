import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const styles = {
  container: {
    height: '60px',
    backgroundColor: '#FFFFF8',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
    padding: '0 20px'
  },
  profileImage: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    marginRight: '10px'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#2D2D74',
    margin: 0
  },
  status: {
    fontSize: '13px',
    color: '#313335',
    marginTop: '2px'
  },
  typingStatus: {
    fontSize: '13px',
    color: '#ED1C24',
    marginTop: '2px'
  }
};

const MessageTopBar = ({ isGroup, photoUrl, title, isTyping, isOnline }) => {
  const subText = isTyping
    ? 'Yazıyor...'
    : isGroup
      ? 'Grup Sohbeti'
      : isOnline
        ? 'Çevrimiçi'
        : 'Çevrimdışı';

  return (
    <div style={styles.container}>
      {photoUrl && (
        <img 
          src={photoUrl} 
          alt="Profile" 
          style={styles.profileImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/36';
          }}
        />
      )}
      
      <div style={styles.userInfo}>
        <h3 style={styles.userName}>{title}</h3>
        <div style={isTyping ? styles.typingStatus : styles.status}>
          {subText}
        </div>
      </div>
    </div>
  );
};

export { MessageTopBar };


