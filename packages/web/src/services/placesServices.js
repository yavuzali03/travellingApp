import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const test_API_URL = 'http://localhost:5002/api';

export const fetchNearbyPlaces = async (latitude, longitude, radius = 20000) => {
    try {
        const response = await axios.get(`${test_API_URL}/places/all-nearby`, {
            params: {
                lat: latitude,
                lng: longitude,
                radius
            }
        });
        return response.data;
    } catch (err) {
        console.error('fetchNearbyPlaces error:', err.response ? err.response.data : err.message);
        throw err;
    }
};

