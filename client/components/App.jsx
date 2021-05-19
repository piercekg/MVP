import React from 'react';
import CurrentTrack from './CurrentTrack';
import Stevie from './Stevie';
import Favorites from './Favorites';
import exampleData from '../data.js';
import { login, getUser, getTracks } from '../requests';
import player from '../player.js';

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: exampleData,
      currentTrack: exampleData[21],
      token: false,
      user: false
    };
  this.newTrack = this.newTrack.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      getUser(_token, (data) => {
        this.setState({
          user: data.data
        });
      })
    }
    this.newTrack();
    getTracks(data => {
      this.setState({
        tracks: data.data
      });
    })
  }

  newTrack () {
    let index = Math.floor(Math.random() * this.state.tracks.length);
    let track = this.state.tracks[index];
    this.setState({
      currentTrack: track
    });
  }

  render() {

    let track = this.state.currentTrack;

    if (this.state.token) {
      player(track.uri, this.state.token);
    }

    return (
      <div>
        <h1>Welcome to the Daily Stevie Player!</h1>
        <h3>The Random Song Player for Your Daily Stevie Nicks Fix</h3>
        {!this.state.token ? <a className='btn' href={login}><strong>Login with Spotify to Start Listening!</strong></a> : null}
        {this.state.token ? <CurrentTrack track={track} /> : null}
        <Stevie />
        {this.state.token ? <React.Fragment>
          <Favorites track={track} user={this.state.user} />
          <h3>Want another random track from Stevie?</h3>
          <a className='btn' href={login}><strong>Play Another!</strong></a>
        </React.Fragment> : null}
      </div>
    );
  }
}

export default App;
