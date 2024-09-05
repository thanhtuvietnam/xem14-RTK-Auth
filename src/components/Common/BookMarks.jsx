import React, { useState, useEffect, useMemo } from 'react';
import { icons } from '../../shared/icon';
import { useAppSelector } from '../../store/hook';
import SectionTitle from './SectionTitle';
import { RightBarCar } from '../MainLayOut';
import { IMG_URL } from '../../shared/constant';
import useClickOutSide from '../../hooks/useClickOutSide';
const { FaBookmark } = icons;
function BookMarks() {
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  // console.log(bookmarks);
  // const thumb=`${IMG_URL/${}}`
  const { isOpen, toggleDropdown, closeDropdown, dropdownRef } = useClickOutSide([], 'mousedown');
  const handdleBmClick = () => {
    toggleDropdown((e) => !e);
    // toggleDropdown(true);
  };
  return (
    <>
      <div
        className='bg-[#337ab7] relative rounded-2xl px-[15px] py-[6px] ml-3 custom-bg2 shadow-custom text-sm items-center gap-1 hidden lg:flex cursor-pointer'
        onClick={handdleBmClick}
        ref={dropdownRef}>
        <FaBookmark
          size={15}
          color={bookmarks.length > 1 ? 'green' : 'white'}
        />
        <span>Phim yêu thích</span>
        {bookmarks && <span className='bg-red-600 rounded-full px-[6px] py-[3px] ml-2.5'>{bookmarks.length}</span>}
        {isOpen && (
          <div className='absolute bg-[#222222] w-[370px] top-0 right-0 translate-y-[46px]  rounded-md shadow-lg z-50 max-h-[300px] sm:max-h-[400px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[650px] overflow-y-scroll  border-[1px] border-[#684808]'>
            <div className='p-2 flex items-center justify-between'>
              <SectionTitle
                hidden={'hidden'}
                sectionFilm='BookMarks'
              />
              <button>Xoá tất cả</button>
            </div>
            <ul>
              {bookmarks &&
                bookmarks.map((bookmark) => (
                  <li key={bookmark?.id}>
                    <RightBarCar
                      setShowDropdown={toggleDropdown}
                      movieName={bookmark?.movieName}
                      thumbImage={`${IMG_URL}/${bookmark.thumbPath}`}
                    />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default BookMarks;
