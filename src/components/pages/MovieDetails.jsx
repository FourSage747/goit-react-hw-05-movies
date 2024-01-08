import Notiflix from 'notiflix';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMoviesDetails } from './searchFilms';
import React, { Suspense, useEffect, useState } from 'react';


const url_details = 'https://image.tmdb.org/t/p/w300';

export const MovieDetails = () => {
  const { id } = useParams();
  const [moviesDetails, setMoviesDetails] = useState(null);
  const [cast, setCast] = useState(false);
  const [reviews, setReviews] = useState(false);
  const location = useLocation()
  

  useEffect(() => {
    getMoviesDetails(id)
      .then(response => {
        if (response.data === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setMoviesDetails(response.data);
        console.log(response);
      })
      .catch(err => {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        console.error(err);
      });
  }, [id]);

  const openCast = () => {
    setCast(true);
    setReviews(false);
  };

  const openReviews = () => {
    setReviews(true);
    setCast(false);
  };

  let genress = '';
  let today;
  if (moviesDetails) {
    moviesDetails.genres.map(el => {
      return (genress += `${el.name}  `);
    });
    today = new Date(moviesDetails.release_date);
  }

  return (
      <div>
        {moviesDetails && (
          <div>
            <div>
              <Link to={location.state}>Go back</Link>
            </div>
            <div>
              <img
                src={`${url_details}${moviesDetails.poster_path}`}
                alt={moviesDetails.original_title}
              />
              <h2>{`${moviesDetails.title} (${today.getFullYear()})`}</h2>
              <p>
                User Score: {`${Math.round(moviesDetails.vote_average * 10)} %`}
              </p>
              <h3>Overview</h3>
              <p>{moviesDetails.overview}</p>
              <h4>Genres</h4>
              <p>{genress}</p>
            </div>
            <div>
              <h5>Additional information</h5>
              <ul>
                <Link to="cast" onClick={openCast}>Cast</Link>
                <Link to="reviews" onClick={openReviews}>Reviews</Link>
              </ul>
                <Suspense>
                  <Outlet />
                </Suspense>
              {/* {cast && <Cast id={id} />}
              {reviews && <Reviews id={id} />} */}
            </div>
          </div>
        )}
      </div>
  );
};
