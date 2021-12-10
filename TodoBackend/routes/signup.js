var  crypto = require('crypto');
var User = require('../Model/signup');
var Token = require('../Model/Token');
const Bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const password = require('../utils/password');
const objectId = require("objectid");

router.post('/register', function(req, res, next) {
    User.findOne({ email: req.body.email}, function (err, user) {
      // error occur
      if(err){
          return res.status(500).json({msg: err.message});
      }
      // if email is exist into database i.e. email is associated with another user.
      else if (user) {
          return res.status(400).json({message:'This email address is already associated with another account.'});          
      }
      else{
      
        req.body.password = password.passwordHash(req.body.password);
        user = new User(req.body);
 
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        console.log("saving the token");
        token.save(function (err) {
       
          if(err){
          console.log("saving the token error"+err);
            return res.status(500).json({message:err.message});
          }
          console.log("saving the token error"+err);
          console.log(user.email+""+token.token);
         
            // Send email (use credintials of SendGrid)
            var transporter = nodemailer.createTransport({ 
                                         host: "smtp.gmail.com",                            
                                         port: 587,
                                         secure: false,
                                         auth: { user:'todoverify@gmail.com', pass:'Welc0me@123' },
                                         tls: {rejectUnauthorized: false}
                                        });
                                         console.log("Inside email");
            var mailOptions = {from: 'todoverify@gmail.com', to: user.email, subject: 'TODO User Activation',
            html:`<h1>Hello ${req.body.username}</h1>,<br>`
            +'<p style="font-size:16px;color:red;">Please click on the following link, or paste this into your browser to complete the process</p>'+'\n'
            +'<a style="border-radius:10px 10px 10px;margin-left:300px;margin-top:2px;font-size:18px;text-align:center;text-decoration:none;display:inline-block; background-color: #1c87c9;border:none;padding: 5px;padding-left:20px;padding-right:20px;text-align:center;color: white;" href=http://localhost:4200/confirm/'+user.email+ '/' + token.token +'>'+"Click here for Activation" +"</a>" +
            '<br>'+'<p style="font-size:16px;color:green">If you did not request this, please ignore this email and your email will remain AnActive</p></div><body>'
           };
            // console.log("after mailOptions email"+mailOptions);
            
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                  console.log("Emails sending function enter email");
                    return res.status(500).json({message:'Technical Issue!, Please click on resend for verify your Email.'});
                 }
                 console.log("Email Sent Successfully");
                return res.status(200).json({success: true, message:'A verification email has been sent to ' + user.email + '. It will be expire after one day.'});
            });
        });

     
        
          user.save((err,user) =>{
              if (err) { 
                console.log("error in saving"+err);
                return res.status(500).json({message:err.message});
              }
          });
    }
    });
  }     
);
router.get("/get/register",(req,res)=>{
  try{
    let result = User.find()
    res.status(201).json({ success: true, list: response });
  } catch (err) {
    res.status(501).json({ success: false, message: err });
  }
  
});

module.exports = router;
