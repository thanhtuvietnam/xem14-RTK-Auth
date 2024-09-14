import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { RightBarCar } from '../MainLayOut/index.js';
import { Link, useNavigate } from 'react-router-dom';
import { icons } from '../../shared/icon';
import { RingLoader } from 'react-spinners';
import { IMG_URL } from '../../shared/constant.js';
import Tooltip from '@mui/joy/Tooltip';
import { useMediaQuery } from '@mui/material';
import { useGetSearchQuery, useGetHomeQuery } from '../../store/apiSlice/homeApi.slice.js';
import { useAppdispatch, useAppSelector } from '../../store/hook.js';
import { clearSearchKey, setCurrentPage, setPage, setSearchKey, setTotalItems } from '../../store/searchSlice/searchSlice.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { clearSlug, clearType } from '../../store/mainSlice/SubmenuSlice/submenuSlice.js';
import { setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice.js';
import useClickOutSide from '../../hooks/useClickOutSide.js';

const { IoIosSearch } = icons;

const SearchBar = React.memo(() => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const dispatch = useAppdispatch();
  const totalItemNumbers = useAppSelector((state) => state.search.totalItems);
  const searchTerm = useAppSelector((state) => state.search.searchKey);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const page = useAppSelector((state) => state.search.page);
  const typeRTK = useAppSelector((state) => state.submenu.type);
  const slugRTK = useAppSelector((state) => state.submenu.slug);
  const currentPageRTK = useAppSelector((state) => state.search.currentPage);

  const activeOther = useAppSelector((state) => state.loadingState.activeOther);

  const { data: state, isLoading, error, isFetching } = useGetSearchQuery({ searchTerm: debouncedSearchTerm, page }, { skip: !debouncedSearchTerm });

  const totalItemsRTK = useAppSelector((state) => state.search.totalItems);
  const { data: homeRes } = useGetHomeQuery(null, { skip: totalItemsRTK !== 0 });
  useEffect(() => {
    if (homeRes?.data?.params?.pagination?.totalItems) {
      dispatch(setTotalItems(homeRes.data.params.pagination.totalItems));
    }
  }, [homeRes, dispatch]);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { isOpen, toggleDropdown, closeDropdown, dropdownRef } = useClickOutSide([inputRef], 'click');

  const handleChange = useCallback(
    (e) => {
      dispatch(setSearchKey(e.target.value));
      if (activeOther !== null) {
        dispatch(setActiveOther(null));
      }
      if (currentPageRTK !== 1 || page !== 1) {
        dispatch(setCurrentPage(1));
        dispatch(setPage(1));
      }
      if (typeRTK !== '' || slugRTK !== '') {
        dispatch(clearType());
        dispatch(clearSlug());
      }
      toggleDropdown(true);
    },
    [dispatch, activeOther, currentPageRTK, page, typeRTK, slugRTK, toggleDropdown]
  );

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        navigate(`/tim-kiem?keyword=${searchTerm}`);
        closeDropdown();
      }
    },
    [searchTerm, navigate, closeDropdown]
  );

  const searchResults = useMemo(() => {
    return state?.data?.items?.map((result) => (
      <Link
        to={`/chitiet-phim/${result?.slug}`}
        key={result._id}>
        <RightBarCar
          setShowDropdown={closeDropdown}
          thumbImage={`${IMG_URL}/${result?.thumb_url}`}
          year={result?.year}
          movieName={result?.name}
          originName={result?.origin_name}
        />
      </Link>
    ));
  }, [state?.data?.items, toggleDropdown]);

  return (
    <div className='search-container sm:w-[300px] md:w-[350px]'>
      <form
        onSubmit={handleSearchSubmit}
        className='items-center flex'
        ref={dropdownRef}>
        <Tooltip
          title={`enter hoặc nhấn 🔍 `}
          sx={{ color: 'black', textTransform: 'capitalize' }}
          placement={isSmallScreen ? 'top-end' : 'bottom-end'}
          arrow
          size='sm'
          color='warning'
          open={isInputFocused}
          variant='soft'>
          <input
            ref={inputRef}
            className='text-[13px] border-[1px] border-[#ffbb35] truncate rounded-l-md rounded-r-none'
            type='text'
            value={searchTerm}
            placeholder={`Search with ${totalItemNumbers || 0} movie`}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </Tooltip>
        {isFetching && (
          <div className='loading'>
            <RingLoader
              loading={isFetching}
              color='white'
              size={30}
              speedMultiplier={2}
            />
          </div>
        )}
        <div>
          <button className='hover:bg-black border-[1.5px] border-[#ff8a00] p-[5.5px] rounded-r-md'>
            <IoIosSearch
              size={25}
              color='#ff8a00'
            />
          </button>
        </div>
      </form>
      {isOpen && (
        <div>
          <ul
            ref={dropdownRef}
            className='scroll-bar-custom border-[1px] border-[#684808] flex flex-col max-h-[300px] sm:max-h-[400px] md:max-h-[470px] lg:max-h-[550px] xl:max-h-[650px]'>
            <div className='px-2 md:px-4 py-2 text-sm font-medium text-gray-400 capitalize sm:px-6 sm:text-base md:text-lg'>
              <p className='truncate'>
                Bạn đang tìm: <span className='text-[#d50ac1]'>{searchTerm}</span>
              </p>
            </div>
            {searchResults}
          </ul>
        </div>
      )}
    </div>
  );
});
SearchBar.displayName = 'SearchBar';
export default SearchBar;
