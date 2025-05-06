import axios from "axios";

const API_URL = process.env.API_URL;

export const getFriends = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/friends/getfriends/${userId}`);
        return response.data;
        console.log("deneme",friends)
    }catch(err) {
        console.log("API Error:", err.response ? err.response.data : err.message);
    }
};

export const getFriendRequests = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/friends/getfriendrequests/${userId}`);
        return response.data;
    }catch(err) {
        console.log("API Error:", err.response ? err.response.data : err.message);
    }
};


export const acceptFriendRequest = async (userId, friendId) => {

    try {
        const response = await axios.post(`${API_URL}/friends/accept/${userId}`, {friendId});
        return response.data;
    }catch(err) {
        console.log("API Error:", err.response ? err.response.data : err.message);
    }
}
export const declineFriendRequest = async (userId, friendId) => {
    try {
        const response = await axios.post(`${API_URL}/friends/decline/${userId}`, {friendId});
        return response.data;
    }catch(err) {
        console.log("API Error:", err.response ? err.response.data : err.message);
    }
}
