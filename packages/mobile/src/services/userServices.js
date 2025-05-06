import axios from "axios";

const API_URL = process.env.API_URL;

export const getUser = async (token) => {
    try {
        console.log("çalışıyom")
        const response = await axios.get(`${API_URL}/user/me`, {
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


