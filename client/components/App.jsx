import React from 'react';
import Search from './Search';
import TrackData from './TrackData';
import { search, trackInfo } from '../requests';
import player from '../player.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      info: null
    };
  this.handleSearch = this.handleSearch.bind(this);
  this.handleClick = this.handleClick.bind(this);
  }


  handleSearch (params) {
    search(params, (data) => {
      console.log(data.data);
      this.setState({
        results: data.data.tracks.items[0]
      });
    })
  }

  handleClick (id) {
    trackInfo(id, (data) => {
      console.log(data.data);
    });
  }

  render() {
    player();
    return (
      <div>
        <Search handleSearch={this.handleSearch} />
        {this.state.results ? (<TrackData data={this.state.results} handleClick={this.handleClick} />) : null}
      </div>
    );
  }
}

export default App;
