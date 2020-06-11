import React from "react";
import { Input, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchForm = ({ onSearchSubmission }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmission(event.target.track.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus={true}
          color="primary"
          id="track"
          type="text"
          placeholder="Morceau, ex : Billie Jean"
        />
        <IconButton
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default SearchForm;
