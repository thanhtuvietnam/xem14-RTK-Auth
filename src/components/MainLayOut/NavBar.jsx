import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { SearchBar, SideBar } from "../MainLayOut/index.js";
import { icons } from "../../shared/icon.js";
import { useNavigate } from "react-router-dom";
import { navLists } from "../../shared/constant.js";
import { convertToSlug } from "../../shared/utils.js";
import { useActiveButton } from "../../hooks/useActiveButton.js";
import UtilityButton from "../Common/UtilityButton.jsx";

import { useAppdispatch, useAppSelector } from "../../store/hook.js";
import {
  clearSearchKey,
  setCurrentPage,
  setPage,
} from "../../store/searchSlice/searchSlice.js";

import { useGetCategoriesQuery } from "../../store/apiSlice/homeApi.slice.js";
import {
  addQuocGia,
  addTheLoai,
  clearSlug,
  clearType,
} from "../../store/mainSlice/SubmenuSlice/submenuSlice.js";
import { setActiveOther } from "../../store/mainSlice/LoadingSlice/loadingSlice.js";
import useClickOutSide from "../../hooks/useClickOutSide.js";
import BookMarks from "../Common/BookMarks.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const {
  MdOutlineMenu,
  FaBookmark,
  HiOutlineDotsVertical,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} = icons;

