/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, res, body) => {
    if (err) return callback(err, null);
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, cb) {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
    if (err) return cb(err, null);
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    const coords = { latitude : JSON.parse(body).latitude, longitude : JSON.parse(body).longitude };
    cb(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, cb) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
    if (err) return cb(err, null);
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    cb(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(cb) {
  fetchMyIP((err, ip) => {
    if (err) {
      return cb(err,null);
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return cb(err,null);
      }
      fetchISSFlyOverTimes(coords, (err, time) => {
        if (err) {
          return cb(err,null);
        }
        cb(null, time);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
