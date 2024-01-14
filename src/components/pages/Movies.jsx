import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getMoviesSearch } from './searchFilms';
import css from './CSS.module.css'


const Movies = () => {
  const [value, setValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchFilter, setSearchFilter] = useState('')
  const [moviesSearch, setMoviesSearch] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()

  const handleChange = ({ target: { value } }) => {
    setValue(value.trim());
    setSearchParams({search: value})
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchText(value.trim());
  };

  useEffect(() => {
    if (searchText || searchFilter) {
      const find = searchText ? searchText : searchFilter;
        getMoviesSearch(find)
        .then(response => {
            if (response.data === 0) {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
            }
            setMoviesSearch(response.data.results);
            // localStorage.setItem('result', JSON.stringify(response.data.results))
            console.log(response)
        })
        .catch(err => {
            Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
            );
            console.error(err);
        });
    }
  }, [searchText, searchFilter]);

  useEffect(()=>{
    const filter = searchParams.get('search')
    setSearchFilter(filter)
    console.log(filter)
  },[searchParams])

  return (
    <div>
      {/* <div className={css.goback}>
        <Link className={css.gobacklink} to='/'>Go back</Link>
      </div> */}
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className={css.searchForminput}
          type="text"
          name="search"
          placeholder=""
          onChange={handleChange}
          value={value}
        />
        <button type="submit" className={css.searchFormbutton}>
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
      <ul className={css.homefilms}>
      {moviesSearch &&
        moviesSearch.map(el => {
          return (
          
              <li key={el.id}>
                <Link className={css.linkfilms} to={`${el.id}`} state={location}>
                  {el.title}
                </Link>
              </li>
            
          );
        })}
        </ul>
    </div>
  );
};

export default Movies