import React, { useEffect, useState } from 'react';
import { useUser } from "../contexts/userContext";
import { useNavigate } from 'react-router-dom';
import useMessageViewModel from "../viewmodels/messageViewModel";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#FFFFF8',
    minHeight: '100vh',
    padding: '2rem',
    marginTop: '20px',
    position: 'relative',
    zIndex: 1,
    alignItems: 'center'
  },
  chatList: {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  chatItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
  },
  chatImage: {
    width: '48px',
    height: '48px',
    borderRadius: '24px',
    marginRight: '1rem',
    objectFit: 'cover',
    flexShrink: 0
  },
  chatInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    minWidth: 0,
    marginRight: '1rem'
  },
  chatName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  chatLastMessage: {
    fontSize: '14px',
    color: '#666',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: '12px',
    minWidth: '24px',
    height: '24px',
    padding: '0 6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  loadingText: {
    fontSize: '16px',
    color: '#666'
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gap: '1rem'
  },
  emptyText: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '48px',
    color: '#999'
  }
};

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getUserMessages, rooms, listenForNewMessages } = useMessageViewModel({ userId: user._id });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (user?._id) {
      getUserMessages()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [user]);

  useEffect(() => {
    getUserMessages();
    listenForNewMessages();
  }, []);

  const handleNavigateToChat = (room) => {
    navigate(`/chat/${room.roomId}`, {
      state: {
        roomId: room.roomId,
        roomType: room.roomType,
        currentUser: user._id,
        otherUser:
          room.roomType === "private"
            ? room.participants.find(p => p._id !== user._id)
            : null,
        groupName: room.groupName,
        groupPhoto: room.groupPhoto,
        participants: room.participants
      }
    });
  };

  const getChatPhoto = (room, currentUserId) => {
    if (room.roomType === "private") {
      const otherUser = room.participants.find(p => p._id !== currentUserId);
      if (otherUser?.profileImage) {
        const imageUrl = otherUser.profileImage.replace('10.0.2.2:5002', 'localhost:5002');
        return imageUrl;
      }
      return 'https://via.placeholder.com/48';
    }
    if (room.groupPhoto) {
      const imageUrl = room.groupPhoto.replace('10.0.2.2:5002', 'localhost:5002');
      return imageUrl;
    }
    return 'https://via.placeholder.com/48';
  };

  const getChatName = (room, currentUserId) => {
    if (room.roomType === "private") {
      const otherUser = room.participants.find(p => p._id !== currentUserId);
      return `${otherUser?.firstName || ""} ${otherUser?.lastName || ""}`;
    }
    return room.groupName || "Grup";
  };

  const renderChatItem = (room) => {
    const chatName = getChatName(room, user._id);
    const chatPhoto = getChatPhoto(room, user._id);

    const lastMessage = (() => {
      const msg = room.lastMessage;
      if (!msg) return "Henüz mesaj yok";
      if (msg.messageType === "image") return "📷 Fotoğraf";
      if (msg.messageType === "video") return "🎥 Video";
      return msg.content;
    })();

    const unreadCount = room.unreadCount || 0;

    return (
      <div
        key={room._id}
        onClick={() => handleNavigateToChat(room)}
        style={styles.chatItem}
      >
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <img src={chatPhoto} style={styles.chatImage} alt={chatName} />
          <div style={styles.chatInfo}>
            <div style={styles.chatName}>{chatName}</div>
            <div style={styles.chatLastMessage}>{lastMessage}</div>
          </div>
        </div>
        {unreadCount > 0 && (
          <div style={styles.unreadBadge}>
            {unreadCount}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{ ...styles.container, justifyContent: 'flex-start', alignItems: 'center' }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyContainer}>
          <span style={styles.emptyIcon}>💬</span>
          <span style={styles.emptyText}>Henüz hiç mesajınız yok</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatList}>
        {rooms?.map(room => renderChatItem(room))}
      </div>
    </div>
  );
};

export default Chats;