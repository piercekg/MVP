import React from 'react';
import Form from './Form';
import FavoriteList from './FavoriteList';
import { addFavorite, getFavorites, deleteFavorite } from '../requests';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      track: null,
      favorites: {favorites: []},
      //form: false,
      //list: false,
      //add: false,
      button: true
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  //this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (this.props.user.email !== prevProps.user.email) {
      getFavorites(this.props.user.email, (data) => {
        this.setState({
          email: this.props.user.email,
          track: this.props.track,
          favorites: data.data,
          list: true
        });
      });
    }
  }

  handleSubmit (track) {
    /*this.setState({
      email: favObj.email,
      form: false
    });*/
    if (track.id) {
      addFavorite(this.state.email, track, (data) => {
        this.setState({
          favorites: data.data,
          //list: true,
          button: false
        });
      });
    } else {
      getFavorites(this.state.email, (data) => {
        this.setState({
          favorites: data.data
          //list: true
        });
      });
    }
  }

  handleDelete (track) {
    //favObj.email = this.state.email;
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
    //console.log(this.state.favorites);
    return (
      <div>
        <h3>Love the current track?</h3>
        {<button className='btn' onClick={() => {
          //if (this.state.email) {
            //var track = this.props.track;
            //track.email = this.state.email;
            this.handleSubmit(this.state.track);
          //} else {
            //this.setState({
              //form: true,
              //add: true
            //});
          //}
        }}><strong>Add to My Favorites!</strong></button>}
        {this.state.favorites.favorites.length ? <FavoriteList favorites={this.state.favorites} handleDelete={this.handleDelete} /> : null}
      </div>
    );
  }
}

export default Favorites;

/*
{this.state.form ? <Form track={this.props.track} user={this.state.email} add={this.state.add} handleSubmit={this.handleSubmit} handleClick={this.handleClick} /> : null}

{!this.state.list ? <React.Fragment><h3>Returning user?</h3><button className='btn' onClick={() => {
          this.setState({
            form: true,
            add: false
          });
        }}><strong>View My Favorite Tracks!</strong></button></React.Fragment> : null}

  handleClick () {
    this.setState({
      form: false
    });
  }
*/