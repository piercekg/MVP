const mongoose = require('mongoose');
const helpers = require('./helpers.js');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/Stevie', { useNewUrlParser: true });

let FavoriteSchema = mongoose.Schema({
  "email": { type: String, index: true },
  "favorites": [{
    "id": String,
    "name": String,
    "uri": String
  }]
});

let Favorite = mongoose.model('Favorites', FavoriteSchema);

let addFavorite = (email, track, callback) => {
  var fave = {
    id: track.id,
    name: track.name,
    uri: track.uri
  };
  //console.log(email, fave);
  Favorite.findOne({ email: email })
  .then(result => {
    if (!result) {
      Favorite.create({email: email, favorites: [fave]})
      .then(result => {
        callback(null, result);
      })
    } else if (result.favorites.some(song => song.id === fave.id)) {
      callback(null, result);
    } else {
      result.favorites.push(fave);
      result.save()
      .then(result => {
        Favorite.findOne({ email: email })
        .then(result => {
          callback(null, result);
        })
      })
    }
  })
  .catch(err => {
    callback(err, null);
  })
};

let getFavorites = (email, callback) => {
  Favorite.findOne({ email: email })
  .then(result => {
    callback(null, result);
  })
  .catch(err => {
    callback(err, null);
  })
};

let deleteFavorite = (favObj, callback) => {
  Favorite.findOne({ email: favObj.email })
  .then(result => {
    result.favorites.pull({ _id: favObj._id })
    result.save()
    .then(result => {
      callback(null, result);
    })
  })
  .catch(err => {
    callback(err, null);
  })
}

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
  findAll,
  addFavorite,
  getFavorites,
  deleteFavorite
}