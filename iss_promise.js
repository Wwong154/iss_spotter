/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = function(input) {
  const ip = JSON.parse(input).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchISSFlyOverTimes = function(input) {
  const coords = { latitude : JSON.parse(input).latitude, longitude : JSON.parse(input).longitude };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
        const { response } = JSON.parse(data);
        return response;
  });
};

const printPassTimes = function(time) {
  for (const pass of time){
    let date = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`)
  }
  return;
};

module.exports = { nextISSTimesForMyLocation, printPassTimes };
