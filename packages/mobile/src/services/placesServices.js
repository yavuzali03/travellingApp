import axios from 'axios';

const API_URL = process.env.API_URL;
const test_API_URL = process.env.test_API_URL;

export const fetchNearbyPlaces = async (lat, lng) => {
    try {
        const response = await axios.get(`${test_API_URL}/places/all-nearby`, {
            params: { lat, lng, radius: 10000 }
        });
        return response.data;
    } catch (error) {
        console.error('❌ fetchNearbyPlaces error:', error.message);
        throw error;
    }
};

