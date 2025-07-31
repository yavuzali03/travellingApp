import React, { useState, useEffect } from 'react';
import { useUser } from "../contexts/userContext";
import useFriendsViewModel from "../viewmodels/friendsViewModel";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFFFF8',
    padding: '20px',
    marginLeft: '200px',
    maxWidth: '600px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginTop: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#f5f5f5',
    borderRadius: '24px',
    padding: '0.5rem 1rem',
    border: '1px solid #e9ecef',
    width: '100%',
    maxWidth: '300px'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '1rem',
    width: '100%',
    marginLeft: '0.5rem'
  },
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem'
  },
  tab: {
    padding: '0.5rem 1.5rem',
    border: 'none',
    borderRadius: '24px',
    background: '#f5f5f5',
    color: '#666',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s'
  },
  tabActive: {
    background: '#ED1C24',
    color: 'white'
  },
  badge: {
    background: '#ED1C24',
    color: 'white',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '0.8rem',
    marginLeft: '8px',
    fontWeight: 600
  },
  friendsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  friendCard: {
    display: 'flex',
    alignItems: 'center',
    background: '#f8f9fa',
    borderRadius: '10px',
    padding: '1rem',
    gap: '1rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
  },
  friendAvatar: {
    position: 'relative',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '1rem',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  status: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid #fff'
  },
  statusOnline: {
    background: '#4caf50'
  },
  statusOffline: {
    background: '#ccc'
  },
  friendInfo: {
    flex: 1
  },
  messageButton: {
    background: '#ED1C24',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  messageButtonHover: {
    background: '#c41820'
  },
  requestActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  acceptButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  acceptButtonHover: {
    background: '#388e3c'
  },
  rejectButton: {
    background: '#ED1C24',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  rejectButtonHover: {
    background: '#c41820'
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: '2rem'
  },
  requestDate: {
    fontSize: '0.85rem',
    color: '#888',
    marginTop: '0.25rem'
  }
};

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();
  const { getFriendsData, getFriendRequestsData, acceptRequest, declineRequest } = useFriendsViewModel();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'friends') {
        const friendsData = await getFriendsData(user._id);
        setFriends(friendsData);
      } else {
        const requestsData = await getFriendRequestsData(user._id);
        setFriendRequests(requestsData);
      }
    };
    fetchData();
  }, [activeTab, user._id]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = friendRequests.filter(request =>
    request.friendId.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Bugün';
    } else if (diffDays === 1) {
      return 'Dün';
    } else {
      return `${diffDays} gün önce`;
    }
  };

  const getProfileImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.replace('10.0.2.2:5002', 'localhost:5002');
  };

  const handleMessageClick = (friend) => {
    const roomId = [user._id, friend._id].sort().join("_");
    navigate(`/chat/${roomId}`, {
      state: {
        roomType: "private",
        currentUser: user._id,
        otherUser: {
          _id: friend._id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          username: friend.username,
          profileImage: friend.profileImage,
        },
        participants: [user._id, friend._id]
      }
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Arkadaşlar</h1>
        <div style={styles.searchBar}>
          <FontAwesomeIcon icon={faSearch} color="#666" />
          <input
            type="text"
            placeholder="Arkadaş ara..."
            value={searchQuery}
            onChange={handleSearch}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'friends' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('friends')}
        >
          Arkadaşlarım
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'requests' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('requests')}
        >
          Arkadaşlık İstekleri
          {friendRequests.length > 0 && (
            <span style={styles.badge}>{friendRequests.length}</span>
          )}
        </button>
      </div>

      <div style={styles.friendsList}>
        {activeTab === 'friends' ? (
          filteredFriends.length > 0 ? (
            filteredFriends.map(friend => (
              <div 
                key={friend._id} 
                onClick={() => {
                  console.log('Navigating to profile:', friend._id);
                  navigate(`/profile/${friend._id}`);
                }}
                style={{
                  ...styles.friendCard,
                  cursor: 'pointer'
                }}
              >
                <div style={styles.friendAvatar}>
                  {friend.profileImage ? (
                    <img 
                      src={getProfileImageUrl(friend.profileImage)} 
                      alt={friend.username} 
                      style={styles.avatarImg}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48';
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size={24} color="#666" />
                  )}
                  <span style={{
                    ...styles.status,
                    ...(friend.isOnline ? styles.statusOnline : styles.statusOffline)
                  }} />
                </div>
                <div style={styles.friendInfo}>
                  <h3>{friend.username}</h3>
                </div>
                <button
                  style={styles.messageButton}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = styles.messageButtonHover.backgroundColor}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = styles.messageButton.backgroundColor}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessageClick(friend);
                  }}
                >
                  Mesaj Gönder
                </button>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>Arkadaş bulunamadı</p>
          )
        ) : (
          filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <div 
                key={request._id} 
                onClick={() => {
                  console.log('Navigating to profile:', request.friendId._id);
                  navigate(`/profile/${request.friendId._id}`);
                }}
                style={{
                  ...styles.friendCard,
                  cursor: 'pointer'
                }}
              >
                <div style={styles.friendAvatar}>
                  {request.friendId.profileImage ? (
                    <img 
                      src={getProfileImageUrl(request.friendId.profileImage)} 
                      alt={request.friendId.username} 
                      style={styles.avatarImg}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48';
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size={24} color="#666" />
                  )}
                </div>
                <div style={styles.friendInfo}>
                  <h3>{request.friendId.username}</h3>
                  <span style={styles.requestDate}>{formatDate(request.createdAt)}</span>
                </div>
                <div style={styles.requestActions}>
                  <button
                    style={styles.acceptButton}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = styles.acceptButtonHover.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = styles.acceptButton.backgroundColor}
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptRequest(user._id, request.friendId._id);
                    }}
                  >
                    Kabul Et
                  </button>
                  <button
                    style={styles.rejectButton}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = styles.rejectButtonHover.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = styles.rejectButton.backgroundColor}
                    onClick={(e) => {
                      e.stopPropagation();
                      declineRequest(user._id, request.friendId._id);
                    }}
                  >
                    Reddet
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>Bekleyen istek bulunmuyor</p>
          )
        )}
      </div>
    </div>
  );
};

export default Friends;
