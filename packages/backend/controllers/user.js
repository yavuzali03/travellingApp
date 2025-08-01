const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token bulunamadı" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error("getCurrentUser error:", err.message);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).select("-password");

        return res.status(200).json(user);

    }catch (err){
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
}

module.exports = {getCurrentUser ,getUser};
