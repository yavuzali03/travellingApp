const express = require('express');
const router = express.Router();

const {sendFriendRequest, acceptFriendRequest , declineFriendRequest} = require('../controllers/friends.js');

router.post('/friends/sent/:userId',sendFriendRequest);
router.post('/friends/accept/:userId',acceptFriendRequest);
router.post('/friends/decline/:userId',declineFriendRequest);

module.exports = router;
