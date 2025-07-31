import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1001
  },
  mediaContainer: {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '24px',
    objectFit: 'cover'
  },
  senderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  senderName: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    margin: 0
  },
  sentAt: {
    color: '#ccc',
    fontSize: '14px',
    margin: 0
  },
  media: {
    width: '100%',
    maxHeight: 'calc(100vh - 200px)',
    objectFit: 'contain'
  },
  video: {
    width: '100%',
    maxHeight: 'calc(100vh - 200px)'
  }
};

export const MediaPreview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mediaList, setMediaList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mediaListParam = searchParams.get('mediaList');
    const initialIndexParam = searchParams.get('initialIndex');

    if (mediaListParam) {
      try {
        const parsedMediaList = JSON.parse(mediaListParam);
        setMediaList(parsedMediaList);
        setCurrentIndex(parseInt(initialIndexParam) || 0);
      } catch (error) {
        console.error('Medya listesi parse edilemedi:', error);
        navigate('/chats');
      }
    } else {
      navigate('/chats');
    }
  }, [searchParams, navigate]);

  const currentMedia = mediaList[currentIndex];

  if (!currentMedia) {
    return null;
  }

  return (
    <div style={styles.container}>
      <FontAwesomeIcon
        icon={faTimes}
        style={styles.closeButton}
        onClick={() => navigate('/chats')}
      />

      <div style={styles.mediaContainer}>
        <div style={styles.header}>
          <img
            src={currentMedia.sender?.profileImage}
            style={styles.avatar}
            alt="Sender avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/48';
            }}
          />
          <div style={styles.senderInfo}>
            <h3 style={styles.senderName}>
              {currentMedia.sender?.firstName} {currentMedia.sender?.lastName}
            </h3>
            <p style={styles.sentAt}>
              {new Date(currentMedia.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {currentMedia.messageType === 'image' ? (
          <img
            src={currentMedia.content}
            style={styles.media}
            alt="Message media"
          />
        ) : (
          <video
            src={currentMedia.content}
            style={styles.video}
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};
