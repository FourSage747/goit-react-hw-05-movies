import { NavLink } from "react-router-dom";
import css from '../pages/CSS.module.css'

export const Header = () => {
  return (
    <div>
      <div className="navbar-collapse" id="navbarNavAltMarkup">
        <div className={css.navbarcollapse}>
          <NavLink className={css.navlink} to="/">
            Home
          </NavLink>
          <NavLink className={css.navlink} to="/movies">
            Movies
          </NavLink>
        </div>
      </div>
    </div>
  );
};