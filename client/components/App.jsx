import React from 'react';
//import Search from './Search';
//import TrackData from './TrackData';
import CurrentTrack from './CurrentTrack';
import PlayAnother from './PlayAnother';
import Stevie from './Stevie';
import Favorites from './Favorites';
import exampleData from '../data.js';
import { login, search, trackInfo, getTracks } from '../requests';
import player from '../player.js';
import Auth from '../../auth.js';

// Get the hash of the url
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
      token: false
    };
  this.newTrack = this.newTrack.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
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
    //let index = Math.floor(Math.random() * this.state.tracks.length);
    //let track = this.state.tracks[index];
    let track = this.state.currentTrack;
    //console.log(track);

    if (this.state.token) {
      player(track.uri, this.state.token);
    }

    return (
      <div>
        <h2>Welcome to the Daily Stevie Player!</h2>
        {!this.state.token ? <a className='btn' href={`${Auth.authEndpoint}?client_id=${Auth.clientId}&response_type=token&redirect_uri=${Auth.redirectUri}&scope=${Auth.scopes.join("%20")}&state=${Auth.state}`}><strong>Login to Spotify to Listen</strong></a> : null}
        {this.state.token ? <CurrentTrack track={track} /> : null}
        <Stevie />
        {this.state.token ? <React.Fragment>
          <Favorites track={track} />
          <h3>Want another random track from Stevie?</h3>
          <a className='btn' href={`${Auth.authEndpoint}?client_id=${Auth.clientId}&response_type=token&redirect_uri=${Auth.redirectUri}&scope=${Auth.scopes.join("%20")}&state=${Auth.state}`}><strong>Play Another!</strong></a>
        </React.Fragment> : null}
      </div>
    );
  }
}

export default App;

/*
<PlayAnother newTrack={this.newTrack}/>
*/

/*
  trackPicker(tracks) {
    let index = Math.floor(Math.random() * tracks.length);
    let track = tracks[index];
    return track;
  }
*/
/*
        <Search handleSearch={this.handleSearch} />
        {this.state.results ? (<TrackData data={this.state.results} handleClick={this.handleClick} />) : null}
*/
/*
  this.handleSearch = this.handleSearch.bind(this);
  this.handleClick = this.handleClick.bind(this);

handleSearch(params) {
    search(params, (data) => {
      console.log(data.data);
      this.setState({
        results: data.data.tracks.items[0]
      });
    })
  }

  handleClick(id) {
    trackInfo(id, (data) => {
      console.log(data.data);
    });
  }
*/