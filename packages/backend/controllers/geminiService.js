const { GoogleGenerativeAI } = require("@google/generative-ai");

const GeminiApi = async (req, res) => {
    const { city, coordinates, name } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        console.log("API Anahtarı bulunamadı.");
        return res.status(500).json({ error: "API anahtarı eksik." });
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        const prompt = `${city} şehrinde olan, ${coordinates} konumunda bulunan ${name} mekanı hakkında paragraf şeklinde bilgi ver. 
                               Kullanıcı yorumlarını da baz alarak bilgi ver. Koordinatları yazmana gerek yok. En fazla 2 paragraf olsun.`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return res.status(200).json({ result: text });
    } catch (e) {
        console.error("Gemini API Hatası:", e);
        return res.status(500).json({ error: "Gemini API hatası", detail: e.message });
    }
};

module.exports = { GeminiApi };
