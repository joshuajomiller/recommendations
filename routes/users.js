let express = require('express');
let router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.send('Get all users')
    })
    .post(function (req, res) {
        res.send('Create user: ' + JSON.stringify(req.body));
    });

module.exports = router;
