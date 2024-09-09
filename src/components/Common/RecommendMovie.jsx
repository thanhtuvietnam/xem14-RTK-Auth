import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CardItem, SectionTitle } from '../Common/index.js';
import { useGetSortQuery } from '../../store/apiSlice/homeApi.slice.js';
import { IMG_URL, timeSort } from '../../shared/constant.js';
import { useAppSelector } from '../../store/hook.js';
import { Link, useNavigate } from 'react-router-dom';
import { classifyAddon, shuffleAndSliceArray } from '../../shared/utils.js';
import SkeletonForAll from '../Skeleton/SkeletonForAll/SkeletonForAll.jsx';
import { GridLoader } from 'react-spinners';
import { sliderClasses } from '@mui/material';

const RecommendMovie = ({ items }) => {
  console.log('Component mounted');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleCardClick = useCallback(
  //   (slug) => {
  //     setLoading(true);
  //     const newPath = `/chitiet-phim/${slug}`;
  //     if (location.pathname.startsWith('/chitiet-phim')) {
  //       window.history.pushState(null, '', newPath); // Thay đổi URL mà không điều hướng lại trang
  //     } else {
  //       navigate(newPath);
  //     }
  //   },
  //   [location.pathname, navigate]
  // );

  const renderRecommend = useMemo(() => {
    return items?.slice(0, 8).map((item) => (
      <div
        key={item._id}
        // onClick={() => handleCardClick(item.slug)}
      >
        <CardItem
          image={`${IMG_URL}/${item?.thumb_url}`}
          title={item?.name}
          originalName={item?.origin_name}
          quality={item?.quality}
          lang={item?.lang}
          addOn={classifyAddon(item)}
          cardItemQualang='cardItemQualanh'
        />
      </div>
    ));
  }, [items]);

  return (
    <div>
      <div className='sectionTitle-custom  mb-3'>
        <h1 className='font-bold tracking-wide text-base '>
          <SectionTitle
            sectionFilm={'Có thể phù hợp với bạn'}
            hidden={`hidden`}
          />
        </h1>
      </div>
      <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 grid-rows-2  mb-5'>{renderRecommend}</div>
    </div>
  );
};

RecommendMovie.displayName = 'RecommendMovie';

export default RecommendMovie;
