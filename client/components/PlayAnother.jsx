import React from 'react';

const PlayAnother = ({ newTrack }) => (
  <div>
    <h3>Want another random track from Stevie?</h3>
    <button onClick={() => newTrack()}>Play Another!</button>
  </div>
);

export default PlayAnother;

/*
<button onClick={() => location.reload()}>Play Another!</button>
*/