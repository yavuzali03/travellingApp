const express = require('express');
const router = express.Router();

const { GeminiApi } = require('../controllers/geminiService.js');

router.post('/gemini/place-details', GeminiApi);

module.exports = router;
