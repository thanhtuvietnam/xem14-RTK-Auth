// import React, { useState, useEffect } from 'react';

// import { Link } from 'react-router-dom';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { icons } from '../../shared/icon.js';
// import { SearchBar } from './index.js';
// import { useAppdispatch, useAppSelector } from '../../store/hook.js';
// import { clearSearchKey, setCurrentPage, setPage } from '../../store/searchSlice/searchSlice.js';
// import { clearSlug, clearType } from '../../store/mainSlice/SubmenuSlice/submenuSlice.js';
// import { setActiveButton, setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice.js';
// import { useActiveButton } from '../../hooks/useActiveButton.js';
// import { navLists } from '../../shared/constant.js';

// const { FaBookmark } = icons;

// const Header = ({ onLogoClick }) => {
//   const [activeButton, handleClick] = useActiveButton(navLists);
//   const dispatch = useAppdispatch();
//   const typeRTK = useAppSelector((state) => state.submenu.type);
//   const slugRTK = useAppSelector((state) => state.submenu.slug);
//   const searchKeyRTK = useAppSelector((state) => state.search.searchKey);
//   const currentPageRTK = useAppSelector((state) => state.search.currentPage);
//   const pageRTK = useAppSelector((state) => state.search.page);
//   const activeOther = useAppSelector((state) => state.loadingState.activeOther);
//   // const activeButton = useAppSelector((state) => state.loadingState.activeButton);

//   const handleOnClick = () => {
//     // if (activeButton !== null) {
//     //   handleClick(0)
//     // }
//     onLogoClick();
//     if (activeOther !== null) {
//       dispatch(setActiveOther(null));
//     }
//     if (currentPageRTK !== 1 || pageRTK !== 1) {
//       dispatch(setCurrentPage(1));
//       dispatch(setPage(1));
//     }
//     if (searchKeyRTK !== '') {
//       dispatch(clearSearchKey());
//     }
//     if (typeRTK !== '' || slugRTK !== '') {
//       dispatch(clearType());
//       dispatch(clearSlug());
//     }
//   };
//   return (
//     <div className='h-16 custom-bg'>
//       <div className='h-full flex items-center justify-between text-[13px] text-[#e9eaee] leading-5 custom-page '>
//         <div onClick={handleOnClick}>
//           <Link
//             to='/'
//             className='flex items-center gap-1.5 object-cover'>
//             <LazyLoadImage
//               effect='blur'
//               wrapperProps={{
//                 // If you need to, you can tweak the effect transition using the wrapper style.
//                 background: '#f0f0f0',
//                 // style: { transitionDelay: '1s' },
//               }}
//               src='/logo.jpg'
//               className='h-10 w-10 ml-2.5 rounded-md'
//             />
//             <p className='text-2xl text-white font-bold whitespace-nowrap'>
//               Cuồng <span className='text-[#1890ff]'>Phim</span>
//             </p>
//           </Link>
//         </div>
//         {/* <div className='px-10 py-[10px] w-[40%]'> */}
//         <div className='hidden sm:flex'>
//           <SearchBar />
//         </div>
//         <div className='bg-[#337ab7] rounded-2xl px-[15px] py-[6px] mr-4 mt-[1px] custom-bg2 shadow-custom text-sm items-center gap-1 hidden lg:flex'>
//           <FaBookmark
//             size={15}
//             color='white'
//           />
//           <span>Phim yêu thích</span>
//           <span className='bg-red-600 rounded-full px-[6px] py-[3px] ml-2.5'>0</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { icons } from '../../shared/icon.js';
import { SearchBar } from './index.js';
import { useAppdispatch, useAppSelector } from '../../store/hook.js';
import { clearSearchKey, setCurrentPage, setPage } from '../../store/searchSlice/searchSlice.js';
import { clearSlug, clearType } from '../../store/mainSlice/SubmenuSlice/submenuSlice.js';
import { setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logOut } from '../../store/Auth/auth.slice.js';
import useClickOutSide from '../../hooks/useClickOutSide.js';
import Avatar from '@mui/joy/Avatar';
import { BookMarks } from '../Common/index.js';
import { fetchBookmarks, removeBmRdStore } from '../../store/bookmarks/bookmarks.slice.js';

