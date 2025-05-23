import axios from "axios";

const API_URL = process.env.API_URL;
const test_API_URL = process.env.test_API_URL;
export const getCurrentUser = async (token) => {
    try {

        const response = await axios.get(`${test_API_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (err) {
        console.error("API Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${test_API_URL}/user/${userId}`);
        return response.data;
    } catch (err) {
        console.error("API Error:", err.response ? err.response.data : err.message);
    }
}


