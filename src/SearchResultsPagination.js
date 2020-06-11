import React from "react";
import { Pagination } from "@material-ui/lab";

const SearchResultsList = ({ resultCount, offset, onPaginationClick }) => {
  const handleChange = (event, value) => {
    onPaginationClick(value);
  };

  const offsetToPage = () => {
    return offset / 10 + 1;
  };

  return (
    <div className="col-sm-12">
      <Pagination count={10} page={offsetToPage()} onChange={handleChange} />
    </div>
  );
};

export default SearchResultsList;
