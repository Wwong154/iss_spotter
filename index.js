const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

//fetchMyIP((error, ip) => {
//  if (error) {
//    console.log("It didn't work!" , error);
//    return;
//  }
//  console.log('It worked! Returned IP: ' , ip);
//});
//
//fetchCoordsByIP('99.244.166.243',(error, coords) =>{
//  if (error) {
//    console.log("It didn't work!" , error);
//    return;
//  }
//  console.log('It worked! Coords: ' , coords);
//
//});
//fetchISSFlyOverTimes({latitude: 43.8455, longitude: -79.2635}, (err, time) =>{
//  if (err) {
//    console.log("It didn't work!" , err);
//    return;
//  }
//  console.log('It worked!', time);
//});
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
