const express = require('express');
const router = express.Router();

const {getCurrentUser} = require('../controllers/user.js');

router.get("/user/me", getCurrentUser);

module.exports = router;
