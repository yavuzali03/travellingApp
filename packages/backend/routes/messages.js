const express = require('express');
const router = express.Router();

const {getMessages, getUserRooms} = require('../controllers/messages.js');

router.get('/messages/:roomId',getMessages)
router.get('/messages/rooms/:userId',getUserRooms)
module.exports = router;
