import React from 'react'
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { getMoviesCast } from './searchFilms';
import { useParams } from 'react-router-dom';


const url_details = 'https://image.tmdb.org/t/p/w200';

const Cast = () => {
  const {id} = useParams()
  const [moviesCast, setMoviesCast] = useState(null);

    useEffect(() => {
        getMoviesCast(id)
        .then(response => {
          if (response.data.cast.length === 0) {
              Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              return;
          }
          console.error(response)
          setMoviesCast(response.data.cast);
        })
        .catch(err => {
            Notiflix.Notify.failure(
              'Oops! Something went wrong! Try reloading the page!'
            );
            console.error(err)
          });
    }, [id]);


    return (
      <div>
        {moviesCast && moviesCast.map((el) => {
          return (
          <ul key={el.id}>
            {el.profile_path ? <img src={`${url_details}${el.profile_path}`} alt={el.name}/> : <b>No image</b>}
            <p>{el.name}</p>
            <p>Character: {el.character ? el.character : "---"}</p>
          </ul>
        )})}
      </div>
    );
}

export default Cast