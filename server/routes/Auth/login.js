const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const { compare } = require('bcryptjs');
const { client } = require('../../../Database/index');

module.exports = login = (req, res) => {
	const { email, password } = req.body;
	client.findOne({ email }, (err, data) => {
		if (err) {
			res.sendStatus(500);
		} else if (!data) {
			res.send({
				err: { code: 404 },
				message: 'User Does Not Exist'
			});
		} else {
			compare(data.password, password, (err, match) => {
				if (err) {
					res.sendStatus(500);
				}
				const token = jwt.sign({ email, id: data._id }, config.secret);
				res.send({ userType: data.userType, token, message: `Welcome Back ${data.firstName}` });
			});
		}
	});
};
