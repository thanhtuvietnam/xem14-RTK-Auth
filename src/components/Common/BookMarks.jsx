import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import SectionTitle from './SectionTitle';
import { RightBarCar } from '../MainLayOut';
import { IMG_URL } from '../../shared/constant';
import { Link } from 'react-router-dom';
import { removeAllBookmarks, removeBookmarks } from '../../store/bookmarks/bookmarks.slice';
import 'react-toastify/dist/ReactToastify.css';

const BookMarks = React.memo(({ isBookmarkDropdownOpen, toggleDropdown }) => {
  const [isDeleting, setIsDeleting] = useState(false); // State để theo dõi trạng thái xóa
  const dispatch = useAppdispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  const { loading, error, success, userInfo } = useAppSelector((state) => state.auth);
  // console.log(bookmarks);

  const handleRemoveBookMark = useCallback(
    (bookmarkId) => {
      if (bookmarks.length > 0) {
        dispatch(removeBookmarks(bookmarkId));
      }
    },
    [bookmarks.length, dispatch]
  );

  const handleDeleteAll = useCallback(
    (e) => {
      e.stopPropagation();
      if (bookmarks.length > 0) {
        setIsDeleting(true); // Bắt đầu quá trình xóa
        dispatch(removeAllBookmarks(userInfo?.uid)).finally(() => {
          setIsDeleting(false);
        });
      }
    },
    [bookmarks.length, dispatch, userInfo?.uid]
  );

  const renderTitle = useMemo(() => {
    return (
      <SectionTitle
        disable={true}
        hidden={'hidden'}
        sectionFilm='BookMarks'
        showDeleteAll={true}
        showSeeAll={false}
        onDeleteAll={handleDeleteAll}
        isDeleting={isDeleting} // Truyền trạng thái xóa
      />
    );
  }, [handleDeleteAll, isDeleting]);

  const renderbookMarkResults = useMemo(() => {
    return (
      bookmarks &&
      bookmarks.map((bookmark) => (
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
      ))
    );
  }, [bookmarks, toggleDropdown]);
  return (
    <>
      {isBookmarkDropdownOpen && (
        <div
          className='scroll-bar-custom absolute bg-[#222222] w-[300px] sm:w-[400px] top-0 right-0 translate-y-[46px]  rounded-md shadow-lg z-50 max-h-[300px] sm:max-h-[400px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[650px] overflow-y-scroll  border-[1px] border-[#684808]'
          // ref={dropdownRef}
        >
          <div className='p-2'>{renderTitle}</div>
          <ul>{renderbookMarkResults}</ul>
        </div>
      )}
    </>
  );
});

BookMarks.displayName = 'BookMarks';

export default BookMarks;
