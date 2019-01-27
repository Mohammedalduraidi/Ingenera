const express = require('express');
const router = express.Router();


/*
    Handlers
*/
const forgotPassword = require('./forgot-password')
const resetPassword = require('./resetpassword')
const register = require('./signUp');
const login = require('./login');
/*
    Routes
*/
router.post('/reset', resetPassword);
router.post('/forgot', forgotPassword);
router.post('/login', login);
router.post('/signup', register);

module.exports = router;

