const express = require('express');
const router = express.Router();
const baseAuth = require('../access-controll/base-auth')



/* GET home page. */
const authController = require('./Auth/index');
router.use('/auth', authController);


/*
	GET mission Page
*/

const Missions = require('./Missions/index');
router.use('/mission', Missions);


router.get('/secure', baseAuth, (req, res) => {
	const { user } = req;
	res.send(user);
});

module.exports = router;
