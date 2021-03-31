import React from 'react';

const FavoriteItem = ({ item, handleDelete }) => (
  <div>
    {item.name}
    {item.name ? <button onClick={() => {
      handleDelete(item);
    }}>❌</button> : null}
  </div>
);

export default FavoriteItem;