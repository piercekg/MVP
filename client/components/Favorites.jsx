import React from 'react';
import FavoriteList from './FavoriteList';
import { addFavorite, getFavorites, deleteFavorite } from '../requests';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      track: null,
      favorites: {favorites: []},
      button: true
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (this.props.user.email !== prevProps.user.email) {
      getFavorites(this.props.user.email, (data) => {
        if (!data.data) {
          this.setState({
            email: this.props.user.email,
            track: this.props.track
          });
        } else {
          this.setState({
            email: this.props.user.email,
            track: this.props.track,
            favorites: data.data
          });
        }
      });
    }
  }

  handleSubmit (track) {
    if (track.id) {
      addFavorite(this.state.email, track, (data) => {
        this.setState({
          favorites: data.data,
          button: false
        });
      });
    } else {
      getFavorites(this.state.email, (data) => {
        this.setState({
          favorites: data.data
        });
      });
    }
  }

  handleDelete (track) {
    deleteFavorite(this.state.email, track, (data) => {
      getFavorites(this.state.email, (data) => {
        this.setState({
          favorites: data.data,
          list: true
        });
      });
    });
  }

  render () {
    return (
      <div>
        <h3>Love the current track?</h3>
        {<button className='btn' onClick={() => {
          this.handleSubmit(this.state.track);
        }}><strong>Add to My Favorites!</strong></button>}
        {this.state.favorites.favorites.length ? <FavoriteList favorites={this.state.favorites} handleDelete={this.handleDelete} /> : null}
      </div>
    );
  }
}

export default Favorites;
