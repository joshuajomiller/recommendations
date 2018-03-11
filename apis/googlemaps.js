const googleMaps = require('@google/maps');

class GoogleMapsClient {

  constructor(){
    this.googleMaps = googleMaps.createClient({
      key: process.env.GOOGLE_MAPS_KEY,
      Promise: Promise
    })
  }

  getPlaces(query){
    return new Promise((resolve, reject) => {
      this.googleMaps.places({query: query}).asPromise()
        .then(function (response) {
          let places = response.json.results;
          console.log(places);
          resolve(places);
        })
        .catch(function (error) {
          console.log(error);
          reject(error)
        });
    });
  }

}

module.exports = GoogleMapsClient;