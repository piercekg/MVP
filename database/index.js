const mongoose = require('mongoose');
const helpers = require('./helpers.js');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/Stevie', { useNewUrlParser: true });

let TrackSchema = mongoose.Schema({
  "id": String,
  "name": String,
  "uri": String
});

let Track = mongoose.model('Track', TrackSchema);

let findAll = (callback) => {
  Track.find({})
  .then(results => {
    callback(null, results);
  })
  .catch(err => {
    console.log(err, null);
  })
}

let createOne = (track) => {
  return Track.findOne({id: track.id})
  .then(result => {
    if (!result) {
      return Track.create(track);
    } else {
      return 'Duplicate entry: ' + track.name;
    }
  })
  .catch(err => {
    return 'Create error ' + err;
  })
};

let createMany = (tracks) => {
  console.log(data)
  return Promise.all(tracks.map(createOne))
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.log(err);
  })
};

module.exports = {
  findAll
}