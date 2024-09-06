import React, { useState, useEffect, useMemo } from 'react';
import { icons } from '../../shared/icon';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import SectionTitle from './SectionTitle';
import { RightBarCar } from '../MainLayOut';
import { IMG_URL } from '../../shared/constant';
import useClickOutSide from '../../hooks/useClickOutSide';
import { Link } from 'react-router-dom';
import { fetchBookmarks, removeAllBookmarks, removeBookmarks } from '../../store/bookmarks/bookmarks.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { FaBookmark } = icons;
function BookMarks({ isBookmarkDropdownOpen, toggleDropdown }) {
  const [isDeleting, setIsDeleting] = useState(false); // State để theo dõi trạng thái xóa
  const dispatch = useAppdispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  const { loading, error, success, userInfo } = useAppSelector((state) => state.auth);
  // console.log(bookmarks);

  // const { isOpen, toggleDropdown, closeDropdown, dropdownRef } = useClickOutSide([], 'mousedown');
  // const handdleBmClick = () => {
  //   if (userInfo) {
  //     toggleDropdown((e) => !e);
  //   } else {
  //     toast.info(`Vui lòng đăng nhập để thực hiện chức năng này`);
  //   }
  //   // toggleDropdown(true);
  // };
  const handleRemoveBookMark = (bookmarkId) => {
    if (bookmarks.length > 0) {
      dispatch(removeBookmarks(bookmarkId));
    }
    // dispatch(fetchBookmarks(userInfo));
  };

  const handleDeleteAll = (e) => {
    e.stopPropagation();
    if (bookmarks.length > 0) {
      setIsDeleting(true); // Bắt đầu quá trình xóa
      dispatch(removeAllBookmarks(userInfo.uid)).finally(() => {
        setIsDeleting(false);
      });
    }
  };
  const bookMarkResults = useMemo(() => {
    return (
      bookmarks &&
      bookmarks.map((bookmark) => (
        <div
          key={bookmark?.id}
          className='relative flex items-center'>
          <Link
            key={bookmark?.id}
            to={`/chitiet-phim/${bookmark.slug}`}>
            <RightBarCar
              setShowDropdown={toggleDropdown}
              movieName={bookmark?.movieName}
              originName={bookmark?.originName}
              thumbImage={`${IMG_URL}/${bookmark.thumbPath}`}
              showRemoveButton={true}
              onRemove={() => handleRemoveBookMark(bookmark.id)}
            />
          </Link>
        </div>
      ))
    );
  }, [bookmarks, toggleDropdown]);
  return (
    <>
      {/* <div
        className='bg-[#337ab7] relative rounded-2xl px-[15px] py-[6px] ml-3 custom-bg2 shadow-custom text-sm items-center gap-1 hidden lg:flex cursor-pointer duration-300 transition'
        onClick={handdleBmClick}
        ref={dropdownRef}>
        <FaBookmark
          size={15}
          color={bookmarks.length > 0 ? 'green' : 'white'}
        />
        <span>Phim yêu thích</span>
        {bookmarks && <span className='bg-red-600 rounded-full px-[6px] py-[3px] ml-2.5'>{bookmarks.length}</span>} */}

      {isBookmarkDropdownOpen && (
        <div
          className='scroll-bar-custom absolute bg-[#222222] w-[370px] top-0 right-0 translate-y-[46px]  rounded-md shadow-lg z-50 max-h-[300px] sm:max-h-[400px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[650px] overflow-y-scroll  border-[1px] border-[#684808]'
          // ref={dropdownRef}
        >
          <div className='p-2'>
            <SectionTitle
              disable={true}
              hidden={'hidden'}
              sectionFilm='BookMarks'
              showDeleteAll={true}
              showSeeAll={false}
              onDeleteAll={handleDeleteAll}
              isDeleting={isDeleting} // Truyền trạng thái xóa
            />
            {/* <button>Xoá tất cả</button> */}
          </div>
          <ul>{bookMarkResults}</ul>
        </div>
      )}
      {/* </div> */}
      {/* <ToastContainer position='top-center' /> */}
    </>
  );
}

export default BookMarks;
