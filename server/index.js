const express = require('express');
const path = require('path');
const axios = require('axios');
const db = require('../database/index.js');
const config = require('../config.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "http://18.217.19.253");
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const api = 'https://api.spotify.com/v1';
const auth = {headers: {Authorization: `${config.Bearer}`}};

const youtube = 'https://www.googleapis.com/youtube/v3';
const youtubeauth = config.key;

app.get('/login', (req, res) => {
  axios.get(`https://accounts.spotify.com/authorize?client_id=88e83947e4fb497e9c85307e40abab6c&response_type=code&redirect_uri=https%3A%2F%2Flocalhost:3001%2Fcallback&scope=streaming%20user-read-private%20user-read-email&state=34fFs29kd09`)
  .then(data => {
    console.log(data.data);
    //console.log(data.request.res.responseUrl);
    //res.redirect(data.request.res._redirectable._currentUrl);
    res.status(200).send(data.data);
  })
  .catch(err => {
    //console.log(err);
    res.status(500).send(err);
  })
})

app.get('/.well-known/pki-validation/48704D92AE783779235727A3F7E7641E.txt', (req, res) => {
  res.sendFile('/home/kevin/HackReactor/SEI/MVP/server/48704D92AE783779235727A3F7E7641E.txt');
});

app.get('/tracks', (req, res) => {
  db.findAll((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.post('/favorites', (req, res) => {
  db.addFavorite(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  })
});

app.get('/favorites', (req, res) => {
  db.getFavorites(req.query.email, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.delete('/favorites', (req, res) => {
  db.deleteFavorite(req.query, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

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