const Header = React.memo(({ onLogoClick }) => {
  const dispatch = useAppdispatch();
  const { type: typeRTK, slug: slugRTK } = useAppSelector((state) => state.submenu);
  const { searchKey: searchKeyRTK, currentPage: currentPageRTK, page: pageRTK } = useAppSelector((state) => state.search);
  const activeOther = useAppSelector((state) => state.loadingState.activeOther);
  const { loading, error, success, userInfo } = useAppSelector((state) => state.auth);
  const { isOpen, toggleDropdown, dropdownRef, closeDropdown } = useClickOutSide([], 'mousedown');

  const handleOnClick = useCallback(() => {
    onLogoClick();
    if (activeOther !== null) {
      dispatch(setActiveOther(null));
    }
    if (currentPageRTK !== 1 || pageRTK !== 1) {
      dispatch(setCurrentPage(1));
      dispatch(setPage(1));
    }
    if (searchKeyRTK !== '') {
      dispatch(clearSearchKey());
    }
    if (typeRTK !== '' || slugRTK !== '') {
      dispatch(clearType());
      dispatch(clearSlug());
    }
  }, [onLogoClick, activeOther, currentPageRTK, pageRTK, searchKeyRTK, typeRTK, slugRTK, dispatch]);

  // const toggleDropdown = () => {
  //   setDropdownOpen((prev) => !prev);
  // };
  const handleLogOut = () => {
    dispatch(removeBmRdStore());
    dispatch(logOut());
    closeDropdown();
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchBookmarks(userInfo.uid)); // Fetch bookmarks khi người dùng đăng nhập
    }
  }, [userInfo, dispatch]);
  return (
    <header className='h-16 custom-bg'>
      <div className='h-full flex items-center justify-between text-[13px] text-[#e9eaee] leading-5 custom-page'>
        <div
          onClick={handleOnClick}
          className=''>
          <Link
            to='/'
            className='flex items-center gap-1.5'>
            <LazyLoadImage
              effect='blur'
              wrapperClassName='bg-[#f0f0f0]'
              src='/logo.jpg'
              alt='Logo'
              className='h-10 w-full'
            />
            <p className='text-2xl text-white font-bold whitespace-nowrap'>
              Cuồng <span className='text-[#1890ff]'>Phim</span>
            </p>
          </Link>
        </div>
        <div className='hidden sm:flex'>
          <SearchBar />
        </div>
        <div className='flex gap-2 items-center'>
          {userInfo ? (
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1 truncate'>
                <div className='truncate'>
                  Xin chào, <span className='capitalize'>{userInfo?.displayName} !</span>
                </div>
              </div>
              <div
                className='relative'
                ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown(!isOpen)}
                  className='flex items-center rounded-full  '>
                  <Avatar variant='soft' />
                  {/* <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'
                    alt=''
                    className='w-10 h-10 rounded-full'
                  /> */}
                </button>
                {isOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-[#fff] rounded-md shadow-lg z-10'>
                    <div className='py-2'>
                      <Link className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>Setting</Link>
                      <button
                        onClick={handleLogOut}
                        className='block text-gray-800 w-full text-left px-4 py-2 hover:bg-gray-200'>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              to='/log-in'
              className=' text-[#0f0707] hover:text-[#ff3939]  bg-[#3dc031] hover:bg-[#3be907] px-3 py-2 rounded-md'>
              Login
            </Link>
          )}
          <BookMarks />
        </div>
      </div>
    </header>
  );
});
Header.propTypes = {
  onLogoClick: PropTypes.func.isRequired,
};

Header.displayName = 'Header';
export default Header;
