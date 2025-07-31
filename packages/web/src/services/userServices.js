import axios from "axios";

const API_URL = 'http://localhost:5002/api';

export const getCurrentUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error("Get Current User Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (err) {
        console.error("Get User Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};