const NavBar = React.memo(() => {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [activeButton, handleClick] = useActiveButton(navLists);

  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const {
    isOpen: isOpenNav,
    toggleDropdown: toggleDropdownNav,
    dropdownRef: dropdownRefNav,
    closeDropdown: closeDropdownNav,
  } = useClickOutSide([navbarRef], "mousedown");
  const {
    isOpen: isOpenBM,
    toggleDropdown: toggleDropdownBM,
    dropdownRef: dropdownRefBM,
    closeDropdown: closeDropdownBM,
  } = useClickOutSide([], "mousedown");

  const { loading, error, success, userInfo } = useAppSelector(
    (state) => state.auth,
  );
  const { data: theLoaiRes, isLoading: isLoadingTheLoai } =
    useGetCategoriesQuery({ category: "the-loai" });
  const { data: quocGiaRes, isLoading: isLoadingQuocGia } =
    useGetCategoriesQuery({ category: "quoc-gia" });

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

    if (searchKeyRTK !== "") {
      dispatch(clearSearchKey());
    }
  }, [currentPageRTK, pageRTK, searchKeyRTK, dispatch]);

  const handleItemClick = useCallback(
    (index) => {
      dispatch(setActiveOther(null));
      handleClick(index);
      navigate(`/${navListsSlug[index]}`);
      handleRTK();
      if (typeRTK !== "" || slugRTK !== "") {
        dispatch(clearType());
        dispatch(clearSlug());
      }
      closeDropdownNav();
    },
    [
      dispatch,
      handleClick,
      handleRTK,
      navigate,
      navListsSlug,
      slugRTK,
      typeRTK,
      closeDropdownNav,
    ],
  );

  const handleDropdownClick = useCallback(
    (item) => {
      toggleDropdownNav((prev) => (prev === item ? null : item));
    },
    [toggleDropdownNav],
  );
  const handdleBmClick = useCallback(() => {
    if (searchKeyRTK !== "") {
      dispatch(clearSearchKey());
    }
    if (userInfo) {
      toggleDropdownBM((e) => !e);
    } else {
      toast.info(`Vui lòng đăng nhập để thực hiện chức năng này`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [dispatch, toggleDropdownBM, userInfo, searchKeyRTK]);

  const handleCloseSideBar = useCallback(() => {
    setIsSideBarActive(false);
    handleRTK();
  }, [handleRTK]);

  const handleCategoryClick = useCallback(
    (slug, genre, type) => {
      dispatch(setActiveOther(genre));
      navigate(`/${type}/${slug}`, { state: { slug, type } });
      handleRTK();
      closeDropdownNav();
    },
    [dispatch, navigate, handleRTK, closeDropdownNav],
  );

  const renderDropdownContent = useCallback(
    (index) => {
      const data = index === 5 ? theLoaiRTK : quocGiaRTK;
      const type = index === 5 ? "the-loai" : "quoc-gia";

      return (
        <div className="grid grid-cols-3">
          {data &&
            data.map((item) => (
              <div
                onClick={() => handleCategoryClick(item.slug, item.name, type)}
                key={item._id}
                className={`p-2 truncate cursor-pointer text-[#989898] hover:text-white hover:border-r-2 rounded-r-md border-[#3ddbf0] ${activeOther === item.name ? "bg-[#000000] text-[#e2702e] border-r-2 border-[#e2702e]" : ""}`}
              >
                {item.name}
              </div>
            ))}
        </div>
      );
    },
    [theLoaiRTK, quocGiaRTK, activeOther, handleCategoryClick],
  );

  return (
    <div className="bg-[#12171b] shadow-custom">
      {/* Desktop Navigation */}
      <ul
        ref={navbarRef}
        className="text-[#989898] hidden lg:flex custom-page list-none items-center justify-start text-[15px] font-normal transition duration-300"
      >
        {navLists.map((navList, index) => (
          <li
            key={index}
            className="relative border-r-[0.5px] first:border-l-[0.5px] border-[#2e353f]"
          >
            {navList === "THỂ LOẠI" || navList === "QUỐC GIA" ? (
              <div
                ref={isOpenNav === navList ? dropdownRefNav : null}
                className={`px-2.5 py-3.5 dropdown hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer ${activeButton === index ? "bg-[#223344] text-[#ffff]" : ""}`}
                onClick={() => {
                  handleDropdownClick(navList);
                  handleClick(index);
                }}
              >
                <div className="flex items-center justify-center">
                  {navList}
                  {isOpenNav === navList ? (
                    <IoMdArrowDropup />
                  ) : (
                    <IoMdArrowDropdown />
                  )}
                </div>
              </div>
            ) : (
              <div
                className={`px-2.5 py-3.5 hover:text-[#ff8a00] hover:bg-[#000000] cursor-pointer ${activeButton === index ? "bg-[#223344] text-[#ffff]" : ""}`}
                onClick={() => handleItemClick(index)}
              >
                {navList}
              </div>
            )}
            {isOpenNav === navList && (
              <div
                ref={isOpenNav === navList ? dropdownRefNav : null}
                className="absolute left-0 bg-[#1f3d58] shadow-custom py-2 rounded-lg w-96 z-50 rounded-t-none"
              >
                {isLoading ? (
                  <div className="absolute bg-black w-96 h-5 z-50"></div>
                ) : (
                  renderDropdownContent(index)
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between text-[#a5a5a5] custom-page">
        <button
          id="myButton"
          className="py-[9px] px-[10px] hover:bg-slate-800"
          onClick={() => setIsSideBarActive((prev) => !prev)}
        >
          <MdOutlineMenu size={30} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="max-sm:flex hidden">
            <SearchBar />
          </div>
          <div
            className={`flex relative h-5 mr-1.5`}
            onClick={handdleBmClick}
            ref={dropdownRefBM}
          >
            <FaBookmark
              className={`cursor-pointer animate-bookmarkshake`}
              size={20}
              color={`${bookmarks.length > 0 ? "green" : ""}`}
            />
            <span className="bg-red-700 rounded-full absolute text-sm px-1 transform -translate-y-full left-2.5 top-1.5 z-50">
              {bookmarks?.length}

              <BookMarks
                isBookmarkDropdownOpen={isOpenBM}
                toggleDropdown={toggleDropdownBM}
              />
            </span>
          </div>
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
      <div className="hidden md:flex">
        <UtilityButton />
      </div>
    </div>
  );
});
NavBar.displayName = "NavBar";
export default NavBar;
