var express = require('express')
var app = express();
var http = require('http').createServer(app);
const PORT = 3004;
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var redis = require('redis');

const SERVER_PORT = 3000;
const API_URL = `http://localhost:${SERVER_PORT}/`;
// not used atm
const REDIS_PORT = 6379
const REDIS_URL = '127.0.0.1';

var redisClient = redis.createClient(REDIS_PORT, REDIS_URL);
redisClient.on('error', (err) => {
  console.log("Error " + err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/:id', (req,res,next) => {
  res.setHeader('Content-Type', 'application/json');
  redisClient.get(`tweet:${req.params.id}`,(err,tweet) => { res.send(tweet); })
})

http.listen(PORT, () => {
  console.log(`Live at, http://localhost:${PORT}`)
});

var sockets = {};
var c_idx;

io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);
  sockets[socket.id] = socket;
  socket.emit('connection',null);
  socket.hashtags = [];
  socket.on('hashtags', new_ht => {
    console.log(new_ht);
    socket.hashtags = new_ht
    fetch(API_URL + "api/add/" + socket.id + "/" + new_ht.join(','))
      .then((ret) => ret.json())
      .then((ret) => {
        if (c_idx === undefined) { c_idx = ret['idx']; }
        console.log(ret['idx']);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  socket.on('disconnect', () => {
    delete sockets[socket.id];
    fetch(API_URL + "api/remove/" + socket.id);
  });

});


async function getKey(key) {
  return new Promise(resolve => {
    redisClient.get(key, (err,res) => {
      resolve(res);
    })
  })
}

setInterval(async () => {
  if (c_idx === undefined) { return; }
  var found_more = true;
  do {
    var socket;
    var key = `tweet:${c_idx}`;
    await getKey(key).then(res => {
      if (res === null) { return false; }
      tweet = JSON.parse(res).tweet;
      if(tweet.text){
        var tweet_text = tweet.text.toLowerCase();
        for (var id in sockets) {
          socket = sockets[id];
          


          //We also need a better way at deciding if a tweet is matched, would be nice if we could completely ignore retweets/replies ect in the stream
          
          //For some reason it is sending the match however the front end isnt catching it, it is also sending the history,
          //however the history is being caught and displayed.
          //If you take them out of the if/else and just socket.emit('match',tweet); it works, something is happening here,
          //that its only allowing or letting one of the emits work at once.
          //FFS
          if (socket.hashtags.some((hashtag) => { hashtag = hashtag.toLowerCase(); return tweet_text.includes(hashtag); })) {
            socket.emit('match', tweet)
          } else {
            socket.emit('history', tweet)

          }
        }
      return true;
      }
      
    }).then(res => {
      if (res) { c_idx++; }
      found_more = res;
    });
  } while (found_more == true);

}
//Put timeout here to slowdown feed, i have it off here atm so we dont miss out on any tweets and can see
//how fast it is, maybe we should slow it down and batch them? or just leave them as it is and pick slower tweets
);



module.exports = app;
