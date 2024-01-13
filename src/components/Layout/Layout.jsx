import { Header } from 'components/Header/Header';
import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const Context = React.createContext()

export const Layout = () => {
  const [movies, setMovies] = useState([])
  return (
    <>
      <Header />
      <Context.Provider value={{films: movies, setFilms: setMovies}}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Context.Provider>
    </>
  );
};
