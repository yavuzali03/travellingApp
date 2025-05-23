import axios from "axios";

const API_URL = process.env.API_URL;
const test_API_URL = process.env.test_API_URL;
export const createTripService = async (tripData, token) => {
    try {
        const response = await axios.post(`${test_API_URL}/createTrip`, tripData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.newTrip
    } catch (err) {
        console.error('Create Trip Error:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const getTrip = async (req, res) => {
    try {

    }catch(err) {

    }
}

export const getAllTrip = async (userId) => {
    try {
        const response = await axios.get(`${test_API_URL}/getAllTrip/${userId}`);
        return response.data.trips;
    }catch(err) {

    }
}

export const addExpenses = async (req, res) => {
    try {
        const {tripId, userId} = req.params;
        const {amount, description, receipt} = req.body;

        const newExpense = await Expense.create({
            trip : tripId,
            paidBy : userId,
            amount,
            description,
            receipt : receipt || null,
        });

        await Trip.findByIdAndUpdate(tripId,{
            $push: { expenses: newExpense._id }
        })

        return res.status(201).json({
            message : "harcama eklendi",
            newExpense,
        })

    }catch(err) {
        res.status(500).json({message: err.message});
    }
}

export const uploadTripCoverService = async (tripId, file) => {
    const formData = new FormData();

    formData.append('media', {
        uri: file.uri,
        type: file.type,
        name: file.name || `trip-cover-${Date.now()}.jpg`,
    });

    const response = await axios.post(
        `${test_API_URL}/upload-trip-profile/${tripId}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data; // { imageUrl, trip }
};
