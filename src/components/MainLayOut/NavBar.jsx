// import { useEffect, useState, useRef } from 'react';
// import { SearchBar, SideBar } from '../MainLayOut/index.js';
// import { icons } from '../../shared/icon.js';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { navLists } from '../../shared/constant.js';
// import { convertToSlug } from '../../shared/utils.js';
// import { useActiveButton } from '../../hooks/useActiveButton.js';
// import UtilityButton from '../Common/UtilityButton.jsx';

// import { useAppdispatch, useAppSelector } from '../../store/hook.js';
// import { clearSearchKey, setCurrentPage, setPage } from '../../store/searchSlice/searchSlice.js';

// import { useGetCategoriesQuery } from '../../store/apiSlice/homeApi.slice.js';
// import { addQuocGia, addTheLoai, clearSlug, clearType } from '../../store/mainSlice/SubmenuSlice/submenuSlice.js';
// import { setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice.js';

// const { MdOutlineMenu, FaBookmark, HiOutlineDotsVertical, IoMdArrowDropdown, IoMdArrowDropup } = icons;

// const NavBar = () => {
//   const [isSideBarActive, setIsSideBarActive] = useState(false);
//   const [activeButton, handleClick] = useActiveButton(navLists);
//   const [showDropDown, setShowDropDown] = useState(null);
//   // const [activeOther, setActiveOther] = useState(null);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const navbarRef = useRef(null);

//   const { data: theLoaiRes, isLoading: isLoadingTheLoai, isError: isErrorTheLoai } = useGetCategoriesQuery({ category: 'the-loai' });
//   const { data: quocGiaRes, isLoading: isLoadingQuocGia, isError: isErrorQuocGia } = useGetCategoriesQuery({ category: 'quoc-gia' });

//   const isLoading = isLoadingTheLoai || isLoadingQuocGia;
//   const isError = isErrorTheLoai || isErrorQuocGia;

//   const theLoai = theLoaiRes?.data?.items;
//   const quocGia = quocGiaRes?.data?.items;
//   useEffect(() => {
//     if (theLoai && quocGia) {
//       dispatch(addTheLoai(theLoai));
//       dispatch(addQuocGia(quocGia));
//     }
//   }, [quocGiaRes, theLoaiRes]);

//   const theLoaiRTK = useAppSelector((state) => state.submenu.theLoaiRTK);
//   const quocGiaRTK = useAppSelector((state) => state.submenu.quocGiaRTK);

//   const dispatch = useAppdispatch();

//   const navListsSlug = navLists.map((text) => convertToSlug(text));
//   const typeRTK = useAppSelector((state) => state.submenu.type);
//   const slugRTK = useAppSelector((state) => state.submenu.slug);
//   const searchKeyRTK = useAppSelector((state) => state.search.searchKey);
//   const currentPageRTK = useAppSelector((state) => state.search.currentPage);
//   const pageRTK = useAppSelector((state) => state.search.page);
//   const activeOther = useAppSelector((state) => state.loadingState.activeOther);

//   function handleRTK() {
//     if (currentPageRTK !== 1 || pageRTK !== 1) {
//       dispatch(setCurrentPage(1));
//       dispatch(setPage(1));
//     }
//     if (searchKeyRTK !== '') {
//       dispatch(clearSearchKey());
//     }
//   }

//   const handleItemClick = (index) => {
//     dispatch(setActiveOther(null));
//     handleClick(index);
//     navigate(`/${navListsSlug[index]}`);
//     handleRTK();
//     if (typeRTK !== '' || slugRTK !== '') {
//       dispatch(clearType());
//       dispatch(clearSlug());
//     }
//     setShowDropDown(null);
//   };

//   const handleDropdownClick = (item) => {
//     setShowDropDown((prev) => (prev === item ? 'null' : item));
//   };

