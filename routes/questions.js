let express = require('express');
let router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.send('Get all questions')
    })
    .post(function (req, res) {
        res.send('Add a question')
    });
router.route('/:id')
    .get(function (req, res) {
        res.send('Get question ' + req.params.id)
    })
    .put(function (req, res) {
        res.send('Edit question ' + req.params.id)
    })
    .delete(function (req, res) {
        res.send('Delete question ' + req.params.id)
    });

module.exports = router;
