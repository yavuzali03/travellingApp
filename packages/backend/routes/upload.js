const express = require('express');
const router = express.Router();
const {
    uploadProfileImage
    ,uploadMessageMedia
    ,uploadTripProfileImage
} = require('../controllers/upload');

router.post('/upload-profile/:userId', uploadProfileImage);
router.post('/upload-message-media', uploadMessageMedia);
router.post('/upload-trip-profile/:tripId', uploadTripProfileImage);
module.exports = router;
