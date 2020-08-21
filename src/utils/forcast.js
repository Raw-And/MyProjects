const request = require("request");

const forcasting = (latitude, longtude, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    Number(latitude) +
    "&lon=" +
    Number(longtude) +
    "&appid=e038a074b66e62e21e30b2e26057ca11&units=metric";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Bad Internet Connection");
    } else {
      const data = JSON.stringify(response);
      callback(undefined, data);
    }
  });
};

module.exports = forcasting;
