const express = require('express');
const path = require('path');
const axios = require('axios');
const config = require('../config.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

const api = 'https://api.spotify.com/v1';
const auth = {headers: {Authorization: `${config.Bearer}`}};

app.get('/player.js', (req, res) => {
  res.status(200).sendFile('/home/kevin/HackReactor/SEI/MVP/client/player.js');
})

app.get('/search', (req, res) => {
  axios.get(`${api}/search?q=${req.query.q}&type=${req.query.type}&market=US`, auth)
  .then(data => {
    res.status(200).send(data.data);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

app.get('/tracks/:id', (req, res) => {
  axios.get(`${api}/audio-features/${req.params.id}`, auth)
  .then(data => {
    res.status(200).send(data.data);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

let formData = {key: 'grant_type', value: 'client_credentials'};

const encodeForm = (data) => {
  return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
}

app.post('/api/token', (req, res) => {
  console.log(req.body);
  axios.post(`https://accounts.spotify.com/api/token`, encodeForm(formData), {headers: {Authorization: `${config.Basic}`}})
  .then(data => {
    res.status(200).send(data.data);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});