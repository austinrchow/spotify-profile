import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

export default spotifyWebApi;

// function getNowPlaying(nowPlaying, setNowPlaying) {
//   spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
//     console.log("here, ", response);
//     if (response.item !== undefined) {
//       console.log("hello");
//       setNowPlaying({
//         name: response.item.name,
//         image: response.item.album.images[0].url,
//       });
//     }
//     console.log(nowPlaying);
//   });

//   spotifyWebApi
//     .getMe() // note that we don't pass a user id
//     .then(
//       function (data) {
//         console.log("User playlists", data);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );
// }

{
  /* Hello
      <a href="http://localhost:8888/">
        <button>Login With Spotify</button>
      </a>
      <div> Now Playing: {nowPlaying.name} </div>
      <div>
        <img src={nowPlaying.image} style={{ width: 100 }} />
      </div>
      <button onClick={() => getNowPlaying(nowPlaying, setNowPlaying)}>
        Check Now Playing
      </button> */
}

//   spotifyWebApi
//     .pause({
//       device_id: props.id,
//     })
//     .then(
//       function (data) {
//         console.log(data);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );

//   spotifyWebApi
//     .play({
//       device_id: props.id,
//       uris: [track.uri],
//       position_ms: 45000,
//     })
//     .then(
//       function (data) {
//         console.log(data);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );

const addToQueue = (event) => {
  // check if is it currently playing
  let params = [event.target.id];
  console.log(params);
  console.log(typeof params[0]);
  spotifyWebApi.addToMySavedTracks([event.target.id]).then(
    function (data) {
      console.log(data);
    },
    function (err) {
      console.error(err);
    }
  );
};
