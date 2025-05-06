const User = require('../models/User');

const searchUsers = async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ message: "Sorgu boş olamaz." });
        }

        const users = await User.find({
            username: {
                $regex: query,
                $options: 'i'
            }
        }).limit(10);

        res.status(200).json(users);
    } catch (error) {
        console.error("searchUsers error:", error);
        res.status(500).json({ message: "Arama sırasında bir hata oluştu." });
    }
};

module.exports = { searchUsers };
