import axios from "axios";

const API_URL = 'http://localhost:5002/api';

export const createTripService = async (tripData, token) => {
    try {
        const response = await axios.post(`${API_URL}/createTrip`, tripData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.newTrip;
    } catch (err) {
        console.error('Create Trip Error:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const getTrip = async (tripId) => {
    try {
        console.log('getTrip fonksiyonu çağrıldı');
        console.log('Trip ID:', tripId);

        const token = localStorage.getItem('authToken');
        console.log('Token var mı:', !!token);

        if (!token) {
            throw new Error('Token bulunamadı');
        }

        if (!tripId) {
            throw new Error('Trip ID bulunamadı');
        }

        console.log('API isteği yapılıyor...');
        console.log('URL:', `${API_URL}/getTrip/${tripId}`);

        const response = await axios.get(`${API_URL}/getTrip/${tripId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('API yanıtı:', response.data);

        if (!response.data || !response.data.trip) {
            throw new Error('Gezi verisi bulunamadı');
        }

        return response.data.trip;
    } catch (err) {
        console.error('Get Trip Error:', err);
        console.error('Error Response:', err.response);
        console.error('Error Message:', err.message);
        
        if (err.response?.status === 404) {
            throw new Error('Gezi bulunamadı');
        }
        throw err;
    }
};

export const getAllTrip = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/getAllTrip/${userId}`);
        return response.data.trips;
    } catch (err) {
        console.error('Get All Trips Error:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const addExpenses = async (tripId, userId, { amount, description }) => {
    try {
        const response = await axios.post(
            `${API_URL}/addExpenses/${tripId}/${userId}`,
            {
                amount,
                description,
                receipt: null // şimdilik boş
            }
        );

        return response.data;
    } catch (err) {
        console.error('Add Expense Error:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const uploadTripCoverService = async (tripId, file) => {
    const formData = new FormData();
    formData.append('media', file);

    const response = await axios.post(
        `${API_URL}/upload-trip-profile/${tripId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
};
