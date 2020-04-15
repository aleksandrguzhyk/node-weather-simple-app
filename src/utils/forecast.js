const request = require('request')

const forecast = (latitude, longtitude, callback) => {

  const url = 'https://api.darksky.net/forecast/18f5757a1aa7928c0c57e545ecffd92f/' + latitude + ',' + longtitude

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (body.error) {
      callback('Unable to find location. Try another search!');
    } else {
      callback(body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '.  There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast

// const coordinates = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWxleGd1emgiLCJhIjoiY2s3dzJndGtwMDk3cjNtcXluN3kzamZoaSJ9.VI0dwYJ3FAvsBYfe9LeZ7w&limit=1'
// request({ url: coordinates, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather services!');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location. Try another search!');
//   } else {
//     const lat = response.body.features[0].center[1]
//     const long = response.body.features[0].center[0]
//     // console.log(lat, '<== lat')
//     // console.log(long, '<== long')
//     const url = `https://api.darksky.net/forecast/18f5757a1aa7928c0c57e545ecffd92f/${lat},${long}`
//     request({ url: url, json: true }, (error, response) => {
//       if (error) {
//         console.log('Unable to connect to location services!'); 
//       } else if (response.body.error) {
//         console.log('Unable to find location'); 
//     } else {
//         const data = response.body.currently
//         console.log(data)
//     }
//     })
//   }
// })