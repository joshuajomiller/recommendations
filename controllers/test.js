const MC = require('../models/meaningcloud');

exports.testAPI = function (text) {
  return new Promise(function (resolve, reject) {
    let mc = new MC();
    mc.getClassification(text)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      })
  })
};