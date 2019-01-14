var express = require('express');
var router = express.Router();

/* GET home page. */
const authController = require('./Auth/index');

router.use('/auth', authController);


router.get('/secure', baseAuth, (req, res) => {
	const { user } = req;
	res.send(user);
});

module.exports = router;
