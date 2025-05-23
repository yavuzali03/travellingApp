import axios from "axios";

const API_URL = process.env.API_URL;
const test_API_URL = process.env.test_API_URL;

export const getAllMessages = async (userId) => {
    try {
        const response = await axios.get(`${test_API_URL}/messages/rooms/${userId}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

export const fetchMessagesService = async (roomId, skip = 0, limit = 50) => {
    const response = await axios.get(`${test_API_URL}/messages/${roomId}?skip=${skip}&limit=${limit}`);
    return response.data;
};


export const uploadMessageMediaService = async (file) => {
    const formData = new FormData();

    formData.append('media', {
        uri: file.uri,
        type: file.type,
        name: file.fileName || `media_${Date.now()}.${file.type.split('/')[1]}`
    });

    const response = await axios.post(`${test_API_URL}/upload-message-media`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data; // { url: '...' }
};
