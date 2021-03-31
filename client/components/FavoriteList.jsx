import React from 'react';
import FavoriteItem from './FavoriteItem';

const FavoriteList = ({ favorites, handleDelete }) => (
  <div>
    <h3>My List:</h3>
    {favorites.favorites.map(item => {
      return (<FavoriteItem key={item._id} item={item} handleDelete={handleDelete} />)
    })}
  </div>
);

export default FavoriteList;