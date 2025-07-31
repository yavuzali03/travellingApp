const Hotel = require("../models/hotel");
const Food = require("../models/food");
const Place = require("../models/place");

const getNearbyAll = async (req, res) => {
    const { lat, lng, radius } = req.query;

    const coordinates = [parseFloat(lng), parseFloat(lat)];
    const maxDistance = parseInt(radius) || 3000;

    const geoQuery = {
        location: {
            $nearSphere: {
                $geometry: { type: "Point", coordinates },
                $maxDistance: maxDistance
            }
        }
    };

    try {
        const [hotels, foods, places] = await Promise.all([
            Hotel.find(geoQuery),
            Food.find(geoQuery),
            Place.find(geoQuery)
        ]);

        res.json({ hotels, foods, places });
    } catch (err) {
        res.status(500).json({ error: "Yakın mekanlar alınamadı", details: err.message });
    }
};

module.exports = { getNearbyAll };
