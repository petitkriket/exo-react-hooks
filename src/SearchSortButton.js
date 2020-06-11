import React from "react";
import { Button } from "@material-ui/core";

const SearchSortButton = ({ onSortRequest, label }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onSortRequest();
  };
  return (
    <div>
      <Button onClick={handleClick} size="small">
        {label}
      </Button>
    </div>
  );
};

export default SearchSortButton;
