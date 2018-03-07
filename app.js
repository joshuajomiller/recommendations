let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');

dotenv.load({ path: '.env.example' });
const passportConfig = require('./controllers/passport');

let index = require('./routes/index');
let questions = require('./routes/questions');
let answers = require('./routes/answers');
let users = require('./routes/users');
let auth = require('./routes/auth');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(passport.initialize());

app.use('/', index);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/users', users);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: err
  });
});

module.exports = app;
