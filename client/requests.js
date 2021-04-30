import axios from 'axios';

const server = 'http://localhost:3001'

const login = (callback) => {
  axios.get(`${server}/login`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log(err);
  })
};

const getUser = (token, callback) => {
  axios.get(`https://api.spotify.com/v1/me`, {headers: {Authorization: `Bearer ${token}`}})
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log(err);
  })
};

const getTracks = (callback) => {
  axios.get(`${server}/tracks`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log(err);
  })
};

const addFavorite = (email, track, callback) => {
  axios.post(`${server}/favorites?email=${email}`, track)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    callback(err);
  })
};

const getFavorites = (email, callback) => {
  axios.get(`${server}/favorites?email=${email}`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    callback(err);
  })
};

const deleteFavorite = (email, track, callback) => {
  axios.delete(`${server}/favorites?email=${email}&_id=${track._id}`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    callback(err);
  })
};

const search = (params, callback) => {
  axios.get(`${server}/search?q=${params.query}&type=${params.type}`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log(err);
  })
};

const trackInfo = (id, callback) => {
  axios.get(`${server}/tracks/${id}`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log(err);
  })
};

export {
  getUser,
  login,
  search,
  trackInfo,
  getTracks,
  addFavorite,
  getFavorites,
  deleteFavorite
}