var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');

const bucketName = "n10509020-cloud-2-assessment";


const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'})
.createBucket({Bucket: bucketName})
.promise();

bucketPromise
.then((data => {
  console.log("Successfully created " + bucketName);
}))
.catch((e) => {
  if(e.message === "The provided token has expired."){
    console.log("Tokens have expired, please update your aws.credentials file.")
  }else{
    console.log(e.message);

  }
})







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
      //Store in cache
      var redisKey = `tweet:${req.app.locals.c_idx}`;
      req.app.locals.redisClient.setex(
        redisKey,
        3600,
        JSON.stringify({ tweet })
      );

      //Store in s3
      Store_In_S3(tweet);
      req.app.locals.c_idx++;
    }


  });

  req.app.locals.stream.on('error', function (error) {
    console.log(error);
  });

}


//Add a user to the stream and their query
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


//Add a user to the stream
router.get('/add/:user/', function (req, res, next) {
  if (req.app.locals.users[req.params.user] !== undefined) {
    req.app.locals.users[req.params.user] = [];
  }
  updateStream(req);
  res.send({ idx: req.app.locals.c_idx })
})

//remove a user from the stream
router.get('/remove/:user', function (req, res) {
  if (req.app.locals.users[req.params.user] !== undefined) {
    delete req.app.locals.users[req.params.user];
    updateStream(req);
  }
  res.send("Success");
})

module.exports = router;


//Check a tweet matches the query
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


function Store_In_S3(tweet){

  const modified_tweet = {
    name: tweet.user.screen_name,
    tweet: tweet.text,
    picture: tweet.user.profile_image_url,
    sentiment: null,
  
  }
  const body = JSON.stringify({
    modified_tweet
  });
  const objectParams = {
    Bucket: bucketName,
    Key: `user-${tweet.user.id}`,
    Body: body,
  };
  const uploadPromise = new AWS.S3({ apiVersion: "2006-03-01" })
    .putObject(objectParams)
    .promise();
 
}