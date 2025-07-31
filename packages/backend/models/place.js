const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
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

placeSchema.index({ location: "2dsphere" });

module.exports = mongoose.models.Place || mongoose.model("Place", placeSchema, "places");
