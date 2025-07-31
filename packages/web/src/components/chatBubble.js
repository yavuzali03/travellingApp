import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxWidth: '100%'
  },
  bubble: (isMine) => ({
    padding: '10px 15px',
    borderRadius: '15px',
    backgroundColor: isMine ? '#2D2D74' : 'white',
    color: isMine ? 'white' : 'black',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    wordBreak: 'break-word',
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),
  mediaContainer: {
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    maxHeight: '300px',
    borderRadius: '10px'
  },
  video: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
    borderRadius: '10px'
  },
  textContent: {
    width: '100%',
    textAlign: 'left'
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: '2px'
  },
  seenIcon: {
    color: '#2D2D74',
    fontSize: '12px'
  },
  time: {
    fontSize: '11px',
    color: '#666'
  }
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

const ChatBubble = ({ content, isMine, createdAt, hasBeenSeen, messageType, mediaList, mediaIndex }) => {
  const navigate = useNavigate();

  const handleMediaClick = () => {
    if (messageType === 'image' || messageType === 'video') {
      navigate('/media-preview', {
        state: {
          mediaList,
          currentIndex: mediaIndex
        }
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bubble(isMine)}>
        {messageType === 'image' && (
          <div style={styles.mediaContainer} onClick={handleMediaClick}>
            <img src={content} alt="Shared" style={styles.image} />
          </div>
        )}
        {messageType === 'video' && (
          <div style={styles.mediaContainer} onClick={handleMediaClick}>
            <video src={content} controls style={styles.video} />
          </div>
        )}
        {messageType === 'text' && (
          <div style={styles.textContent}>{content}</div>
        )}
      </div>
      <div style={styles.timeContainer}>
        {isMine && (
          <FontAwesomeIcon
            icon={hasBeenSeen ? faCheckDouble : faCheck}
            style={styles.seenIcon}
          />
        )}
        <span style={styles.time}>{formatTime(createdAt)}</span>
      </div>
    </div>
  );
};

export { ChatBubble };
