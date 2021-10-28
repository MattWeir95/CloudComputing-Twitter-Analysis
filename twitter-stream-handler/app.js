var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Twitter = require('twitter');
const dotenv = require('dotenv/config');
const redis = require('redis');
var cors = require('cors');

const apiKey = process.env.TWITTER_API_KEY;
const apiSecretKey = process.env.TWITTER_API_KEY_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

var indexRouter = require('./routes/index');
const { application } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.locals.users = {};
app.locals.c_idx = 0;

//Create redis client and check for errors
app.locals.redisClient = redis.createClient();
app.locals.redisClient.on('error', (err) => {
  console.log("Error " + err);
});
app.locals.redisClient.flushdb( function (err, success) {
  if (success) { console.log("Successfully flushed Redis"); }
  else { console.log(err); }
})


//Create twitter api client
app.locals.twitterClient = new Twitter({
  consumer_key: apiKey,
  consumer_secret: apiSecretKey,
  access_token_key: accessToken,
  access_token_secret: accessTokenSecret
});

//route router
app.use('/api/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(0, () => {
  console.log(`Live at, http://localhost:${app.get('port')}`)
})

module.exports = app;
