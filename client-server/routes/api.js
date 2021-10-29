var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var cors = require('cors');

const bucketName = "n10509020-cloud-2-assessment";

router.get('/users', cors(), function (req, res, next) {

    const params = { Bucket: bucketName, MaxKeys: 100 }
    var Users = [];

    //Get all objects
    new AWS.S3({ apiVersion: "2006-03-01" }).listObjectsV2(
        params,
        (err, result) => {

            if (result) {

                //iterate over the objects and get their data
                for (var i = 0; i < result.KeyCount; i++) {
                    var promise = new Promise((resolve, reject) => {
                        new AWS.S3({ apiVersion: "2006-03-01" }).getObject(
                            { Bucket: bucketName, Key: result.Contents[i].Key },
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (result) {
                                    var resultJSON = JSON.parse(result.Body);

                                    resolve(Users.push(resultJSON.modified_tweet));


                                }
                            }
                        )
                    })
                }
                promise.then(() => {
                    res.status(200).send({ users: Users });

                })
            }
        }
    )
})



module.exports = router;