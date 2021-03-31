import React from 'react';

const CurrentTrack = ({ track }) => (
  <div>
    <h3>You are currently listening to:</h3>
    <h2>{track.name}</h2>
  </div>
);

export default CurrentTrack;