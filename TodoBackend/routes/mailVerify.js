var signup = require('../Model/signup')
var token = require('../Model/Token');
const Bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const password = require('../utils/password');

router.get('/confirm/:email/:token', (req, res)=> {
    console.log("Request come here",req.body.email);

    token.findOne({ token: req.params.token }, function (err, token) {
        console.log('token'+token);
        // token is not found into database i.e. token may have expired 
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user 
        else{
            signup.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).json({msg:'We were unable to find a user for this verification. Please SignUp!'});
                } 
                // user is already verified
                else if (user.isVerified){
                    console.log("Inside User");
                    return res.status(200).json({ success: false, message: 'User has been already verified. Please Login' }); 
                }
                // verify user
                else{
                    // change isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        // error occur
                        if(err){
                            return res.status(500).json({msg: err.message});
                        }
                        // account successfully verified
                        else{
                        return res.status(200).json({ success: true, message: 'Your Account has been verified!! please Login' });  
                        }
                    });
                }
            });
        }
     });
});


module.exports = router;