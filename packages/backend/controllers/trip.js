const Trip = require("../models/Trip.js");
const Expense = require("../models/Expenses.js");
const MessageRoom = require("../models/MessageRoom.js");
const User = require("../models/User.js");

const createTrip = async (req, res) => {
    try {
        const { creator, title, description, participants, groupPhoto,startDate, endDate } = req.body;

        if (!participants || participants.length === 0) {
            return res.status(400).json({ message: "En az 1 katılımcı olmalıdır." });
        }

        const newTrip = await Trip.create({ creator, title, description, participants , profileImage: groupPhoto || null , startDate, endDate });

        console.log("📥 Gelen trip verisi:", req.body);

        if(newTrip) {
            await MessageRoom.create({
                roomId: `trip_${newTrip._id}`,
                roomType: "group",
                participants,
                groupName: title,
                groupPhoto: groupPhoto || null,
                messages: []
            });

            await Promise.all(
                participants.map(userId =>
                    User.findByIdAndUpdate(userId, {
                        $addToSet: { trips: newTrip._id }
                    })
                )
            );
        }


        return res.status(201).json({
            message: "Yeni gezi ve grup sohbeti oluşturuldu",
            newTrip,
        });

    } catch (err) {
        console.error("Trip oluşturulurken hata:", err.message);
        res.status(500).json({ message: err.message });
    }
};
const getTrip = async (req, res) => {
    try {
        const {tripId} = req.params;

        const trip = await Trip.findById(tripId)
            .populate("participants", "_id username email profileImage firstName lastName phoneNumber")
            .populate({
                path: "expenses",
                options: { sort: { createdAt: -1 } },
                populate: { path: "paidBy", select: "username email" } // Harcamaları ve ödeyen kişiyi getir
            });

        return res.status(200).json(trip)
    }catch(err) {
        res.status(500).json({message: err.message});
    }
}
const getAllTrip = async (req, res) => {
    try {
        const userId = req.params.userId;

        const trips = await Trip.find({
            $or: [{ creator: userId }, { participants: userId }]
        })
            .populate('participants', 'username profileImage firstName lastName email phoneNumber')
            .populate({
                path: "expenses",
                populate: {
                    path: "paidBy",
                    model: "User"
                }
            })
            .sort({ createdAt: -1 });

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: "Bu kullanıcıya ait gezi bulunamadı!" });
        }

        return res.status(200).json({ trips });

    } catch (err) {
        res.status(500).json({ message: "Geziler alınırken hata oluştu." });
    }
}

const addExpenses = async (req, res) => {
    try {
        const {tripId, userId} = req.params;
        const {amount, description, receipt} = req.body;

        let newExpense = await Expense.create({
            trip : tripId,
            paidBy : userId,
            amount,
            description,
            receipt : receipt || null,
        });

        newExpense = await newExpense.populate("paidBy");

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
module.exports = {createTrip, getTrip ,addExpenses ,getAllTrip};
