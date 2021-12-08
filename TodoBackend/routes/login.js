const express = require('express');
const router = express.Router();
const signup = require('../Model/signup');
const password = require('../utils/password')
const jwt = require('../utils/jwt')

router.post('/login', async (req,res)=>{
  await signup.findOne({email:req.body.email})
  .then(async (user)=>{
    if(user){
      const check = await password.passwordCompare(req.body.password, user.password);
      if(check == true){
        if(user.isVerified === true){
          const token = await jwt.createJwt(req);
          let obj = {
            'autherization': true,
            'token': token,
            'user':user,                    
    }
    res.status(201).json({ success: true, obj})
        }else{
          res.status(500).json({ success: false, message: 'Please verify your account!!' })
          }
      }     else {
        res.status(400).json({ success: false, message: 'please check your password!!' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Enter the correct email Address !!' })
  }
  });
});


router.get('verifyToken', jwt.verifyJwt, async (req, res, next) => {
  res.status(200).json({ 'success': true, 'authorization': true })
})

module.exports = router;
