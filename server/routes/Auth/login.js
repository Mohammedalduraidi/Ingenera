const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const { compare } = require('bcryptjs');
const { users } = require('../../../Database/index');

module.exports = login = (req, res) => {
	const { email, password } = req.body;
	users.findOne({ email }, (err, data) => {
		console.log("check data ", data)
		if (err) {
			res.sendStatus(500);
		} else if (!data) {
			res.send({
				code: 409,
				message: 'User Does Not Exist'
			});

		} else {
			compare(password, data.password, (err, match) => {
				if (err) {
					console.log(err)
					res.sendStatus(500);
					return;
				}
				if (match) {
					const token = jwt.sign({
						userType: data.userType,
						email, id: data._id
					}, config.secret);
					res.send({
						userType: data.userType,
						token,
						code: 200,
						message: `Welcome Back ${data.firstName}`,
						routes: data.userType === "pm" ?
							"landing" : data.userType === "bm" ?
								'bmHome' : 'adminHome'
					});
					return;
				}
				else {
					res.send({
						code: 409,
						message: 'Password is wrong'
					})
					return;
				}
			});
		}
	});
};
