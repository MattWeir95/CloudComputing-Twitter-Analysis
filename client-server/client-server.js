var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var redis = require('redis');
var fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const PORT = 3004;
const SERVER_PORT = 3000;
const API_URL = `http://localhost:${SERVER_PORT}/`;
const REDIS_PORT = 6379
const REDIS_URL = '127.0.0.1';

var redisClient = redis.createClient(REDIS_PORT, REDIS_URL);
redisClient.on('error', (err) => {
  console.log("Error " + err);
});


//Route routers
var apiRouter = require('./routes/api');
app.use('/api/', apiRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//App.use
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/:id', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  redisClient.get(`tweet:${req.params.id}`, (err, tweet) => { res.send(tweet); })
})


var sockets = {};
var c_idx;


io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);
  sockets[socket.id] = socket;
  socket.emit('connection', null);
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
    redisClient.get(key, (err, res) => {
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
      if (tweet.text) {
        for (var id in sockets) {
          socket = sockets[id];

          //Checks if the search term occurs anywhere in the object
          var hashtag_matches_tweet = socket.hashtags.some(hashtag => {
            hashtag = hashtag.toLowerCase();
     
            if(tweet.text.toLowerCase().includes(hashtag)){
              return true;
            }
            if(tweet.quoted_status){
              if(tweet.quoted_status.text.toLowerCase().includes(hashtag)){
                return true;
              }
            }
            if(tweet.retweeted_status){
              if(tweet.retweeted_status.text.toLowerCase().includes(hashtag)){
                return true;
              }
              if(tweet.retweeted_status.extended_tweet){
                if(tweet.retweeted_status.extended_tweet.full_text.toLowerCase().includes(hashtag)){
                  return true;
                }
              }
            }
          })
          
          if (hashtag_matches_tweet) {
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
,10
  //Put timeout here to slowdown feed, i have it off here atm so we dont miss out on any tweets and can see
  //how fast it is, maybe we should slow it down and batch them? or just leave them as it is and pick slower tweets
);

//SENTIMENT LOGIC
var natural = require('natural');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var tokenizer = new natural.WordTokenizer();

app.post("/sentiment",  function (req,res,next) {
  const query = req.body;
  if(query){
    // console.log(query);
    res.status(200).json({sentiment: GetSentimentAnalyisis(req.body.sentimentQuery)});
  }
  
})

function GetSentimentAnalyisis(string){

  var arrayOfStrings = tokenizer.tokenize(string);

  return analyzer.getSentiment(arrayOfStrings);
};


http.listen(PORT, () => {
  console.log(`Live at, http://localhost:${PORT}`)
});


module.exports = app;
