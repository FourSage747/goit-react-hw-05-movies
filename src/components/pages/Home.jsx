import { Link, useLocation } from "react-router-dom";
import { getMovies } from "./searchFilms";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import css from './CSS.module.css'

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
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.error(err)
    });
  },[])
  return (
      <div className={css.treningtoday}>
        <h1>Trening today</h1>
        <ul className={css.homefilms}>
          {films && films.map(film => (<li key={film.id}>
            <Link className={css.linkfilms} to={`movies/${film.id}`} state={location}>{film.title}</Link>
          </li>))}
        </ul>
      </div>
  );
};
