var express = require('express');
var router = express.Router();


router.get('/:query', function(req, res, next) {

    
    res.send("Recieved query: " + req.params.query );
});

module.exports = router;