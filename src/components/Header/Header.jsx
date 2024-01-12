import { NavLink, useLocation } from 'react-router-dom';
import css from '../pages/CSS.module.css';

export const Header = () => {
  const location = useLocation();

  return (
    <div>
      <div className="navbar-collapse" id="navbarNavAltMarkup">
        <div className={css.navbarcollapse}>
          <NavLink className={`${css.navlink} ${location.pathname === '/' ? css.active : ''}`} to="/">
            Home
          </NavLink>
          <NavLink className={`${css.navlink} ${location.pathname === '/movies' ? css.active : ''}`} to="/movies">
            Movies
          </NavLink>
        </div>
      </div>
    </div>
  );
};



