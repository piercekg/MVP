import React from 'react';

const Stevie = () => {
  var index = Math.floor(Math.random() * 9);
  return (
    <div>
      <h3>Brought to you by Stevie herself!</h3>
      <img src={`./images/${index}.jpg`} alt="Stevie looking adorable!" />
    </div>
  );
};

export default Stevie;