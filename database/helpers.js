const axios = require('axios');
const fs = require('fs');
const config = require('../config.js');

const auth = {headers: {Authorization: `${config.Bearer}`}};

const getAlbums = (json) => {
  var ids = [];
  json.items.forEach(item => {
    ids.push(item.id);
  })
  console.log(ids);
};

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
