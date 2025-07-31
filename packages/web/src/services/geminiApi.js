import axios from "axios";

const API_URL = 'http://localhost:5002/api';

export const GeminiService = async (city, coordinates, name) => {
    try {
        const response = await axios.post(`${API_URL}/gemini/place-details`, {
            city,
            coordinates,
            name,
        });
        return response.data.result;
    } catch (err) {
        console.error("Gemini API Error:", err.response ? err.response.data : err.message);
        throw err;
    }
};
