import React, { useMemo } from 'react';
import { CardItem, SectionTitle } from '../Common/index.js';
import { Link } from 'react-router-dom';
import { IMG_URL, navLists } from '../../shared/constant.js';
import { linkUrl, shuffleAndSliceArray, classifyAddon } from '../../shared/utils.js';

const SectionSlider = React.memo(({ films }) => {
  const limitedFilms = useMemo(
    () => ({
      Phimle: shuffleAndSliceArray(films?.Phimle || [], 12),
      Phimbo: shuffleAndSliceArray(films?.Phimbo || [], 12),
      TVShows: shuffleAndSliceArray(films?.TVShows || [], 12),
      Hoathinh: shuffleAndSliceArray(films?.Hoathinh || [], 12),
    }),
    [films]
  );

  const sectionFilms = navLists.slice(1, 5);

  const getSelectedFilms = (sectionFilm) => {
    switch (sectionFilm) {
      case 'PHIM BỘ':
        return limitedFilms.Phimbo;
      case 'PHIM LẺ':
        return limitedFilms.Phimle;
      case 'TV SHOWS':
        return limitedFilms.TVShows;
      case 'HOẠT HÌNH':
      default:
        return limitedFilms.Hoathinh;
    }
  };

  return (
    <div>
      {sectionFilms.map((sectionFilm, index) => {
        const selectedFilms = getSelectedFilms(sectionFilm);
        return (
          <div key={index}>
            <div className='w-full !border-b !border-[#1e2732]'>
              <SectionTitle sectionFilm={sectionFilm} />
            </div>
            <div className='mt-2 grid grid-cols-2  sm:grid-cols-4 gap-2 md:grid-cols-4 md:grid-rows-3 lg:mr-5 mb-5 responsive-edit'>
              {selectedFilms.map((film) => (
                <div
                  key={film._id}
                  className='responsive-item'>
                  <Link to={linkUrl(film)}>
                    <CardItem
                      data={film}
                      image={`${IMG_URL}/${film.thumb_url}`}
                      title={film.name}
                      originalName={film.origin_name}
                      quality={film?.quality}
                      lang={film.lang}
                      addOn={classifyAddon(film)}
                      cardItemQualang='cardItemQualang'
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});
SectionSlider.displayName = 'SectionSlider';
export default SectionSlider;
