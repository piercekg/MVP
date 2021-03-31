import React from 'react';

const Form = ({ track, user, add, handleSubmit, handleClick }) => (
  <div className="login-modal">
    <div className="login-form">
      <button onClick={() => {handleClick()}}>❌</button>
      <form id="login" onSubmit={() => {
        event.preventDefault();
        var email = event.target[0].value;
        if (!email.includes('@')) {
          alert('Please enter a valid email address');
          return;
        }
        if (add) {
          track.email = email;
          handleSubmit(track);
        } else {
          handleSubmit({email: email});
        }
        document.getElementById("login").reset();
      }}>
        Enter your user ID (email address):
        <input type="text"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  </div>
);

export default Form;