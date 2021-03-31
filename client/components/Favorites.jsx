import React from 'react';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

  }

  render() {
    return (
      <div>
        <h3>Love the current track?</h3>
        <button>Add to My Favorites!</button>
        {this.state.clicked ? <FavoriteList favorites={props.favorites} /> : null}
      </div>
    );
  }
}

export default Favorites;