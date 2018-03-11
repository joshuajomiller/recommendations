let MeaningCloud = require('meaning-cloud');

class MeaningCloudModel{

  constructor() {
    this.meaning = MeaningCloud({
      key: 'b3ff44a413b211d53f6fb1aa7ef2c38a',
      secure: true,
      endpoints: {
        topics_extraction: '/topics-2.0',
        text_classification: '/class-1.1'
      }
    });
  }

  getTopics(textStr){
    return new Promise((resolve, reject) => {
      this.meaning.topics_extraction({
        lang: 'en',
        txt: textStr,
        tt: 'eco'
      }).then(function (res) {
        let topTopics = JSON.parse(res.body).entity_list;
        topTopics = topTopics.sort(function(a,b){
          return b.relevance - a.relevance;
        });
        resolve(topTopics);
      }).catch(function(error){
        reject(error);
      });
    });
  }

  getClassification(textStr){
    return new Promise((resolve, reject) => {
      this.meaning.text_classification({
        txt: textStr,
        model: 'IAB_en'
      }).then(function (res) {
        let topClasses = JSON.parse(res.body).category_list;
        topClasses = topClasses.sort(function(a,b){
          return b.relevance - a.relevance;
        });
        resolve(topClasses);
      }).catch(function(error){
        console.log(JSON.stringify(error));
        reject(error);
      });
    });
  }

}

module.exports = MeaningCloudModel;
