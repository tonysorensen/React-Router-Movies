import React, { useState, useEffect } from "react";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import { Link, Route } from "react-router-dom";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
console.log(movieList)
  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then((response) => {
          setMovieList(response.data);
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
      <div className="buttons">
        <button className="navbutton">
          <Link to="/">Home</Link>
        </button>
        <button className="navbutton">
          <Link to="/movies">Movies</Link>
        </button>
        <Route path="/" render={() => {
          return <MovieList movies={movieList}/>
        }}/>
    
        <Route path="/movies/:id" component ={Movie}>
        </Route>
      </div>
    </div>
  );
};

export default App;
