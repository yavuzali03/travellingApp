import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from "../contexts/userContext";
import useMessageViewModel from "../viewmodels/messageViewModel";
import { ChatBubble } from "../components/chatBubble";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faCircle } from '@fortawesome/free-solid-svg-icons';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#FFFFF8',
    minHeight: '100vh',
    position: 'relative'
  },
  topBarContainer: {
    position: 'fixed',
    top: 0,
    left: '200px',
    right: 0,
    zIndex: 1000,
    backgroundColor: '#FFFFF8',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '1200px',
    margin: '0 auto',
    width: 'calc(100% - 200px)',
    padding: 0
  },
  topBar: {
    height: '60px',
    backgroundColor: '#FFFFF8',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 20px',
    margin: 0
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
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '60px',
    marginBottom: '80px',
    maxWidth: '1200px',
    margin: '60px auto 80px',
    width: 'calc(100% - 200px)'
  },
  inputContainer: {
    position: 'fixed',
    bottom: 0,
    left: '200px',
    right: 0,
    backgroundColor: 'white',
    padding: '15px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1000,
    maxWidth: '1200px',
    margin: '0 auto',
    width: 'calc(100% - 200px)'
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start'
  },
  myMessage: {
    alignSelf: 'flex-end',
    maxWidth: '75%',
    width: 'fit-content'
  },
  otherMessage: {
    alignSelf: 'flex-start',
    maxWidth: '75%',
    width: 'fit-content'
  },
  input: {
    flex: 1,
    padding: '12px 15px',
    border: '1px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#f8f8f8',
    '&:focus': {
      borderColor: '#2D2D74',
      backgroundColor: 'white'
    }
  },
  sendButton: {
    backgroundColor: '#2D2D74',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#1f1f4f',
      transform: 'scale(1.05)'
    },
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
      transform: 'none'
    }
  },
  mediaButton: {
    color: '#2D2D74',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      transform: 'scale(1.05)'
    }
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#666',
    gap: '10px',
    padding: '20px'
  },
  emptyStateText: {
    fontSize: '16px',
    textAlign: 'center',
    color: '#888'
  }
};

const ChatScreen = () => {
  const { roomId: routeRoomId } = useParams();
  const location = useLocation();
  const { user } = useUser();
  const messageListRef = useRef(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const getProfileImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/150';
    return imageUrl.replace('10.0.2.2:5002', 'localhost:5002');
  };

  const {
    roomId = routeRoomId,
    roomType = "private",
    currentUser = user._id,
    otherUser = null,
    groupName = "",
    groupPhoto = "",
    participants = []
  } = location.state || {};

  const displayOtherUser = otherUser ? {
    ...otherUser,
    profileImage: getProfileImageUrl(otherUser.profileImage)
  } : null;

  useEffect(() => {
    console.log('Chat Ekranı Props:', {
      roomId,
      roomType: location.state?.roomType,
      currentUser: location.state?.currentUser,
      otherUser: displayOtherUser,
      groupName: location.state?.groupName,
      groupPhoto: getProfileImageUrl(location.state?.groupPhoto),
      participants: location.state?.participants
    });
  }, [roomId, location.state]);

  const {
    messages,
    messageInput,
    setMessageInput,
    sendMessage,
    seenMessage,
    isTyping,
    isOnline,
    selectMediaAndSend,
    fetchMessages
  } = useMessageViewModel({
    roomId,
    currentUser,
    otherUser,
    roomType
  });

  useEffect(() => {
    console.log('Room Details:', { roomType, groupPhoto, groupName, otherUser });
  }, [roomType, groupPhoto, groupName, otherUser]);

  useEffect(() => {
    if (messages.length > 0 && roomId && user._id) {
      seenMessage();
    }
  }, [messages.length, roomId, user._id]);

  useEffect(() => {
    if (isScrolledToBottom && messages.length > 0) {
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages.length, isScrolledToBottom]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsScrolledToBottom(isAtBottom);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessage();
      setMessageInput('');
      setIsScrolledToBottom(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMediaSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      selectMediaAndSend(files);
    };
    input.click();
  };

  console.log('Other User:', otherUser);
  console.log('Other User:', roomType);
  console.log('Other User:', groupPhoto);
  const renderMessageItem = (message) => {
    const isMine = message.sender._id === user._id;
    const seenUserIds = (message.seenBy || []).map(entry =>
      typeof entry.user === 'object' ? entry.user._id : entry.user
    );
    const totalOthers = message.participants?.filter(p => p._id !== user._id).length || 0;
    const othersSeenCount = seenUserIds.filter(id => id !== user._id).length;

    const hasBeenSeen = message.roomType === 'private'
      ? othersSeenCount > 0
      : othersSeenCount >= totalOthers;

    const isMedia = message.messageType === 'image' || message.messageType === 'video';
    const allMediaMessages = messages.filter(m => m.messageType === 'image' || m.messageType === 'video');
    const indexOfThisMedia = isMedia
      ? allMediaMessages.findIndex(m => m.content === message.content)
      : -1;

    return (
      <div
        key={message._id}
        style={styles.messageWrapper}
      >
        <div style={isMine ? styles.myMessage : styles.otherMessage}>
          <ChatBubble
            content={message.content}
            isMine={isMine}
            createdAt={message.createdAt}
            hasBeenSeen={hasBeenSeen}
            messageType={message.messageType}
            mediaList={isMedia ? allMediaMessages : []}
            mediaIndex={isMedia ? indexOfThisMedia : 0}
          />
        </div>
      </div>
    );
  };

  const getSubText = () => {
    if (isTyping) return 'Yazıyor...';
    if (roomType === 'group') return 'Grup Sohbeti';
    return isOnline ? 'Çevrimiçi' : 'Çevrimdışı';
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBarContainer}>
        <div style={styles.topBar}>
          {(roomType === 'group' ? groupPhoto : displayOtherUser?.profileImage) && (
            <img 
              src={roomType === 'group' ? groupPhoto : displayOtherUser?.profileImage} 
              alt="Profile" 
              style={styles.profileImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/36';
              }}
            />
          )}
          
          <div style={styles.userInfo}>
            <h3 style={styles.userName}>
              {roomType === 'group' ? groupName : displayOtherUser ? displayOtherUser.username : 'Sohbet'}
            </h3>
            <div style={isTyping ? styles.typingStatus : styles.status}>
              {getSubText()}
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={messageListRef} 
        style={styles.messageList}
        onScroll={handleScroll}
      >
        {messages.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>Henüz mesaj yok</p>
            <p style={styles.emptyStateText}>Sohbete başlamak için bir mesaj gönderin</p>
          </div>
        ) : (
          messages.map(renderMessageItem)
        )}
      </div>

      <div style={styles.inputContainer}>
        <FontAwesomeIcon
          icon={faPaperclip}
          style={styles.mediaButton}
          onClick={handleMediaSelect}
        />
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Mesajınızı yazın..."
          style={styles.input}
        />
        <button 
          onClick={handleSendMessage} 
          style={styles.sendButton}
          disabled={!messageInput.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;