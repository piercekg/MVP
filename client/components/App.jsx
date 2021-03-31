import React from 'react';
//import Search from './Search';
//import TrackData from './TrackData';
import CurrentTrack from './CurrentTrack';
import PlayAnother from './PlayAnother';
import Stevie from './Stevie';
import Favorites from './Favorites';
import exampleData from '../data.js';
import { search, trackInfo, getTracks } from '../requests';
import player from '../player.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: exampleData,
      currentTrack: exampleData[16]
    };

  }

  componentDidMount() {
    getTracks(data => {
      this.setState({
        tracks: data.data
      });
    })
  }

  render() {
    let index = Math.floor(Math.random() * this.state.tracks.length);
    let track = this.state.tracks[index];

    player(track.uri);

    return (
      <div>
        <h2>Welcome to the Daily Stevie Player!</h2>
        <CurrentTrack track={track} />
        <Stevie />
        <Favorites />
        <PlayAnother />
      </div>
    );
  }
}

export default App;

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