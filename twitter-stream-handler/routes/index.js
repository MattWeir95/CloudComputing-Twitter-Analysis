var express = require('express');
var router = express.Router();

function updateStream(req) {
  //New querys are appended to track, seperated by a comma,
  //We can use follow: "comma seperate list of user ids" to filter by user
  var query = [];
  for (var user in req.app.locals.users) {
    query.push(req.app.locals.users[user]);
  }
  console.log(query);
  if (req.app.locals.stream !== undefined) {
    req.app.locals.stream.destroy();
  }
  if (query.length === 0) { return; }
  const params = {
    track: query.join(','),
    language: "en"
  }



  //Get stream of tweets
  req.app.locals.stream = req.app.locals.twitterClient.stream('statuses/filter', params);
  req.app.locals.stream.on('data', function (tweet) {

    //Sterilising tweets to make sure there is a match, about 1/50 tweets were not matching the param anywhere.
    if (check_match(tweet, query)) {
      var redisKey = `tweet:${req.app.locals.c_idx}`;
      req.app.locals.redisClient.setex(
        redisKey,
        3600,
        JSON.stringify({ tweet })
      );
      req.app.locals.c_idx++;
    }


  });

  req.app.locals.stream.on('error', function (error) {
    console.log(error);
  });

}


/* GET home page. */
router.get('/add/:user/:query', function (req, res, next) {
  if (req.app.locals.users[req.params.user] === undefined) {
    req.app.locals.users[req.params.user] = req.params.query.split(',');
  } else {
    req.app.locals.users[req.params.user] = req.params.query.split(',');
  }
  console.log(req.app.locals.users);
  updateStream(req);
  res.send({ idx: req.app.locals.c_idx })
});

router.get('/add/:user/', function (req, res, next) {
  if (req.app.locals.users[req.params.user] !== undefined) {
    req.app.locals.users[req.params.user] = [];
  }
  updateStream(req);
  res.send({ idx: req.app.locals.c_idx })
})

router.get('/remove/:user', function (req, res) {
  if (req.app.locals.users[req.params.user] !== undefined) {
    delete req.app.locals.users[req.params.user];
    updateStream(req);
  }
  res.send("Success");
})

module.exports = router;


function check_match(tweet, query) {
  for (var i = 0; i < query.length; i++) {
    var q = query[0][i].toLowerCase();
  
      if(tweet.text.toLowerCase().includes(q)){
        return true;

      }
    if (tweet.quoted_status) {
      if (tweet.quoted_status.text.toLowerCase().includes(q)) {
        return true;
      }
    }
    if (tweet.retweeted_status) {
      if (tweet.retweeted_status.text.toLowerCase().includes(q)) {
        return true;
      }
      if (tweet.retweeted_status.extended_tweet) {
        if (tweet.retweeted_status.extended_tweet.full_text.toLowerCase().includes(q)) {
          return true;
        }
      }
    }
  }
  return false;
}