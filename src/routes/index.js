const express = require('express');

const router = express.Router();

const user = require('./users/user');
const profile = require('./users/profile/profile');
const city = require('./cities/city');
const login = require('./login/login');
const review = require('./review');
const index = require('./index');

router.get('/', (request, response) => {
  response.render('home', { user: '' });
});

router.use('/login', login);
router.use('/auth', console.log);

router.use((request, response, next) => {
  if (request.user) {
    next();
  } else {
    response.redirect('/');
  }
});

router.use('/cities', city);
router.use('/reviews', review);
router.use('/users', user);
router.use('/profile', profile);

module.exports = router;
