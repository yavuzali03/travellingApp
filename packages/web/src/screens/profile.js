import React, { useEffect, useState } from 'react';
import { useUser } from "../contexts/userContext";
import TopBar from '../components/topBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faSignOutAlt, faUsers, faPlane, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuthViewModel from "../viewmodels/authViewModel";
import useUserViewModel from "../viewmodels/userViewModel";
import FriendsViewModel from "../viewmodels/friendsViewModel";
import { useNavigate, useParams } from 'react-router-dom';
import ButtonFilled from '../components/buttonFilled';
import ButtonOutlined from '../components/buttonOutlined';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFFFF8',
    padding: '20px',
    alignItems: 'center'
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '2rem'
  },
  avatar: {
    width: '220px',
    height: '220px',
    borderRadius: '110px',
    objectFit: 'cover',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  username: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '0.5rem'
  },
  fullName: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '1rem'
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  statLabel: {
    fontSize: '16px',
    color: '#666'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#ED1C24'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '300px'
  },
  button: {
    width: '100%',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  primaryButton: {
    backgroundColor: '#ED1C24',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c41820'
    }
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#ED1C24',
    border: '1px solid #ED1C24',
    '&:hover': {
      backgroundColor: '#fff5f5'
    }
  }
};

export const Profile = () => {
  const { user: currentUser } = useUser();
  const { handleLogout } = useAuthViewModel();
  const { getUserData } = useUserViewModel();
  const { sendRequest, cancelRequest } = FriendsViewModel();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);
  const [friendStatus, setFriendStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMyProfile = !userId || userId === currentUser._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (isMyProfile) {
          setUserData(currentUser);
        } else {
          console.log('Fetching user data for ID:', userId);
          const data = await getUserData(userId);
          console.log('Received user data:', data);
          if (data) {
            setUserData(data);
            // Arkadaşlık durumunu kontrol et
            const isFriend = currentUser.friends?.includes(userId);
            const isSent = currentUser.friendRequests?.some(
              (r) => r.friendId === userId && r.direction === "sent"
            );
            const isReceived = currentUser.friendRequests?.some(
              (r) => r.friendId === userId && r.direction === "received"
            );

            if (isFriend) setFriendStatus("friend");
            else if (isReceived) setFriendStatus("received");
            else if (isSent) setFriendStatus("sent");
            else setFriendStatus(null);
          } else {
            console.warn("Kullanıcı verisi gelmedi");
          }
        }
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId || isMyProfile) {
      fetchData();
    }
  }, [userId, currentUser, isMyProfile]);

  const handleSendRequest = async () => {
    try {
      await sendRequest(currentUser._id, userData._id);
      setFriendStatus("sent");
    } catch (error) {
      console.error("Arkadaşlık isteği gönderilemedi:", error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await cancelRequest(currentUser._id, userData._id);
      setFriendStatus(null);
    } catch (error) {
      console.error("Arkadaşlık isteği iptal edilemedi:", error);
    }
  };

  const getProfileImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/150';
    return imageUrl.replace('10.0.2.2:5002', 'localhost:5002');
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Yükleniyor...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Kullanıcı bulunamadı</div>
      </div>
    );
  }

  const roomId = [currentUser._id, userData._id].sort().join("_");

  return (
    <div style={styles.container}>
      

      <div style={styles.userContainer}>
        {userData.profileImage ? (
          <img
            src={getProfileImageUrl(userData.profileImage)}
            style={styles.avatar}
            alt={userData.username}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        ) : (
          <div style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            backgroundColor: '#E0E0E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <FontAwesomeIcon icon={faUser} size={80} color="#666" />
          </div>
        )}
        <div style={styles.username}>{userData.username}</div>
        <div style={styles.fullName}>{userData.firstName} {userData.lastName}</div>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <FontAwesomeIcon icon={faPlane} size={24} color="#666" />
          <span style={styles.statLabel}>Geziler</span>
          <span style={styles.statValue}>{userData.trips?.length || 0}</span>
        </div>
        <div style={styles.statItem}>
          <FontAwesomeIcon icon={faUsers} size={24} color="#666" />
          <span style={styles.statLabel}>Arkadaşlar</span>
          <span style={styles.statValue}>{userData.friends?.length || 0}</span>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        {isMyProfile ? (
          <>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate('/friends')}
            >
              <FontAwesomeIcon icon={faUsers} />
              Arkadaşlarım
            </button>
            <button 
              style={{...styles.button, ...styles.secondaryButton}}
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Çıkış Yap
            </button>
          </>
        ) : friendStatus === "friend" ? (
          <>
            <ButtonFilled
              title="Arkadaşsınız"
            />
            <ButtonFilled
              title="Mesaj Gönder"
              onPress={() => {
                const roomId = [currentUser._id, userData._id].sort().join("_");
                navigate(`/chat/${roomId}`, {
                  state: {
                    roomType: "private",
                    currentUser: currentUser._id,
                    otherUser: {
                      _id: userData._id,
                      firstName: userData.firstName,
                      lastName: userData.lastName,
                      username: userData.username,
                      profileImage: userData.profileImage,
                    },
                    participants: [currentUser._id, userData._id]
                  }
                });
              }}
            />
          </>
        ) : friendStatus === "received" ? (
          <div style={styles.buttonContainer}>
            <ButtonFilled
              title="Kabul Et"
              onPress={() => console.log("Kabul Et")}
            />
            <ButtonFilled
              title="Reddet"
              onPress={() => console.log("Reddet")}
            />
          </div>
        ) : friendStatus === "sent" ? (
          <ButtonOutlined
            title="İstek Gönderildi"
            onPress={() => handleCancelRequest()}
          />
        ) : (
          <ButtonFilled
            title="Arkadaş Ekle"
            onPress={() => handleSendRequest()}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
