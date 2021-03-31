import React from 'react';
import FavoriteItem from './FavoriteItem';

const FavoriteList = ({ favorites }) => (
  <div>
    {favorites.map(item => {
      return (<FavoriteItem item={item} />)
    })}
  </div>
);

export default FavoriteList;