const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
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
            type: [Number],
            required: true
        }
    }
});

foodSchema.index({ location: "2dsphere" });

module.exports = mongoose.models.Food || mongoose.model("Food", foodSchema, "foods");
