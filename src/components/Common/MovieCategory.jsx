import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NoteViewer, CardItem, Filter, PaginationCom, SectionTitle, TrendingNow, BreadCrumb } from './index.js';
import { IMG_URL, noteLine } from '../../shared/constant.js';
import { classifyAddon } from '../../shared/utils.js';
import PropTypes from 'prop-types';
import SkeletonForAll from '../Skeleton/SkeletonForAll/SkeletonForAll.jsx';
import { useGetMoviesByCategoryQuery } from '../../store/apiSlice/homeApi.slice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../../store/hook.js';
import { setCurrentPage } from '../../store/searchSlice/searchSlice.js';
import { icons } from '../../shared/icon.js';

const { IoWarningSharp } = icons;

const MovieCategory = React.memo(({ sectionTitle, dataResults, totalItemsSearch, categorySlug, categoryBreadCrumb, OthersBreadCrumb, hiddenOther, movieSortValue, numberSlice }) => {
  const location = useLocation();

  const pageType = location.pathname === '/tim-kiem' ? 'search' : 'normal';

  const currentPage = useAppSelector((state) => state.search.currentPage);

  const { data: categoryData, isLoading, isFetching, isError, error } = useGetMoviesByCategoryQuery({ category: categorySlug, page: currentPage }, { skip: !categorySlug });

  const limit = 24;

  const totalPages = useMemo(() => {
    return totalItemsSearch ? Math.ceil(totalItemsSearch / limit) : Math.ceil((categoryData?.data?.params?.pagination?.totalItems || 0) / limit);
  }, [totalItemsSearch, categoryData, limit]);

  const searchPageError = useAppSelector((state) => state.loadingState.Error);

  useEffect(() => {
    if (isError && error) {
      toast('BẠN VUI LÒNG BẤM F5 HOẶC BẤM TẢI LẠI TRANG', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (searchPageError) {
      toast('BẠN THỬ THỰC HIỆN LẠI THAO TÁC VÀ F5 XEM', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isError, error, searchPageError]);

  const renderMovieItems = useMemo(() => {
    const items = dataResults || categoryData?.data?.items;
    if (!items || items.length === 0) {
      return (
        <div className='col-span-full text-center text-white text-lg'>
          <div className='flex gap-2 items-center justify-center'>
            <IoWarningSharp
              color='yellow'
              size={45}
            />
            <h1>Rất tiếc, chúng tôi không có phim cho mục này...</h1>
          </div>
        </div>
      );
    }
    return items?.map((item) => (
      <Link
        to={`/chitiet-phim/${item.slug}`}
        key={item._id}>
        <CardItem
          image={`${IMG_URL}/${item?.thumb_url}`}
          title={item?.name}
          originalName={item?.origin_name}
          quality={item?.quality}
          lang={item?.lang}
          addOn={classifyAddon(item)}
          cardItemQualang='cardItemQualang'
        />
      </Link>
    ));
  }, [dataResults, categoryData]);

  if (isFetching) {
    return (
      <SkeletonForAll
        withSlider={false}
        cardCount={24}
        sectionCount={1}
      />
    );
  }

  return (
    <div className='min-h-screen custom-page px-0 bg-[#151d25]'>
      <NoteViewer
        note={noteLine}
        hidden={`hidden`}
      />
      <ToastContainer />
      <Filter />
      <div className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg  min-h-screen'>
        <div className='lg:mr-5 mb-5 lg:w-3/4'>
          <div className='mb-3'>
            <BreadCrumb
              OthersBreadCrumb={OthersBreadCrumb}
              categoryBreadCrumb={categoryBreadCrumb}
              PageBreadCrumb={`Trang ${currentPage}`}
              hiddenOther={hiddenOther}
            />
            <SectionTitle
              sectionFilm={sectionTitle}
              hidden={`hidden`}
            />
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 responsive-edit gap-2.5'>{renderMovieItems}</div>
        </div>
        <div className='lg:w-2/6'>
          <TrendingNow
            numberSlice={numberSlice}
            addClass={'mt-5'}
            movieSortValue={movieSortValue}
          />
        </div>
      </div>
      <div className='fixed bottom-0 bg-black/75 z-10'>
        <PaginationCom
          routePath={location.pathname}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageType={pageType}
        />
      </div>
    </div>
  );
});
MovieCategory.propTypes = {
  dataResults: PropTypes.array,
  categoryBreadCrumb: PropTypes.string,
  sectionTitle: PropTypes.string,
  totalItemsSearch: PropTypes.number,
  hiddenOther: PropTypes.string,
};
MovieCategory.displayName = 'MovieCategory';
export default MovieCategory;
