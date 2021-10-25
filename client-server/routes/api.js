var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const SERVER_PORT = 3000;
const API_URL = `http://localhost:${SERVER_PORT}/`;
const REDIS_PORT = 3836
const REDIS_URL = `http://localhost:${REDIS_PORT}/`;

router.get('/:query', function(req, res, next) {
    var socket = io();
    var c_idx = 0;
    fetch(API_URL + req.params.query)
    .then((ret) => ret.json())
    .then((ret) => {
        c_idx = ret['idx'];
    })
    .catch((e) => {
        console.log(e);
    })
    
    // while(!res.writableFinished) {
    //     res.write("Testing...");
        
    // }
    res.status(200).send({error: false, res: "Recieved query: " + req.params.query });
});

module.exports = router;