const crypto = require('crypto');
const User = require('../Model/signup');
const Token = require('../Model/Token');
const Bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const password = require('../utils/password');


router.post('/reset', async (req, res) => {
  // console.log("Req is here::"+JSON.stringify(req));
  console.log("email is here::" + req.body.email);
  if (!req.body.email) {
    return res.status(500).json({ message: 'please insert the email' });
  }
  let user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    console.log("It should come here");
    return res.status(400).json({ message: 'Email does not exist' });
  }

  var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

  token.save(function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }
    Token.findOne({ _userId: user._id, token: { $ne: token.token } }).remove().exec();
    res.status(200).json({ message: 'Reset Password successfully sent to' + req.body.email });
  });
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: 'todoverify@gmail.com', pass: 'Welc0me@123' },
    tls: { rejectUnauthorized: false }
  })

  var mailOptions = {
    to: user.email,
    from: 'todoverify@gmail.com',
    subject: 'TODO Reset Password',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://localhost:4200/reset/' + token.token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (!err) {
      console.log("Forgot Password send successfully");
    } else {
      console.log("error------")
    }
  })
});

router.post('/valid-token', async (req, res) => {
  console.log('token data is here new :::', req.body.token);
  if (!req.body) {
    return res.status(500).json({ message: 'Token is not Exist' });
  }
  var token = await Token.findOne({
    token: req.body.token
  });
  if (token == '') {
    return res.status(409).json({ message: 'Please check the URL!!' });
  }
  User.findOneAndUpdate({ id: token._userId.toString() }).then(() => {

    res.status(200).json({ message: 'Please change your password' });
  }).catch((err) => {
    return res.status(500).send({ msg: err.message });
  });
});


router.post('/new-password', async (req, res) => {
  console.log(JSON.stringify(req.body))
  Token.findOne({ token: req.body.token }, function (err, userToken) {
    if (!userToken) {
      return res.status(409).json({ message: 'Token has expired!!try later' });
    }

    User.findOne({
      _id: userToken._userId
    }, function (err, userEmail) {
      if (!userEmail) {
        return res.status(409).json({ message: 'User does not exist' });
      }
      return Bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(400).json({ message: 'Error hashing password' });
        }
        userEmail.password = hash;
        userEmail.save(function (err) {
          if (err) {
            return res
              .status(400)
              .json({ message: 'Password can not reset.' });
          } else {
            userToken.remove();
            return res.status(201).json({ message: 'Password reseted Successfully' });
          }
        });
      });
    });
  })
});

module.exports = router;