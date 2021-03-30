import React from 'react';


const Search = ({ handleSearch }) => (
  <div>
    <form id="search-form" onSubmit={() => {
      event.preventDefault();
      var params = {
        query: event.target[0].value,
        type: event.target[1].value
      };
      handleSearch(params);
      document.getElementById("search-form").reset();
    }}>
      Search:
      <input type="text"></input>
      Type:
      <select>
        <option value="artist">Artist</option>
        <option value="album">Album</option>
        <option value="track">Track</option>
      </select>
      <input type="submit" value="Submit"></input>
    </form>
  </div>
);

export default Search;