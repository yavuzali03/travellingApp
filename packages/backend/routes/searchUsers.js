const express = require('express');
const router = express.Router();

const {searchUsers} = require('../controllers/searchUsers.js');

router.get('/search/',searchUsers);

module.exports = router;
