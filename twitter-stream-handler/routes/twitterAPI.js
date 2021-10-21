var express = require('express');

var Twitter = require('twitter');
var router = express.Router();
const https = require("https");
const dotenv = require('dotenv/config');
const redis = require('redis');

const apiKey= process.env.TWITTER_API_KEY;
const apiSecretKey= process.env.TWITTER_API_KEY_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret=process.env.TWITTER_ACCESS_TOKEN_SECRET;

//Create redis client and check for errors
const redisClient = redis.createClient();
redisClient.on('error', (err) =>  {
    console.log("Error " + err  ); 
});  


//Create twitter api client
var client = new Twitter({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  });


//New querys are appended to track, seperated by a comma,
//We can use follow: "comma seperate list of user ids" to filter by user
  
const params = {
  track: "twitter, ben, thomas",
  language: "en"
}

//Unique value so that keys are unique in the cache
var tweetNumber =1;

router.get("/:query", function (req, res, nex) {
    // var userInput = req.params
    // console.log(userInput);
    // console.log(apiKey);

    //Get stream of tweets
    client.stream('statuses/filter', params,  function(stream) {
        stream.on('data', function(tweet) {
          var redisKey = `tweet:${tweetNumber}`;
          redisClient.setex(
            redisKey,
            3600,
            JSON.stringify({tweet})
          );

          tweetNumber++;
          console.log(tweet);
       
        });
      
        stream.on('error', function(error) {
          console.log(error);
        });
      });
})

module.exports = router;

