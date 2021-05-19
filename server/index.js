const express = require('express');
const path = require('path');
const axios = require('axios');
const db = require('../database/index.js');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/tracks', (req, res) => {
  db.findAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.post('/favorites', (req, res) => {
  db.addFavorite(req.query.email, req.body, (err, data) => {
    if (err) {
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
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});