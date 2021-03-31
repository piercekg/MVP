import React from 'react';
import Form from './Form';
import FavoriteList from './FavoriteList';
import { addFavorite, getFavorites, deleteFavorite } from '../requests';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      favorites: null,
      form: false,
      list: false,
      add: false,
      button: true
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(favObj) {
    this.setState({
      email: favObj.email,
      form: false
    });
    if (favObj.id) {
      addFavorite(favObj, (data) => {
        this.setState({
          favorites: data.data,
          list: true,
          button: false
        });
      });
    } else {
      getFavorites(favObj, (data) => {
        this.setState({
          favorites: data.data,
          list: true
        });
      });
    }
  }

  handleClick() {
    this.setState({
      form: false
    });
  }

  handleDelete(favObj) {
    favObj.email = this.state.email;
    deleteFavorite(favObj, (data) => {
      getFavorites(favObj, (data) => {
        this.setState({
          favorites: data.data,
          list: true
        });
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Love the current track?</h3>
        {this.state.button ? <button onClick={() => {
          if (this.state.email) {
            var track = this.props.track;
            track.email = this.state.email;
            this.handleSubmit(track);
          } else {
            this.setState({
              form: true,
              add: true
            });
          }
        }}>Add to My Favorites!</button> : null}
        {this.state.form ? <Form track={this.props.track} user={this.state.email} add={this.state.add} handleSubmit={this.handleSubmit} handleClick={this.handleClick} /> : null}
        {this.state.list ? <FavoriteList favorites={this.state.favorites} handleDelete={this.handleDelete} /> : null}

        {!this.state.list ? <React.Fragment><h3>Returning user?</h3><button onClick={() => {
          this.setState({
            form: true,
            add: false
          });
        }}>View My Favorite Tracks!</button></React.Fragment> : null}
      </div>
    );
  }
}

export default Favorites;