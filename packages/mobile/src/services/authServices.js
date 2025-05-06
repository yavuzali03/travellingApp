import axios from "axios";

const API_URL = process.env.API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (err) {
        console.error("Register API Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};

export const loginUser = async (userData) => {
    try {
        console.log("çalışıyom2")
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (err) {
        console.error("Login API Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};
