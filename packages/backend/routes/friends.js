const express = require('express');
const router = express.Router();

const {sendFriendRequest, acceptFriendRequest , declineFriendRequest , getFriends,getFriendRequests} = require('../controllers/friends.js');

router.post('/friends/sent/:userId',sendFriendRequest);
router.post('/friends/accept/:userId',acceptFriendRequest);
router.post('/friends/decline/:userId',declineFriendRequest);
router.get('/friends/getfriends/:userId',getFriends);
router.get('/friends/getfriendrequests/:userId',getFriendRequests);
module.exports = router;
