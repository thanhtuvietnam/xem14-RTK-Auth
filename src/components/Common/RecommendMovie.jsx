import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CardItem, SectionTitle } from '../Common/index.js';
import { IMG_URL, timeSort } from '../../shared/constant.js';
import { Link, useNavigate } from 'react-router-dom';
import { classifyAddon, shuffleAndSliceArray } from '../../shared/utils.js';

const RecommendMovie = React.memo(({ items, excludeItems }) => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (slug) => {
      // setLoading(true);
      const newPath = `/chitiet-phim/${slug}`;
      if (location.pathname.startsWith('/chitiet-phim')) {
        window.history.pushState(null, '', newPath);
        window.dispatchEvent(new Event('popstate')); // Dispatch sự kiện popstate để lắng nghe sự thay đổi URL
      } else {
        navigate(newPath);
      }
    },
    [navigate]
  );

  const filteredItems = useMemo(() => {
    return items?.filter((item) => item?._id !== excludeItems); // So sánh trực tiếp với excludeItems
  }, [items, excludeItems]);

  const randomItems = useMemo(() => shuffleAndSliceArray(filteredItems, 8), [filteredItems]);

  const renderRecommend = useMemo(() => {
    return randomItems?.map((item) => (
      <div
        key={item._id}
        onClick={() => handleCardClick(item.slug)}>
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
  }, [randomItems, handleCardClick]);

  const renderSectionTitle = useMemo(() => {
    return (
      <SectionTitle
        sectionFilm={'Có thể phù hợp với bạn'}
        hidden={`hidden`}
      />
    );
  }, []);

  return (
    <div>
      <div className='sectionTitle-custom  mb-3'>
        <h1 className='font-bold tracking-wide text-base '>{renderSectionTitle}</h1>
      </div>
      <div className='mt-2 grid grid-cols-2 gap-2 min-[540px]:grid-cols-3 md:grid-cols-4 grid-rows-2  mb-5'>{renderRecommend}</div>
    </div>
  );
});

RecommendMovie.displayName = 'RecommendMovie';

export default RecommendMovie;
