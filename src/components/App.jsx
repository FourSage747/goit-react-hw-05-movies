import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Home } from './pages/Home';
import { Suspense, lazy } from 'react';
// import { Movies } from './pages/Movies';
// import { MovieDetails } from './pages/MovieDetails';
// import { Cast } from './pages/Cast';
// import { Reviews } from './pages/Reviews';


const Movies = lazy(() => import('./pages/Movies'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))
const Cast = lazy(() => import('./pages/Cast'))
const Reviews = lazy(() => import('./pages/Reviews'))

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
};
