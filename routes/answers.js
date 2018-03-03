let express = require('express');
let router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.send('Get all answers')
    })
    .post(function (req, res) {
        res.send('Add a answer')
    });
router.route('/:id')
    .get(function (req, res) {
        res.send('Get answer ' + req.params.id)
    })
    .put(function (req, res) {
        res.send('Edit answer ' + req.params.id)
    })
    .delete(function (req, res) {
        res.send('Delete answer ' + req.params.id)
    });

module.exports = router;
