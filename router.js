const Authentication = require('./controllers/authentication');
const passportServices = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = (app) => {
  // Passport middleware
  app.use(passport.initialize());

// Passport Config
  require('./services/passport.js')(passport);

  app.get('/dash', requireAuth, (req, res) => {
    res.send({hi: 'there'});
  });
  app.post('/signup' , Authentication.signup)
};