import axios from 'axios';

const server = 'http://localhost:3001'

const getTracks = (callback) => {
  axios.get(`${server}/tracks`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    console.log(err);
  })
};

const addFavorite = (favObj, callback) => {
  axios.post(`${server}/favorites`, favObj)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    callback(err);
  })
};

const getFavorites = (emailObj, callback) => {
  axios.get(`${server}/favorites?email=${emailObj.email}`)
  .then(data => {
    callback(data);
  })
  .catch(err => {
    callback(err);
  })
};

const deleteFavorite = (favObj, callback) => {
  axios.delete(`${server}/favorites?email=${favObj.email}&_id=${favObj._id}`)
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
  search,
  trackInfo,
  getTracks,
  addFavorite,
  getFavorites,
  deleteFavorite
}