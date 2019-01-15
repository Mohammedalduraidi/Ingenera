var express = require('express');
var router = express.Router();
const baseAuth = require('../access-controll/base-auth')



/* GET home page. */
const authController = require('./Auth/index');

router.use('/auth', authController);


router.get('/secure', baseAuth, (req, res) => {
	const { user } = req;
	res.send(user);
});

module.exports = router;