//   // const handleMouseEnter = (item) => {
//   //   setShowDropDown(item);
//   // };
//   // const handleMouseLeave = () => {
//   //   setShowDropDown(null);
//   // };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Kiểm tra xem click có nằm ngoài dropdown và navbar không
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) && navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setShowDropDown(null); // Đóng dropdown
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleCloseSideBar = () => {
//     setIsSideBarActive(false);
//     handleRTK();
//   };

//   const handleTheLoaiClick = (slug, genre) => {
//     dispatch(setActiveOther(genre));

//     navigate(`/the-loai/${slug}`, { state: { slug, type: 'the-loai' } });
//     handleRTK();
//     setShowDropDown(null);

//     // console.log('da navigate the loai')
//   };
//   const handleQuocGiaClick = (slug, genre) => {
//     dispatch(setActiveOther(genre));

//     navigate(`/quoc-gia/${slug}`, { state: { slug, type: 'quoc-gia' } });
//     handleRTK();
//     setShowDropDown(null);
//   };

//   return (
//     <div className=' bg-[#12171b] shadow-custom'>
//       <ul
//         ref={navbarRef}
//         className={`text-[#989898] hidden lg:flex custom-page list-none items-center justify-start text-[15px] font-normal transition duration-300 `}>
//         {navLists &&
//           navLists.map((navList, index) => (
//             <li
//               key={index}
//               className='relative border-r-[0.5px] first:border-l-[0.5px] border-[#2e353f] '
//               // onMouseLeave={handleMouseLeave}
//             >
//               {navList === 'THỂ LOẠI' || navList === 'QUỐC GIA' ? (
//                 <div
//                   ref={showDropDown === navList ? dropdownRef : null} // Gắn ref khi dropdown hiển thị
//                   // className={`px-2.5 py-3.5 dropdown hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer  ${activeButton === index ? 'bg-[#223344]' : ''}`}
//                   className={`px-2.5 py-3.5 dropdown hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer  ${activeButton === index ? 'bg-[#223344] text-[#ffff]' : ''}`}
//                   onClick={() => {
//                     handleDropdownClick(navList);
//                     handleClick(index); // Gọi handleClick để cập nhật activeButton
//                   }}
//                   // onMouseEnter={() => handleMouseEnter(navList)}
//                   // onMouseLeave={handleMouseLeave}
//                 >
//                   <div className='flex items-center justify-center'>
//                     {navList}
//                     {showDropDown === navList ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   className={`px-2.5 py-3.5 hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer ${activeButton === index ? 'bg-[#223344] text-[#ffff]' : ''}`}
//                   onClick={() => handleItemClick(index)}>
//                   {navList}
//                 </div>
//               )}
//               {showDropDown === navList && (
//                 <div
//                   ref={showDropDown === navList ? dropdownRef : null}
//                   className={`absolute left-0 bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50 rounded-t-none `}
//                   // onMouseEnter={() => handleMouseEnter(navList)}
//                   // onMouseLeave={handleMouseLeave}
//                 >
//                   {isLoading ? (
//                     <div className='absolute bg-black w-96 h-5 z-50 '></div>
//                   ) : (
//                     <div>
//                       {index === 5 && ( // Kiểm tra index để hiển thị đúng dropdown
//                         <div className='grid grid-cols-3 '>
//                           {theLoaiRTK &&
//                             theLoaiRTK.map((subMenuTheLoai) => (
//                               <div
//                                 onClick={() => handleTheLoaiClick(subMenuTheLoai?.slug, subMenuTheLoai?.name)}
//                                 // onClick={() => handleItemClick(index)}
//                                 // to={`/the-loai/${subMenuTheLoai.slug}`} // Điều chỉnh route cho thể loại
//                                 key={subMenuTheLoai._id}
//                                 className={`p-2 cursor-pointer text-[#989898] hover:text-white hover:border-r-2 rounded-r-md border-[#3ddbf0] ${activeOther === subMenuTheLoai?.name ? 'bg-[#000000] text-[#e2702e] border-r-2 border-[#e2702e]' : ''}`}>
//                                 {subMenuTheLoai.name}
//                               </div>
//                             ))}
//                         </div>
//                       )}
//                       {index === 6 && ( // Kiểm tra index để hiển thị đúng dropdown
//                         <div className='grid grid-cols-3'>
//                           {quocGiaRTK &&
//                             quocGiaRTK.map((subMenuQuocGia) => (
//                               <div
//                                 onClick={() => handleQuocGiaClick(subMenuQuocGia?.slug, subMenuQuocGia?.name)}
//                                 // onClick={() => handleItemClick(index)}
//                                 // to={`/quoc-gia/${subMenuQuocGia.slug}`} // Điều chỉnh route cho quốc gia
//                                 key={subMenuQuocGia._id}
//                                 className={`p-2 truncate cursor-pointer text-[#989898] hover:text-white hover:border-r-2 rounded-r-md border-[#3ddbf0] ${activeOther === subMenuQuocGia?.name ? 'bg-[#000000] text-[#e2702e] border-r-2 border-[#e2702e]' : ''}`}>
//                                 {subMenuQuocGia.name}
//                               </div>
//                             ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </li>
//           ))}
//       </ul>

//       {/* sideBar */}
//       <div className='lg:hidden flex items-center justify-between text-[#a5a5a5] custom-page'>
//         <button
//           id='myButton'
//           className='py-[9px] px-[10px] hover:bg-slate-800	'
//           onClick={() => setIsSideBarActive((ev) => !ev)}>
//           <MdOutlineMenu size={30} />
//         </button>
//         <div className='flex items-center gap-2.5'>
//           <div className='max-sm:flex hidden'>
//             <SearchBar />
//           </div>
//           <div className='flex relative h-5'>
//             <FaBookmark size={17} />
//             <span className='bg-red-700 rounded-full absolute text-sm px-1 transform -translate-y-full left-2.5 top-1.5'>0</span>
//           </div>
//           <HiOutlineDotsVertical size={17} />
//         </div>
//       </div>
//       <div>
//         <SideBar
//           theLoaiData={theLoaiRTK}
//           quocGiaData={quocGiaRTK}
//           isSidebarActive={isSideBarActive}
//           onCloseSideBar={handleCloseSideBar}
//         />
//       </div>
//       <div className='hidden md:flex'>
//         <UtilityButton />
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SearchBar, SideBar } from '../MainLayOut/index.js';
import { icons } from '../../shared/icon.js';
import { useNavigate } from 'react-router-dom';
import { navLists } from '../../shared/constant.js';
import { convertToSlug } from '../../shared/utils.js';
import { useActiveButton } from '../../hooks/useActiveButton.js';
import UtilityButton from '../Common/UtilityButton.jsx';

