import axios from "axios";

const API_URL = process.env.API_URL;

export const createTrip = async (tripData, token) => {
    try {
        const response = await axios.post(`${API_URL}/createTrip`, tripData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
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
export const getAllTrip = async (req, res) => {
    try {


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
