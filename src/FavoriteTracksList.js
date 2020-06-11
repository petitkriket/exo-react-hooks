import React from "react";
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const FavoriteTracksList = ({ list, onFavoriteDiscard }) => {
  const handleClick = (track) => {
    onFavoriteDiscard(track);
  };

  const trackItems = list.map((track) => (
    <div key={track.id}>
      <p>
        {track.album.name} - {track.name} - {track.artists[0].name} -
        {track.duration_ms}
        <Button
          onClick={() => handleClick(track)}
          size="small"
          startIcon={<CancelIcon />}
          variant="outlined"
        >
          Retirer des favoris
        </Button>
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
        <div>{trackItems}</div>
      ) : (
        <div>Pas de favoris...</div>
      )}
    </div>
  );
};

export default FavoriteTracksList;
