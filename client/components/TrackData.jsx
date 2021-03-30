import React from 'react';

const TrackData = ({ data, handleClick }) => (
  <div>
    <div onClick={() => {
      handleClick(data.id);
    }}>
      {data.name}
    </div>
    <div>

    </div>
  </div>
);

export default TrackData;