import React from "react";
import FavoriteTracksList from "./FavoriteTracksList";
import SearchForm from "./SearchForm";
import SearchResultsList from "./SearchResultsList";
import SearchResultsPagination from "./SearchResultsPagination";
import SearchSortButton from "./SearchSortButton";

const spotifyAPICall = (queryValue, offset = 0) => {
  const query = encodeURI(queryValue);
  const token =
    "BQAHWOpw7KzXw0P3YX_xjnj_c0vlFYnVPcOUgmSP4zvTr2EN6hY23U9p29HK-b06ftbtM2ExaQX1eHeSntXzaXeHiwAEX4la5kPLW8yAXHSr3rrIVFwqYrf6k7BHxhg-h_gtFUh03c5n6ouC3YmfGsc";
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&market=FR&limit=10&offset=${offset}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
};

function App() {
  const [trackName, setTrackName] = React.useState("");
  const [tracks, setTracks] = React.useState([]);
  const [resultCount, setResultCount] = React.useState(0);
  const [resultOffset, setresultOffset] = React.useState(0);

  // dig local storage https://www.robinwieruch.de/local-storage-react
  const [favoritesTracks, setFavoritesTracks] = React.useState(() => {
    const storedTracks = window.localStorage.getItem("favoritesTracks");
    return storedTracks !== null ? JSON.parse(storedTracks) : [];
  });

  React.useEffect(() => {
    window.localStorage.setItem(
      "favoritesTracks",
      JSON.stringify(favoritesTracks)
    );
  }, [favoritesTracks]);

  // fait un call des le mount du composant et pas seulement au submit du form de recherche ?
  React.useEffect(() => {
    if (!trackName) return;

    spotifyAPICall(trackName, resultOffset)
      .then((res) => {
        setTracks(res.tracks.items);
        setResultCount(res.tracks.total);
        setresultOffset(res.tracks.offset);
      })
      .catch((err) => {});
  }, [trackName, resultOffset, resultCount]);

  const handleSearch = (queryValue, offset = 0) => {
    setTrackName(queryValue);
    setresultOffset(offset);
  };

  const sortResultsByArtistName = () => {
    const newTrackList = [...tracks];
    newTrackList.sort((a, b) =>
      a.artists[0].name > b.artists[0].name ? 1 : -1
    );
    setTracks(newTrackList);
  };

  const sortResultsByTrackName = () => {
    const newTrackList = [...tracks];
    newTrackList.sort((a, b) => (a.name > b.name ? 1 : -1));
    setTracks(newTrackList);
  };

  const handleFavorite = (track) => {
    const trackIsBookmarked = checkForTrack(track.id);
    trackIsBookmarked
      ? removeTrackFromFavorites(track)
      : addTrackToFavorites(track);
  };

  const checkForTrack = (id) => {
    const favoriteTrackIds = favoritesTracks.map((track) => track.id);
    return favoriteTrackIds.includes(id);
  };

  const addTrackToFavorites = (track) => {
    const newTrackList = [...favoritesTracks, track];
    setFavoritesTracks(newTrackList);
  };

  const removeTrackFromFavorites = (track) => {
    const newTrackList = favoritesTracks.filter(function (obj) {
      return obj.id !== track.id;
    });
    setFavoritesTracks(newTrackList);
  };

  const paginateResults = (offset) => {
    handleSearch(trackName, offset * 10);
  };
  return (
    <div className="App App-header container">
      <header className="search-bar">
        <SearchForm onSearchSubmission={handleSearch} />
        <SearchSortButton
          onSortRequest={sortResultsByTrackName}
          label="Classer par titre"
        />
        <SearchSortButton
          onSortRequest={sortResultsByArtistName}
          label="Classer par artiste"
        />
      </header>
      <div className="row">
        <SearchResultsPagination
          resultCount={resultCount}
          offset={resultOffset}
          onPaginationClick={paginateResults}
        />
      </div>
      <main className="search-results row">
        <SearchResultsList
          results={tracks}
          query={trackName}
          onFavoriteBookmark={handleFavorite}
        />
        <FavoriteTracksList
          list={favoritesTracks}
          onFavoriteDiscard={handleFavorite}
        />
      </main>
    </div>
  );
}

export default App;
