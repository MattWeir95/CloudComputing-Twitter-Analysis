var express = require('express');

var Twitter = require('twitter');
var router = express.Router();
const https = require("https");
const dotenv = require('dotenv/config');

const apiKey= process.env.TWITTER_API_KEY;
const apiSecretKey= process.env.TWITTER_API_KEY_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret=process.env.TWITTER_ACCESS_TOKEN_SECRET;
const show_re_tweets = false;

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

router.get("/:query", function (req, res, nex) {
    var userInput = req.params
    // console.log(userInput);
    // console.log(apiKey);
    client.stream('statuses/filter', params,  function(stream) {
        stream.on('data', function(tweet) {
          // res.status(200).send(tweet);
          console.log(tweet);
        });
      
        stream.on('error', function(error) {
          console.log(error);
        });
      });
})

module.exports = router;

