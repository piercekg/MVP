import React from 'react';

const PlayAnother = ({ playAnother }) => (
  <div>
    <h3>Want another random track from Stevie?</h3>
    <button onClick={() => location.reload()}>Play Another!</button>
  </div>
);

export default PlayAnother;