import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const SearchResultsList = ({
  results,
  query,
  onFavoriteBookmark,
  favorites,
}) => {
  const handleClick = (track) => {
    onFavoriteBookmark(track);
  };

  const trackItems = results.map((track) => (
    <div key={track.id}>
      <p>
        {track.album.name} - {track.name} - {track.artists[0].name} -
        {track.duration_ms}
        <IconButton color="secondary" onClick={() => handleClick(track)}>
          <FavoriteIcon />
        </IconButton>
      </p>
      <img
        width="200px"
        src={track.album.images[0].url}
        alt={track.album.name}
      ></img>
    </div>
  ));

  return (
    <div className="col-sm-6">
      {trackItems.length ? (
        <div>
          <h1>Recherche: {query}</h1>
          {trackItems}
        </div>
      ) : (
        <h1>Tu veux écouter quoi ?</h1>
      )}
    </div>
  );
};

export default SearchResultsList;
