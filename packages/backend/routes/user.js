const express = require('express');
const router = express.Router();

const {getCurrentUser , getUser} = require('../controllers/user.js');

router.get("/user/me", getCurrentUser);
router.get("/user/:userId", getUser);

module.exports = router;
