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
      add: false
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
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
          list: true
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
        <button onClick={() => {
          this.setState({
            form: true,
            add: true
          });
        }}>Add to My Favorites!</button>
        {this.state.form ? <Form track={this.props.track} add={this.state.add} handleSubmit={this.handleSubmit} /> : null}
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