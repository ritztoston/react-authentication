const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;
const User = require('../models/User');

function tokenForUser(res, user) {
  const timestamp = new Date().getTime();
  // return jwt.encode({sub: user.id, iat: timestamp}, secret);
  // JWT Payload
  const payload = {
    sub: user.id,
    iat: timestamp
  };

  // Sign Token
  jwt.sign(
     payload,
     secret,
     {expiresIn: 3600},
     (err, token) => {
       res.json({
         success: true,
         token: 'Bearer ' + token
       });
     });
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
     .then(exist => {
       if(exist){
         return res.status(400).json({error: 'Email is used'});
       }

       const user = new User({
         email: email,
         password: password
       });

       user.save()
          .then(user => tokenForUser(res, user))
          .catch(err => res.status(400).json(err))
     })
};