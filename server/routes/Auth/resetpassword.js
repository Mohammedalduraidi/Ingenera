const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const { client } = require('../../../Database')


exports.forgetPass = (req, res, next) => {
    const { email } = req.body
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            client.find({
                email
            }, (err, user) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                if (user.length === 0) { // if email does not exist
                    res.send({ code: 404, message: 'Email is worng' });
                    return;
                }
                client.updateOne({ _id: user._id }, {
                    $set: {
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 3600000
                    }
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    done(err, token, data);
                })
            });
        },
        (token, user, done) => {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'mohd.alduraidi@gmail.com',
                    pass: 'backstreet boys'
                }
            });
            var mailOptions = {
                from: 'mohd.alduraidi@gmail.com',
                to: email,
                subject: 'Password Reset',
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

                <html xmlns="http://www.w3.org/1999/xhtml">
                
                <head>
                
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                
                    <title>Forgot Password</title>
                
                    <style>
                
                        body {
                
                            background-color: #FFFFFF; padding: 0; margin: 0;
                
                        }
                
                    </style>
                
                </head>
                
                <body style="background-color: #FFFFFF; padding: 0; margin: 0;">
                
                <table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">
                
                    <tr>
                
                        <td align="center" valign="top">
                
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
                
                                <!-- Logo -->
                
                                <tr>
                
                                    <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-bottom: 10px;">
                
                                       
                
                                    </td>
                
                                </tr>
                
                                <!-- Title -->
                
                                <tr>
                
                                    <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">
                
                                        <span style="font-size: 18px; font-weight: normal;">FORGOT PASSWORD</span>
                
                                    </td>
                
                                </tr>
                
                                <!-- Messages -->
                
                                <tr>
                
                                    <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
                
                                        <span style="font-size: 12px; line-height: 1.5; color: #333333;">
                
                                            We have sent you this email in response to your request to reset your password for   Ingenera. 
                
                                            <br/><br/>
                
                                            To reset your password  , <a href="http://localhost:3000/reset/${token}">please follow this link</a>
                
                                            <br/><br/>
                
                                            We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by updating it from your profile.
                
                                            <br/><br/>
                
                
                                        </span>
                
                                    </td>
                
                                </tr>
                
                            </table>
                
                        </td>
                
                    </tr>
                
                </table>
                
                </body>
                
                </html>`
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log('info', 'An e-mail has been sent to ' + email + ' with further instructions.');
                done(err, 'done');

            });
        }
    ], (err) => {
        if (err) return next(err);
        res.send({ code: 200, message: 'check  email' });
    });

}


exports.resetPass = (req, res) => {
    const { token, id, newPass } = req.body;
    console.log(token, id, newPass);
    client.find({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        if (Date.now() < parseInt(data.resetPasswordExpires) && token === data.resetPasswordToken) {
            bcrypt.hash(newPass, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return;
                }
                client.update({ _id: id }, {
                    $set: {
                        password: hash
                    }
                }, (err, data) => {
                    if (err) {
                        res.sendStatus(400)
                        console.log(err);
                        return;
                    }
                    res.sendStatus(200)
                    return;
                })
            })
        } else {
            res.sendStatus(400)
            return;

        }
    })
}