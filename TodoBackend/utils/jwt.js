const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const secretKey = process.env.SECRETCODE || 'Todo@123/Mean';

createJwt = async function (req, res, next) {
  const key = await jwt.sign(
    {
      email: req.body.email
    },
    secretKey,
    { expiresIn: '24h' }
  );
  return key;
};

//for the verifying the jwt key
verifyJwt = async function (req, res, next) {
 
  const token = req.headers.authorization;

  return jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
    const error= err; 
    res.status(400).json({ "success":false,error});
    } else {
     
    next();
     
    }
  });
};




module.exports = { createJwt, verifyJwt };
