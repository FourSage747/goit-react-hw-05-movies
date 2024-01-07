import { Link, NavLink, useLocation } from "react-router-dom";
import { getMovies } from "./searchFilms";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";

export const Home = () => {
  const [films, setFilms] = useState(null);
  const location = useLocation()

  useEffect(()=>{
    getMovies()
    .then(response => {
        if (response.data.results === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          return;
        } 
        setFilms(response.data.results)
        console.log(response)
      })
    // .then(films =>{
    //   setFilms(films.results)
    //    console.log(films)
    //   })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.error(err)
    });
  },[])
  return (
      <div>
        <h1>Trening today</h1>
        <ul>
          {films && films.map(film => (<li key={film.id}>
            <Link to={`movies/${film.id}`} state={location}>{film.title}</Link>
          </li>))}
        </ul>
      </div>
  );
};
