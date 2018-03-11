const MC = require('../apis/meaningcloud');
const GM = require('../apis/googlemaps');

exports.testAPI = function (text) {
  return new Promise(function (resolve, reject) {
    let mc = new MC();
    let gm = new GM();
    let classesPromise = mc.getClassification(text);
    let topicsPromise = mc.getTopics(text);
    let placesPromise = gm.getPlaces(text);

    Promise.all([classesPromise, topicsPromise, placesPromise])
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      })
  })
};