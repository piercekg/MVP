import axios from 'axios';
import Auth from '../auth.js';

const server = 'http://localhost:3001'

const login = `${Auth.authEndpoint}?client_id=${Auth.clientId}&response_type=token&redirect_uri=${Auth.redirectUri}&scope=${Auth.scopes.join("%20")}&state=${Auth.state}`;

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

export {
  login,
  getUser,
  getTracks,
  addFavorite,
  getFavorites,
  deleteFavorite
}