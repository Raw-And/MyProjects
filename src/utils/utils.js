const request = require("request");

const geoCoding = (address, callback) => {
  const geoCoding =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmF3YW5kLXJlYndhciIsImEiOiJja2RycjdwcjIxZ3I1MndtcTg0N2d1enJuIn0.D-wPNrMRodkz_E7b5piu9w";
  request({ url: geoCoding, json: true }, (error, response) => {
    if (error) {
      callback("Enternet Connetction Have an problem...");
    } else if (response.body.features.length === 0) {
      callback("Location Cant Find please try Another Search...");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longtude: response.body.features[0].center[1],
        place: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCoding;
