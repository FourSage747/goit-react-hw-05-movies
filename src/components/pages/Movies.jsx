import Notiflix from 'notiflix';
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getMoviesSearch } from './searchFilms';
import css from './CSS.module.css'
import { Context } from 'components/Layout/Layout';

const Movies = () => {
  const [value, setValue] = useState('');
  const [searchText, setSearchText] = useState('');
  // const [moviesSearch, setMoviesSearch] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const context = useContext(Context)
  const {films, setFilms} = context

  const handleChange = ({ target: { value } }) => {
    setValue(value.trim());
    setSearchParams({'search': value})
    console.log(searchParams)
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
            // setMoviesSearch(response.data.results);
            // localStorage.setItem('result', JSON.stringify(response.data.results))
            setFilms(response.data.results)
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

  // useEffect(()=>{
  //   const parsedSearch = localStorage.getItem('result');
  //   if (parsedSearch) {
  //       setMoviesSearch(JSON.parse(parsedSearch))
  //   }
  // },[])

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
      {films &&
        films.map(el => {
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