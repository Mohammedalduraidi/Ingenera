const { users } = require('../../../Database')
const { hash } = require('bcryptjs');
module.exports = resetPass = (req, res) => {
    const { token, email, newPass } = req.body;
    users.findOne({
        email
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if (Date.now() <= parseInt(data.resetPasswordExpires) && token === data.resetPasswordToken) {

            hash(newPass, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                users.findOneAndUpdate({ email }, {
                    $set: {
                        password: hash
                    }
                }, (err, data) => {

                    if (err) {
                        res.sendStatus(400)
                        console.log(err);
                        return;
                    }
                    res.send({
                        code: 200,
                        message: 'Your password has been changed'
                    })
                    return;
                })
            })
        } else {
            res.send({
                code: 409,
                message: 'Token has expired'
            })

        }
    })
}