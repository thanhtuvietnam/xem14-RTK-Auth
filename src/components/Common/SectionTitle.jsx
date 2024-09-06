import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { titleListButton } from '../../shared/utils';

const SectionTitle = React.memo(({ sectionFilm, hidden, disable, showSeeAll, showDeleteAll, onDeleteAll, isDeleting }) => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between lg:mr-5'>
      <button
        disabled={disable}
        className='sectionTitle-custom border-b py-3'>
        <span
          className='font-extrabold tracking-wider capitalize whitespace-nowrap'
          onClick={() => navigate(`${titleListButton(sectionFilm)}`)}>
          {sectionFilm}
        </span>
      </button>
      {/* {showSeeAll && ( */}
      <button
        disabled={disable}
        className={`sectionTitle-button md:tracking-widest bg-gradient-to-r from-[#151d25] to-[#194161] hover:from-black hover:to-black transition duration-300 mb-1 ${hidden}`}
        onClick={() => navigate(`/${titleListButton(sectionFilm)}`)}>
        Xem tất cả
      </button>
      {/* )} */}
      {showDeleteAll && (
        <button
          // disabled={disable}
          className={`sectionTitle-button md:tracking-widest bg-gradient-to-r from-[#d40901] to-[#e93205] hover:from-black hover:to-black transition duration-300 mb-1 absolute right-1`}
          onClick={onDeleteAll}>
          {isDeleting ? 'Đang xóa...' : 'Xoá tất cả'} {/* Hiển thị thông báo nếu đang xóa */}
        </button>
      )}
    </div>
  );
});
SectionTitle.propTypes = {
  sectionFilm: PropTypes.string,
  showDeleteAll: PropTypes.bool, // Đảm bảo prop này được định nghĩa
  onDeleteAll: PropTypes.func, // Định nghĩa hàm xóa tất cả
};
SectionTitle.displayName = 'SectionTitle';
export default SectionTitle;
