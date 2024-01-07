import axios from "axios";

const url = 'https://api.themoviedb.org/3/trending/movie/day';
const url_details = 'https://api.themoviedb.org/3/movie/';
const url_search = 'https://api.themoviedb.org/3/search/movie';
const api_key = '51543c3005cb7c47e497dbf65a114fb5';

export function getMovies() {
  return axios.get(url, {
    params: {
      api_key: api_key,
      language: 'en-US',
      page: 1,
    },
  });
}

export function getMoviesDetails(id) {
  return axios.get(`${url_details}${id}`, {
    params: {
      api_key: api_key,
      language: 'en-US',
      page: 1,
    },
  });
}

export function getMoviesSearch(searchText) {
  return axios.get(`${url_search}`, {
    params: {
      api_key: api_key,
      query: searchText,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
}

export function getMoviesCast(id) {
  return axios.get(`${url_details}${id}/credits`, {
    params: {
      api_key: api_key,
      language: 'en-US',
    },
  });
}

export function getMoviesReviews(id) {
  return axios.get(`${url_details}${id}/reviews`, {
    params: {
      api_key: api_key,
      language: 'en-US',
      page: 1,
    },
  });
}