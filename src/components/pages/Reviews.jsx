import React from 'react'
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { getMoviesReviews } from './searchFilms';
import { useParams } from 'react-router-dom';


const Reviews = () => {
  const {id} = useParams()
  const [moviesReviews, setMoviesReviews] = useState(null);

    useEffect(() => {
        getMoviesReviews(id)
        .then(response => {
          if (response.data.results.length === 0) {
              Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              return;
          }
          setMoviesReviews(response.data.results);
        })
        .catch(err => {
            Notiflix.Notify.failure(
              'Oops! Something went wrong! Try reloading the page!'
            );
            console.error(err);
          });
    }, [id]);


    return (
      <div>
        {moviesReviews && moviesReviews.map((el) => {
          return (
          <ul key={el.id}>
            <h3>Author: {el.author}</h3>
            <p>Character: {el.content}</p>
          </ul>
        )})}
      </div>
    );
}
export default Reviews