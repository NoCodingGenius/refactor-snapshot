const express = require('express');

const pgp = require('pg-promise')();

const router = require('./routes')

const server = express();
const port = process.env.PORT || 3000;
const auth = require('./routes/auth');
const { connectionString } = require('./models/db/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.use(express.static('public'));

server.use(session({
  store: new pgSession({
    conString: connectionString,
  }),
  secret: 'catrunlongtimeamirite',
  resave: true,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(router)

server.listen(3000, (err) => {
  console.log(`Started ze server on port ${port}.`);
});
