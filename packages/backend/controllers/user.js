const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        // Header'dan Bearer token'ı al
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token bulunamadı" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN); // token'dan user id'yi al

        // Kullanıcıyı bul ve password alanı hariç gönder
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

module.exports = {getCurrentUser};
