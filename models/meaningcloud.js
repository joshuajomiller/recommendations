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
        let topTopics = [];
        console.log("mc:");
        res.body = JSON.parse(res.body);
        res.body.entity_list.forEach(function(entity){
          if (entity.form.indexOf("https://") === -1 && entity.form.indexOf("@") === -1){
            topTopics.push(entity)
          }
        });
        let obj = {};
        topTopics.forEach(function(topic){
            obj[topic.form] = topic
        });
        topTopics = [];
        for (let key in obj){
            topTopics.push(obj[key]);
        }
        topTopics = topTopics.sort(function(a,b){
          return b.relevance - a.relevance;
        });
        topTopics = topTopics.slice(0,5);

        console.log(topTopics.map(function(topic){ return topic.form}).join(" | "));
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
        let topClasses = [];
        console.log("mc:");
        console.log(res);
        res.body = JSON.parse(res.body);
        let obj = {};
        res.body.category_list.forEach(function(textClass){
          obj[textClass.form] = textClass
        });
        topClasses = [];
        for (let key in obj){
          if (obj.hasOwnProperty(key)) {
            topClasses.push(obj[key]);
          }
        }
        resolve(topClasses);
      }).catch(function(error){
        console.log(JSON.stringify(error));
        reject(error);
      });
    });
  }

}

module.exports = MeaningCloudModel;
