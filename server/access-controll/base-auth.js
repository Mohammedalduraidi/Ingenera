const Jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { client } = require('../../Database/index')
const createError = require('http-errors');

const confirmUserId = async (res) => {
	// check if res.locals.companyId is already there
	if (res.locals.id) {
		return;
	}

	// fetch companyId and attach it if it is not there
	const userResp = await client.findOne({
		id: res.locals.user.id,
	});
	return (res.locals.user.id = userResp.id);
};

const baseAuthenticator = async (req, res, next) => {
	try {
		const token = (req.get('Authorization') || '').split(' ');

		// check for Bearer token
		if (token[0] !== 'Bearer') {
			res.render('error', {
				message: 'Unauthorized action',
				error: {
					status: 401,
					stack: 'Session expiered \n Please Login '
				}

			})
			return;
		}
		// attach token to res
		const decodedToken = await Jwt.verify(token[1], config.secret);
		res.locals.user = decodedToken;
		// ensure userId is attached to res.locals if not.
		await confirmUserId(res);
		return next();
	} catch (error) {
		res.render('error', {
			message: 'Unauthorized action',
			error: {
				status: 401,
				stack: 'Session expiered \n Please Login '
			}
		})
		return next(error);
	}
};

module.exports = baseAuthenticator