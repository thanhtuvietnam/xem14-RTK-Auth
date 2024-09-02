import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { titleListButton } from '../../shared/utils';

const SectionTitle = React.memo(({ sectionFilm, hidden }) => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between lg:mr-5'>
      <button className='sectionTitle-custom border-b py-3'>
        <span
          className='font-extrabold tracking-wider capitalize whitespace-nowrap'
          onClick={() => navigate(`${titleListButton(sectionFilm)}`)}>
          {sectionFilm}
        </span>
      </button>
      <button
        className={`sectionTitle-button md:tracking-widest bg-gradient-to-r from-[#151d25] to-[#194161] hover:from-black hover:to-black transition duration-300 mb-1 ${hidden}`}
        onClick={() => navigate(`/${titleListButton(sectionFilm)}`)}>
        Xem tất cả
      </button>
    </div>
  );
});
SectionTitle.propTypes = {
  sectionFilm: PropTypes.string,
};
SectionTitle.displayName = 'SectionTitle';
export default SectionTitle;
