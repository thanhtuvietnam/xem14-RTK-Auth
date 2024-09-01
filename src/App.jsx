
// import { Routes, Route } from 'react-router-dom';
// import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { 
        Home, 
        Error, 
        PhimBo, 
        PhimLe, 
        HomePage,
        HoatHinh,
        TVShows,
        Phim18Cong,
        MovieInfo,
        SapChieu,
        MovieWatch,
        Theloai,
        QuocGia,
        SearchPage,
        Login,
        Signup
       } from './pages/index';
import { path } from './shared/constant';


// const Home = lazy(() => import('./pages/Home'));
// const HomePage = lazy(() => import('./pages/HomePage'));
// const PhimBo = lazy(() => import('./pages/PhimBo'));
// const PhimLe = lazy(() => import('./pages/PhimLe'));
// const HoatHinh = lazy(() => import('./pages/HoatHinh'));
// const TVShows = lazy(() => import('./pages/TVShows'));
// const MovieInfo = lazy(() => import('./pages/MovieInfo'));
// const MovieWatch = lazy(() => import('./pages/MovieWatch'));
// const Theloai = lazy(() => import('./pages/Theloai'));
// const QuocGia = lazy(() => import('./pages/QuocGia'));
// const SearchPage = lazy(() => import('./pages/SearchPage'));
// const SapChieu = lazy(() => import('./pages/SapChieu'));
// const Phim18Cong = lazy(() => import('./pages/Phim18Cong'));

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path={path.HOME} element={<Home />}>
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/log-in' element={<Login />} />      
  
      <Route index element={<HomePage />} /> 
      <Route path={path.PHIMLE} element={<PhimLe />} />
      <Route path={path.PHIMBO} element={<PhimBo />} />
      <Route path={path.SAPCHIEU} element={<SapChieu />} />
      <Route path={path.PHIM18CONG} element={<Phim18Cong />} />
      <Route path={path.TVSHOWS} element={<TVShows />} />
      <Route path={path.HOATHINH} element={<HoatHinh />} />
      <Route path={path.MOVIEINFO} element={<MovieInfo />} />
      <Route path={path.XEMPHIM} element={<MovieWatch />} />
      <Route path={path.THELOAI} element={<Theloai />} />
      <Route path={path.QUOCGIA} element={<QuocGia />} />
      <Route path={path.SEARCHRESULTS} element={<SearchPage />} />
      <Route path="*" element={<Error />} /> {/* Route cho 404 Not Found */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}



// function App() {

//   return (

//      <Routes>
//       <Route path={path.HOME} element={<Home />}>
//         <Route path={path.HOMEPAGE} element={<HomePage />} />
//         <Route path={path.PHIMLE} element={<PhimLe />} />
//         <Route path={path.PHIMBO} element={<PhimBo />} />
//         <Route path={path.ERROR} element={<Error />} />
//         <Route path={path.SAPCHIEU} element={<SapChieu />} />
//         <Route path={path.PHIM18CONG} element={<Phim18Cong />} />
//         <Route path={path.TVSHOWS} element={<TVShows />} />
//         <Route path={path.HOATHINH} element={<HoatHinh />} />
//         <Route path={path.MOVIEINFO} element={<MovieInfo />} />
//         <Route path={path.XEMPHIM} element={<MovieWatch />} />
//         <Route path={path.THELOAI} element={<Theloai />} />
//         <Route path={path.QUOCGIA} element={<QuocGia />} />
//         <Route path={path.SEARCHRESULTS} element={<SearchPage/>} />
//       </Route>
//     </Routes>

    
//   );
// }
export default App;
