var express = require('express');
var router = express.Router();
const baseAuth = require('../../access-controll/base-auth');

/*
    Handlers
*/

const logout = require('./logout');
const register = require('./signUp');
const login = require('./login');

/*
    Routes
*/
console.log("here")
router.post('/signup', register);
router.post('/login', login);
router.get('/logout', baseAuth, logout);

module.exports = router;