import { useAppdispatch, useAppSelector } from '../../store/hook.js';
import { clearSearchKey, setCurrentPage, setPage } from '../../store/searchSlice/searchSlice.js';

import { useGetCategoriesQuery } from '../../store/apiSlice/homeApi.slice.js';
import { addQuocGia, addTheLoai, clearSlug, clearType } from '../../store/mainSlice/SubmenuSlice/submenuSlice.js';
import { setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice.js';
import useClickOutSide from '../../hooks/useClickOutSide.js';
import BookMarks from '../Common/BookMarks.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { MdOutlineMenu, FaBookmark, HiOutlineDotsVertical, IoMdArrowDropdown, IoMdArrowDropup } = icons;

const NavBar = React.memo(() => {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [activeButton, handleClick] = useActiveButton(navLists);

  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const { isOpen: isOpenNav, toggleDropdown: toggleDropdownNav, dropdownRef: dropdownRefNav, closeDropdown: closeDropdownNav } = useClickOutSide([navbarRef], 'mousedown');
  const { isOpen: isOpenBM, toggleDropdown: toggleDropdownBM, dropdownRef: dropdownRefBM, closeDropdown: closeDropdownBM } = useClickOutSide([], 'mousedown');

  const { loading, error, success, userInfo } = useAppSelector((state) => state.auth);
  const { data: theLoaiRes, isLoading: isLoadingTheLoai } = useGetCategoriesQuery({ category: 'the-loai' });
  const { data: quocGiaRes, isLoading: isLoadingQuocGia } = useGetCategoriesQuery({ category: 'quoc-gia' });

  const isLoading = isLoadingTheLoai || isLoadingQuocGia;

  const dispatch = useAppdispatch();

  const theLoaiRTK = useAppSelector((state) => state.submenu.theLoaiRTK);
  const quocGiaRTK = useAppSelector((state) => state.submenu.quocGiaRTK);
  const typeRTK = useAppSelector((state) => state.submenu.type);
  const slugRTK = useAppSelector((state) => state.submenu.slug);
  const searchKeyRTK = useAppSelector((state) => state.search.searchKey);
  const currentPageRTK = useAppSelector((state) => state.search.currentPage);
  const pageRTK = useAppSelector((state) => state.search.page);
  const activeOther = useAppSelector((state) => state.loadingState.activeOther);

  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  const navListsSlug = useMemo(() => navLists.map(convertToSlug), []);

  useEffect(() => {
    if (theLoaiRes?.data?.items && quocGiaRes?.data?.items) {
      dispatch(addTheLoai(theLoaiRes.data.items));
      dispatch(addQuocGia(quocGiaRes.data.items));
    }
  }, [quocGiaRes, theLoaiRes, dispatch]);

  const handleRTK = useCallback(() => {
    if (currentPageRTK !== 1 || pageRTK !== 1) {
      dispatch(setCurrentPage(1));
      dispatch(setPage(1));
    }
    if (searchKeyRTK !== '') {
      dispatch(clearSearchKey());
    }
  }, [currentPageRTK, pageRTK, searchKeyRTK, dispatch]);

  const handleItemClick = useCallback(
    (index) => {
      dispatch(setActiveOther(null));
      handleClick(index);
      navigate(`/${navListsSlug[index]}`);
      handleRTK();
      if (typeRTK !== '' || slugRTK !== '') {
        dispatch(clearType());
        dispatch(clearSlug());
      }
      // setShowDropDown(null);
      // closeDropdown();
      closeDropdownNav();
    },
    [dispatch, handleClick, handleRTK, navigate, navListsSlug, slugRTK, typeRTK]
  );

  const handleDropdownClick = useCallback((item) => {
    // setShowDropDown((prev) => (prev === item ? null : item));
    toggleDropdownNav((prev) => (prev === item ? null : item));
  }, []);
  const handdleBmClick = () => {
    if (userInfo) {
      toggleDropdownBM((e) => !e);
    } else {
      toast.info(`Vui lòng đăng nhập để thực hiện chức năng này`);
    }
    // toggleDropdown(true);
  };
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target) && navbarRef.current && !navbarRef.current.contains(event.target)) {
  //       setShowDropDown(null);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  const handleCloseSideBar = useCallback(() => {
    setIsSideBarActive(false);
    handleRTK();
  }, [handleRTK]);

  const handleCategoryClick = useCallback(
    (slug, genre, type) => {
      dispatch(setActiveOther(genre));
      navigate(`/${type}/${slug}`, { state: { slug, type } });
      handleRTK();
      // setShowDropDown(null);
      // closeDropdown();
      closeDropdownNav();
    },
    [dispatch, navigate, handleRTK, closeDropdownNav]
  );

  const renderDropdownContent = useCallback(
    (index) => {
      const data = index === 5 ? theLoaiRTK : quocGiaRTK;
      const type = index === 5 ? 'the-loai' : 'quoc-gia';

      return (
        <div className='grid grid-cols-3'>
          {data &&
            data.map((item) => (
              <div
                onClick={() => handleCategoryClick(item.slug, item.name, type)}
                key={item._id}
                className={`p-2 truncate cursor-pointer text-[#989898] hover:text-white hover:border-r-2 rounded-r-md border-[#3ddbf0] ${activeOther === item.name ? 'bg-[#000000] text-[#e2702e] border-r-2 border-[#e2702e]' : ''}`}>
                {item.name}
              </div>
            ))}
        </div>
      );
    },
    [theLoaiRTK, quocGiaRTK, activeOther, handleCategoryClick]
  );

  return (
    <div className='bg-[#12171b] shadow-custom'>
      {/* Desktop Navigation */}
      <ul
        ref={navbarRef}
        className='text-[#989898] hidden lg:flex custom-page list-none items-center justify-start text-[15px] font-normal transition duration-300'>
        {navLists.map((navList, index) => (
          <li
            key={index}
            className='relative border-r-[0.5px] first:border-l-[0.5px] border-[#2e353f]'>
            {navList === 'THỂ LOẠI' || navList === 'QUỐC GIA' ? (
              <div
                // ref={showDropDown === navList ? dropdownRef : null}
                ref={isOpenNav === navList ? dropdownRefNav : null}
                className={`px-2.5 py-3.5 dropdown hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer ${activeButton === index ? 'bg-[#223344] text-[#ffff]' : ''}`}
                onClick={() => {
                  handleDropdownClick(navList);
                  handleClick(index);
                }}>
                <div className='flex items-center justify-center'>
                  {navList}
                  {/* {showDropDown === navList ? <IoMdArrowDropup /> : <IoMdArrowDropdown />} */}
                  {isOpenNav === navList ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </div>
              </div>
            ) : (
              <div
                className={`px-2.5 py-3.5 hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer ${activeButton === index ? 'bg-[#223344] text-[#ffff]' : ''}`}
                onClick={() => handleItemClick(index)}>
                {navList}
              </div>
            )}
            {/* {showDropDown === navList && ( */}
            {isOpenNav === navList && (
              <div
                // ref={showDropDown === navList ? dropdownRef : null}
                ref={isOpenNav === navList ? dropdownRefNav : null}
                className='absolute left-0 bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50 rounded-t-none'>
                {isLoading ? <div className='absolute bg-black w-96 h-5 z-50'></div> : renderDropdownContent(index)}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className='lg:hidden flex items-center justify-between text-[#a5a5a5] custom-page'>
        <button
          id='myButton'
          className='py-[9px] px-[10px] hover:bg-slate-800'
          onClick={() => setIsSideBarActive((prev) => !prev)}>
          <MdOutlineMenu size={30} />
        </button>
        <div className='flex items-center gap-2.5'>
          <div className='max-sm:flex hidden'>
            <SearchBar />
          </div>
          <div
            className='flex relative h-5'
            onClick={handdleBmClick}
            ref={dropdownRefBM}>
            <FaBookmark
              size={17}
              color={`${bookmarks.length > 0 ? 'green' : ''}`}
            />
            <span className='bg-red-700 rounded-full absolute text-sm px-1 transform -translate-y-full left-2.5 top-1.5 z-50'>
              {bookmarks?.length}

              <BookMarks
                isBookmarkDropdownOpen={isOpenBM}
                toggleDropdown={toggleDropdownBM}
              />
            </span>
          </div>

          {/* <HiOutlineDotsVertical size={17} /> */}
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <SideBar
          theLoaiData={theLoaiRTK}
          quocGiaData={quocGiaRTK}
          isSidebarActive={isSideBarActive}
          onCloseSideBar={handleCloseSideBar}
        />
      </div>

      {/* Utility Button */}
      <div className='hidden md:flex'>
        <UtilityButton />
      </div>
    </div>
  );
});
NavBar.displayName = 'NavBar';
export default NavBar;
