const express = require('express');
const router = express.Router();
const baseAuth = require('../access-controll/base-auth')



/* GET home page. */
const authController = require('./Auth/index');
router.use('/auth', authController);


/*
  * Get Missions
*/

const Missions = require('./Missions/index');
router.use('/mission', Missions);


/*
  * security checking
*/
router.get('/secure', baseAuth, (req, res) => {
	const { user } = req;
	res.send(user);
});

module.exports = router;
