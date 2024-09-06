import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { Home, Error, PhimBo, PhimLe, HomePage, HoatHinh, TVShows, MovieInfo, SapChieu, MovieWatch, Theloai, QuocGia, SearchPage, Login, Signup } from './pages/index';
import { path } from './shared/constant';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={path.HOME}
      element={<Home />}>
      <Route
        path='/sign-up'
        element={<Signup />}
      />
      <Route
        path='/log-in'
        element={<Login />}
      />
      <Route
        index
        element={<HomePage />}
      />
      <Route
        path={path.PHIMLE}
        element={<PhimLe />}
      />
      <Route
        path={path.PHIMBO}
        element={<PhimBo />}
      />
      <Route
        path={path.SAPCHIEU}
        element={<SapChieu />}
      />
      <Route
        path={path.TVSHOWS}
        element={<TVShows />}
      />
      <Route
        path={path.HOATHINH}
        element={<HoatHinh />}
      />
      <Route
        path={path.MOVIEINFO}
        element={<MovieInfo />}
      />
      <Route
        path={path.XEMPHIM}
        element={<MovieWatch />}
      />
      <Route
        path={path.THELOAI}
        element={<Theloai />}
      />
      <Route
        path={path.QUOCGIA}
        element={<QuocGia />}
      />
      <Route
        path={path.SEARCHRESULTS}
        element={<SearchPage />}
      />
      <Route
        path='*'
        element={<Error />}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
