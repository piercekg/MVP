const axios = require('axios');
const fs = require('fs');
const config = require('../config.js');
//const tracks = require('./top_tracks.js');
//const albums = require('./albums.js');

const auth = {headers: {Authorization: `${config.Bearer}`}};

const getAlbums = (json) => {
  var ids = [];
  json.items.forEach(item => {
    ids.push(item.id);
  })
  console.log(ids);
};
//getAlbums(albums.albums);

const getTracks = (album) => {
  axios.get(`https://api.spotify.com/v1/albums/${album}/tracks`, auth)
  .then(data => {
    return data.data;
  })
  .catch(err => {
    console.log(err);
  })
}

const getAllTracks = (albums) => {
  return Promise.all(albums.map(getTracks))
  .then(results => {
    console.log(results);
    var tracks = JSON.stringify(results);
    return fs.writeFile('/home/kevin/HackReactor/SEI/MVP/database/tracks.js', tracks, (err, result) => {
      if (err) {
        console.log(err, null);
      } else {
        console.log(null, result);
      }
    })
  })
  .catch(err => {
    console.log(err);
  })
}
/*
getAllTracks([
  '3oEZxhPyEGGYvMVBz9yB8o', '0yEXS3YwXa6SpausVCJPLJ', '6RXy2mL8HlVhzHU0JOO9dq', '55apJ336pzYBjmG7uwal5K', '3S404OgKoVQSJ3xXrDVlp8', '0zuIUmEvxMf8tIYZ5wxJHI', '7jCfopf1GmfBfYJh63aW7R', '04kchEXrG1dEHCdZzwWVxR', '1mJFn6QQYSHfArKZzvrNvj', '2RQoz318vUnEVhyiMxAAf1', '6OYYHeLOJz1P3YLIZna1pu', '77Q6ef8LmG5pCA34yyRjOg', '6zfkiTCfpCeQCokEMlpudS', '6dGensB7xkORUYpd8bvd6H', '520iW3fXcWW5mbQToP0hs0', '0guJSEAsHAQ1gXPC18u7hc', '29RVdfPWTEu6atVycxx86s', '0IomjU2bXFng4LQBYn7Het', '7Lx1rMMZesU7oswEwP2MQX', '1j5C8IBaHxxzUmUPWHZ4Oc', '4SWigTzGL3FSVDUGvtOpJk', '2o90fgeg8x1NNc6TxhduLq', '2eD1wf00SdwKhg2qj8WjVc', '1Qggw3H0GxlDoMyyokYZG7', '28gbwmXc5PyGRgxLLEFEtL', '7dx70cNq4BALotlSMb18sI', '3acx6uj3jMDJtAKsXqGj12', '0RTPdWAdXvP9Srpki3BLZJ', '6VkX6vgRiIBjRBh7DTzVwp', '0Y0RCbLQ49m6o6bxp3uSXo'
]);
*/


const formatDocument = (json) => {
  var tracks = [];
  json.items.forEach(item => {
    console.log(item.name);
    trackObj = {
      id: item.id,
      name: item.name,
      uri: item.uri
    };
    tracks.push(trackObj);
  })
  console.log(tracks);
  return tracks;
};

//formatDocument(tracks.topTracks);