import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getMoviesSearch } from './searchFilms';

export const Movies = () => {
  const [value, setValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [moviesSearch, setMoviesSearch] = useState(null);
  const location = useLocation()

  const handleChange = ({ target: { value } }) => {
    setValue(value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchText(value.trim());
  };

  useEffect(() => {
    if (searchText) {
        getMoviesSearch(searchText)
        .then(response => {
            if (response.data === 0) {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
            }
            setMoviesSearch(response.data.results);
            localStorage.setItem('result', JSON.stringify(response.data.results))
            console.log(response)
        })
        .catch(err => {
            Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
            );
            console.error(err);
        });
    }
  }, [searchText]);

  useEffect(()=>{
    const parsedSearch = localStorage.getItem('result');
    if (parsedSearch) {
        setMoviesSearch(JSON.parse(parsedSearch))
    }
  },[])

  return (
    <div>
      <div>
        <Link to='/'>Go back</Link>
      </div>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          name="search"
          placeholder=""
          onChange={handleChange}
          value={value}
        />
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
      {moviesSearch &&
        moviesSearch.map(el => {
          return (
            <li key={el.id}>
              <Link to={`${el.id}`} state={location}>
                {el.title}
              </Link>
            </li>
          );
        })}
    </div>
  );
};
