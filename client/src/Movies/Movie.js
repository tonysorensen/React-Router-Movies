import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//Props are being passed from App.js but those props lack the stars that are displayed on the Movie card and we can't change props once they are received. If we had received ALL of the data in our App.js this would be easy. Instead, we have to make a new call here with ${id} to get the stars info we need. Below we see the console log when we use useParams. We set useParams to the variable name params at the point of the consol log params has grabbed the id of the card number we clicked on in the MovieList component. By the end of the useEffect it has called for the full information from the card with the given id. Then "movie" is set to the props we want from that request(all of them) and a card is returned with the info.
// Moviw.js:12 params {id: "1"}
// Movie.js:20 movie card response {id: 1, title: "Star Wars", director: "George Lucas", metascore: 92, stars: Array(3)}
const Movie = (props) => {
  const [movie, setMovie] = useState();
  const params = useParams();
  console.log("params", params);
  // debugger;
  useEffect(() => {
    const id = params.id;
    console.log(params.id);
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        console.log("movie card response", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);
  // debugger;
  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = evt => {
  // }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
//Here we are setting the props we want from movie which is the state variable we set above. Since we used setMovie to populate movie(which was empty until then), we have access to the response.data from our get request. Our response.data contains title, director, metascore, and an array of stars.
  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>
{/* Here we are mapping over the stars array contained in thge object we called using its id. We create a div with each star's name. */}
        {stars.map((star) => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button">Save</div>
    </div>
  );
};

export default Movie;
