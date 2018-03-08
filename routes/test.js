let express = require('express');
let router = express.Router();
let test = require('../controllers/test');

router.route('/')
  .post(function (req, res) {
    //res.send(req.body);
    test.testAPI(req.body.text)
      .then(function (data) {
        res.send(data);
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
  });

module.exports = router;