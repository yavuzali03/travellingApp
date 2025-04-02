import axios from "axios";

const API_URL = "http://3.73.77.54:5000/api";

export const getUser = async (token) => {
    try {
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
