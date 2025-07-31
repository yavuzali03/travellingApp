import axios from "axios";

const API_URL = process.env.API_URL;
const test_API_URL = process.env.test_API_URL;

export const GeminiService = async (city , coordinates ,name) => {
    try {
        const response = await axios.post(`${test_API_URL}/gemini/place-details`, {
            city: city,
            coordinates: coordinates,
            name: name,
        })
        return response.data.result;
    }
    catch(err) {
        console.log("API HATASI : ",err.message);
    }

}
