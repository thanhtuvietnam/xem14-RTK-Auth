import React, { useEffect, useMemo } from 'react';
import BannerSlider from '../components/Slider/BannerSlider';
import SectionSlider from '../components/Slider/SectionSlider';
import { TrendingNow, Filter, NoteViewer } from '../components/Common/index.js';
import { MiniSlider } from '../components/Slider/MiniSlider';
import 'react-loading-skeleton/dist/skeleton.css';
import { navLists, noteLine } from '../shared/constant.js';
import { useGetPhimmoiQuery, useGetPhimboQuery, useGetPhimleQuery, useGetTVShowsQuery, useGetHoathinhQuery } from '../store/apiSlice/homeApi.slice.js';
import { useAppdispatch, useAppSelector } from '../store/hook.js';
import { setActiveButton, setLoading } from '../store/mainSlice/LoadingSlice/loadingSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll.jsx';
import Error from './Error.jsx';
import { useActiveButton } from '../hooks/useActiveButton.js';

const HomePage = React.memo(() => {
  const Loading = useAppSelector((state) => state.loadingState.Loading);
  const dispatch = useAppdispatch();
  const [activeButton, handleClick] = useActiveButton(navLists);

  const PhimmoiQuery = useGetPhimmoiQuery(1);
  const PhimboQuery = useGetPhimboQuery(1);
  const PhimleQuery = useGetPhimleQuery(1);
  const TVShowsQuery = useGetTVShowsQuery(1);
  const HoathinhQuery = useGetHoathinhQuery(1);

  const queries = [PhimmoiQuery, PhimboQuery, PhimleQuery, TVShowsQuery, HoathinhQuery];
  const movies = useMemo(() => {
    if (queries.every((query) => query.data)) {
      return {
        Phimmoi: PhimmoiQuery.data?.data?.items,
        Phimbo: PhimboQuery.data?.data?.items,
        Phimle: PhimleQuery.data?.data?.items,
        TVShows: TVShowsQuery.data?.data?.items,
        Hoathinh: HoathinhQuery.data?.data?.items,
      };
    }
    return null;
  }, [PhimmoiQuery.data, PhimboQuery.data, PhimleQuery.data, TVShowsQuery.data, HoathinhQuery.data]);

  useEffect(() => {
    if (activeButton === null) {
      dispatch(setActiveButton(0));
    }
  }, [activeButton, dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));

    const hasError = queries.some((query) => query.isError);
    const allLoaded = queries.every((query) => !query.isLoading);

    if (hasError) {
      dispatch(setLoading(false));
      const error = queries.find((query) => query.error)?.error;
      if (error) {
        console.error('Có lỗi xảy ra:', error);
        toast('BẠN VUI LÒNG BẤM F5 HOẶC BẤM TẢI LẠI TRANG');
      } else {
        console.error('Có lỗi xảy ra!');
      }
      return;
    }

    if (allLoaded) {
      dispatch(setLoading(false));
    }
  }, queries);

  return (
    <div className='bg-[#222d38]'>
      <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
        <NoteViewer
          hidden='hidden'
          note={noteLine}
        />
        <ToastContainer />
        {Loading ? (
          <SkeletonForAll
            withSlider={true}
            sectionCount={4}
            cardCount={12}
          />
        ) : movies ? (
          <>
            <BannerSlider films={movies} />
            <Filter />
            <MiniSlider films={movies} />
            <div className='lg:flex custom-page rounded-b-lg bg-[#151d25] shadow-lg min-h-screen'>
              <div className='lg:w-3/4'>
                <SectionSlider films={movies} />
              </div>
              <div className='lg:w-2/6'>
                <TrendingNow />
              </div>
            </div>
          </>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
});
HomePage.displayName = 'HomePage';
export default HomePage;
