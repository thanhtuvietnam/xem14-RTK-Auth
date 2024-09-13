import { RightBarCar, SectionTitle } from './index.js';
import { useActiveButton, useActiveLinkButton } from '../../hooks/useActiveButton.js';
import { IMG_URL } from '../../shared/constant.js';
import React, { useCallback, useEffect, useState } from 'react';
import { homeApi, useGetSortQuery } from '../../store/apiSlice/homeApi.slice.js';
import { Link, useNavigate } from 'react-router-dom';
import { shuffleAndSliceArray } from '../../shared/utils.js';
import { ScaleLoader } from 'react-spinners';
import { useDebounce } from '../../hooks/useDebounce.js';
const TrendingNow = React.memo(({ addClass, movieSortValue, numberSlice }) => {
  const buttonLists = ['Ngày', 'Tuần', 'Tháng'];
  const [activeLinkButton, handleClickLink] = useActiveLinkButton(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const sortParams = movieSortValue || [];
  const { data, error } = useGetSortQuery(sortParams[activeLinkButton], { skip: !sortParams.length });

  const dataRightBar = data?.data?.items;
  const dataRightBarSlice = shuffleAndSliceArray(dataRightBar || [], numberSlice);

  const handleButtonClick = useCallback(
    (index) => {
      handleClickLink(index);
      setIsLoading(true);
    },
    [handleClickLink]
  );
  const debouncedLoading = useDebounce(isLoading, 500);
  useEffect(() => {
    if (debouncedLoading && data) {
      setIsLoading(false);
    }
  }, [debouncedLoading, data]);

  const handleCardClick = useCallback(
    (slug) => {
      const newPath = `/chitiet-phim/${slug}`;
      if (location.pathname.startsWith('/chitiet-phim')) {
        window.history.pushState(null, '', newPath);
        window.dispatchEvent(new Event('popstate'));
      } else {
        navigate(newPath);
      }
    },
    [navigate]
  );

  return (
    <div className={` mb-5 ${addClass} min-h-screen  cursor-pointer`}>
      <div className='!border-b !border-[#1e2732] flex items-center justify-between'>
        <SectionTitle
          sectionFilm={`TOP XEM NHIỀU`}
          hidden={`hidden`}
        />
        <div className='flex items-center '>
          {buttonLists.map((button, index) => (
            <button
              onClick={() => handleButtonClick(index)}
              className={`trending-button ${activeLinkButton === index ? 'activetrending' : ''}`}
              key={index}>
              {button}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-2 relative'>
        {isLoading && (
          <div className='loading-overlay'>
            <ScaleLoader
              size={200}
              height={50}
              width={15}
              color='#e06c26'
            />
          </div>
        )}
        {error && <div>Error loading data</div>}
        {dataRightBarSlice &&
          dataRightBarSlice.map((item) => (
            <div
              key={item?._id}
              onClick={() => handleCardClick(item.slug)}>
              <RightBarCar
                thumbImage={`${IMG_URL}/${item?.thumb_url}`}
                year={item.year}
                movieName={item.name}
                originName={item.origin_name}
                lineclampCss={`lg:line-clamp-3`}
                view={item.view}
              />
            </div>
          ))}
      </div>
    </div>
  );
});
TrendingNow.displayName = 'TrendingNow';

export default TrendingNow;
