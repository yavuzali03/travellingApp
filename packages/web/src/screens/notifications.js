import React, { useEffect, useState } from 'react';
import { useUser } from "../contexts/userContext";
import TopBar from '../components/topBar';
import ButtonOutlined from '../components/buttonOutlined';
import ButtonFilled from '../components/buttonFilled';
import useFriendsViewModel from "../viewmodels/friendsViewModel";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFFFF8',
    padding: '20px',
    marginLeft: '200px'
  },
  content: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#f8f9fa',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  notificationUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#eee',
    marginRight: '0.5rem',
    overflow: 'hidden'
  },
  userName: {
    fontWeight: 500,
    color: '#333',
    fontSize: '1rem'
  },
  notificationActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  emptyState: {
    textAlign: 'center',
    color: '#666',
    padding: '2rem'
  }
};

export const Notifications = () => {
    const { user } = useUser();
    const { getFriendRequestsData, acceptRequest, declineRequest } = useFriendsViewModel();
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        async function getFriendsRequest(userId) {
            const response = await getFriendRequestsData(userId);
            setFriendRequests(response);
        }
        getFriendsRequest(user._id);
    }, []);

    const renderItem = (item) => {
        return (
            <div style={styles.notificationItem}>
                <div style={styles.notificationUser}>
                    <div style={styles.userAvatar}></div>
                    <span style={styles.userName}>{item.friendId.username}</span>
                </div>
                <div style={styles.notificationActions}>
                    <ButtonOutlined 
                        title="Reddet" 
                        onPress={() => declineRequest(user._id, item.friendId._id)}
                    />
                    <ButtonFilled 
                        title="Kabul Et" 
                        onPress={() => acceptRequest(user._id, item.friendId._id)}
                    />
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
          
            <div style={styles.content}>
                {friendRequests.length > 0 ? (
                    friendRequests.map((item) => (
                        <div key={item._id}>
                            {renderItem(item)}
                        </div>
                    ))
                ) : (
                    <div style={styles.emptyState}>
                        Henüz bildiriminiz bulunmuyor
                    </div>
                )}
            </div>
        </div>
    );
};
