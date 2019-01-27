var express = require('express');
var router = express.Router();
const baseAuth = require('../../access-controll/base-auth');

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

