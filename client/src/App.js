import React, { useState, useEffect } from "react";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import { Route, Switch } from "react-router-dom";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies


  //Setting state here. setMovieList is pulling the data from server.js in the main file which also holds this client file. response.data===movies, the array of objects in server.js. useState is setting up an empty array to hold that data. Below the consol logs show first the empty array created with useState, next that array as it's populated with the data from the get request. The ones below that show the props that are recieved when that data is passed to the MoveList component. The final one is the same as the initial data, just showing it after it has been set to State as setMovieList(response.data) in App.js in the .then portion of the get request. The way the object is set up in server.js it only returns id, title, director, metascore when a request is sent to  http://localhost:5000/api/movies, when a request is sent to http://localhost:5000/api/movies/id it will return the entire object which includes an array of stars(See Movie component request)
// App.js:22 movielist []
// App.js:22 movielist (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// MovieList.js:16 movie details {id: 0, title: "The Godfather", director: "Francis Ford Coppola", metascore: 100}
// MovieList.js:16 movie details {id: 1, title: "Star Wars", director: "George Lucas", metascore: 92}
// MovieList.js:16 movie details {id: 2, title: "The Lord of the Rings: The Fellowship of the Ring", director: "Peter Jackson", metascore: 92}
// MovieList.js:16 movie details {id: 3, title: "Terminator 2: Judgement Day", director: "James Cameron", metascore: 94}
// MovieList.js:16 movie details {id: 4, title: "Dumb and Dumber", director: "The Farely Brothers", metascore: 76}
// MovieList.js:16 movie details {id: 5, title: "Tombstone", director: "George P. Cosmatos", metascore: 89}
// App.js:29 response data (6) [{…}, {…}, {…}, {…}, {…}, {…}]
  const [movieList, setMovieList] = useState([]);
  console.log('movielist', movieList);
  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies/")
        .then((response) => {
          setMovieList(response.data);
          console.log('response data', response.data)
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };


  return (
    <div>
      <SavedList
        list={
          [
            /* This is stretch */
          ]
        }
      />
      <div>
        <Switch>
        {/* Here the route is set for the movie component with a dynamic id. No props are being set here. The data is received and props set in the Movie component*/}
          <Route path="/movies/:id" component={Movie}></Route>
          {/* This Route is for the MovieList which appears on the home page. The data is State here but is passed as Props to the MovieList component. Yes, state is passed as props.  */}
          <Route
            path="/"
            render={() => {
              return <MovieList movies={movieList} />;
            }}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
