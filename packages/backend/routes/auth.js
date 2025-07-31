const express = require('express');
const router = express.Router();
const passport = require('passport');

const {register , login, googleCallbackHandler} = require('../controllers/auth.js');

router.post('/register',register);
router.post('/login',login);

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    googleCallbackHandler
);

module.exports = router;
