require('dotenv').config();
var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
    if(err) console.log(err.stack);

    else{
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
})