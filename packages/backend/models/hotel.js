const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: String,
    city: String,
    category: String,
    address: String,
    rating: Number,
    photo: String,
    maps_url: String,
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true
        }
    }
});

hotelSchema.index({ location: "2dsphere" });

module.exports = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema, "hotels");
