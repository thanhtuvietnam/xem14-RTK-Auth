import { RightBarCar, SectionTitle } from './index.js';
import { useActiveButton, useActiveLinkButton } from '../../hooks/useActiveButton.js';
import { IMG_URL } from '../../shared/constant.js';
import React from 'react';
import { homeApi, useGetSortQuery } from '../../store/apiSlice/homeApi.slice.js';
import { Link, useNavigate } from 'react-router-dom';
import { shuffleAndSliceArray } from '../../shared/utils.js';
import { ScaleLoader } from 'react-spinners';
const TrendingNow = React.memo(({ addClass, movieSortValue, numberSlice }) => {
  const buttonLists = ['Ngày', 'Tuần', 'Tháng'];
  const [activeLinkButton, handleClickLink] = useActiveLinkButton();

  const sortParams = movieSortValue || [];
  const { data, error, isLoading } = useGetSortQuery(sortParams[activeLinkButton], { skip: !sortParams.length });

  const dataRightBar = data?.data?.items;
  const dataRightBarSlice = shuffleAndSliceArray(dataRightBar || [], numberSlice);

  const handleButtonClick = (index) => {
    handleClickLink(index);
  };

  return (
    <div className={` mb-5 ${addClass} min-h-screen `}>
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
      <div className='mt-2'>
        {isLoading && (
          <div>
            <ScaleLoader
              size={160}
              color='#e06c26'
            />
          </div>
        )}
        {error && <div>Error loading data</div>}
        {dataRightBarSlice &&
          dataRightBarSlice.map((item) => (
            <Link
              key={item?._index}
              to={`/chitiet-phim/${item.slug}`}>
              <RightBarCar
                thumbImage={`${IMG_URL}/${item?.thumb_url}`}
                year={item.year}
                movieName={item.name}
                originName={item.origin_name}
                // heightThumb={`lg:h-auto`}
                lineclampCss={`lg:line-clamp-3`}
                view={item.view}
              />
            </Link>
          ))}
      </div>
    </div>
  );
});
TrendingNow.displayName = 'TrendingNow';

export default TrendingNow;
