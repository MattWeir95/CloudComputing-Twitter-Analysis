var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const AWS = require('aws-sdk');

const bucketName = "n10509020-cloud-2-assessment";

const SERVER_PORT = 3000;
const API_URL = `http://localhost:${SERVER_PORT}/`;
const REDIS_PORT = 3836
const REDIS_URL = `http://localhost:${REDIS_PORT}/`;


// router.get('/:query', function(req, res, next) {
//     var socket = io();
//     var c_idx = 0;
//     fetch(API_URL + req.params.query)
//     .then((ret) => ret.json())
//     .then((ret) => {
//         c_idx = ret['idx'];
//     })
//     .catch((e) => {
//         console.log(e);
//     })

//     // while(!res.writableFinished) {
//     //     res.write("Testing...");

//     // }
//     res.status(200).send({error: false, res: "Recieved query: " + req.params.query });
// });

router.get('/users', function (req, res, next) {

    const params = { Bucket: bucketName }
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