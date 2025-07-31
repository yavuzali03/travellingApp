import axios from "axios";

const API_URL = 'http://localhost:5002/api';

export const getFriends = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/friends/getfriends/${userId}`);
        return response.data;
    } catch (err) {
        console.error("Get Friends Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const getFriendRequests = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/friends/getfriendrequests/${userId}`);
        return response.data;
    } catch (err) {
        console.error("Get Friend Requests Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const sentFriendRequest = async (userId, friendId) => {
    try {
        const response = await axios.post(`${API_URL}/friends/sent/${userId}`, { friendId });
        return response.data;
    } catch (err) {
        console.error("Send Friend Request Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const acceptFriendRequest = async (userId, friendId) => {
    try {
        const response = await axios.post(`${API_URL}/friends/accept/${userId}`, { friendId });
        return response.data;
    } catch (err) {
        console.error("Accept Friend Request Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const declineFriendRequest = async (userId, friendId) => {
    try {
        const response = await axios.post(`${API_URL}/friends/decline/${userId}`, { friendId });
        return response.data;
    } catch (err) {
        console.error("Decline Friend Request Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const cancelFriendRequest = async (userId, friendId) => {
    try {
        const response = await axios.delete(`${API_URL}/friends/cancel/${userId}`, {
            data: { friendId }
        });
        return response.data;
    } catch (err) {
        console.error("Cancel Friend Request Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};
