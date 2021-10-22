var express = require('express');
var router = express.Router();


router.get('/:query', function(req, res, next) {

    res.status(200).send({error: false, res: "Recieved query: " + req.params.query });
});

module.exports = router;