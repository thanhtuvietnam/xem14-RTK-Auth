import React, { useState, useCallback, useMemo } from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { convertToSlug } from '../../shared/utils';
import { HomeOutlined, VideoCameraOutlined, PlaySquareOutlined, SmileOutlined, TrophyOutlined, GlobalOutlined, AppstoreOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { IoLogoOctocat } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './index.css';
import { navLists } from '../../shared/constant';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import { clearSearchKey, setCurrentPage, setPage } from '../../store/searchSlice/searchSlice';
import { clearSlug, clearType } from '../../store/mainSlice/SubmenuSlice/submenuSlice';

const icons = [<HomeOutlined />, <VideoCameraOutlined />, <PlaySquareOutlined />, <TrophyOutlined />, <IoLogoOctocat />, <AppstoreOutlined />, <GlobalOutlined />, <SmileOutlined />, <ClockCircleOutlined />, <CloseOutlined />];

const SideBar = React.memo(({ onCloseSideBar, isSidebarActive, theLoaiData, quocGiaData }) => {
  const [openKeys, setOpenKeys] = useState([]);

  const typeRTK = useAppSelector((state) => state.submenu.type);
  const slugRTK = useAppSelector((state) => state.submenu.slug);
  const searchKeyRTK = useAppSelector((state) => state.search.searchKey);
  const currentPageRTK = useAppSelector((state) => state.search.currentPage);
  const pageRTK = useAppSelector((state) => state.search.page);
  const dispatch = useAppdispatch();
  const navigate = useNavigate();

  const handleRTK = useCallback(() => {
    if (searchKeyRTK !== '') {
      dispatch(clearSearchKey());
    }
    if (currentPageRTK !== 1 || pageRTK !== 1) {
      dispatch(setCurrentPage(1));
      dispatch(setPage(1));
    }
  }, [dispatch, searchKeyRTK, currentPageRTK, pageRTK]);

  const handleCategoryClick = useCallback(
    (slug, type) => {
      setOpenKeys([]);
      onCloseSideBar();
      navigate(`/${type}/${slug}`, { state: { slug, type } });
      handleRTK();
    },
    [navigate, onCloseSideBar, handleRTK]
  );

  const handleCloseSideBar = useCallback(() => {
    setOpenKeys([]);
    onCloseSideBar();
    if (typeRTK !== '' || slugRTK !== '') {
      dispatch(clearType());
      dispatch(clearSlug());
    }
  }, [dispatch, onCloseSideBar, typeRTK, slugRTK]);

  const handleOverlayClick = useCallback(() => {
    setOpenKeys([]);
    onCloseSideBar();
  }, [onCloseSideBar]);

  const menuItems = useMemo(
    () =>
      navLists.map((item, index) => {
        if (item === 'THỂ LOẠI') {
          return {
            key: item,
            icon: icons[index],
            label: item,
            children: theLoaiData?.map((theLoai) => ({
              key: theLoai.name,
              label: <div onClick={() => handleCategoryClick(theLoai?.slug, 'the-loai')}>{theLoai.name}</div>,
            })),
          };
        } else if (item === 'QUỐC GIA') {
          return {
            key: item,
            icon: icons[index],
            label: item,
            children: quocGiaData?.map((quocGia) => ({
              key: quocGia.name,
              label: <div onClick={() => handleCategoryClick(quocGia?.slug, 'quoc-gia')}>{quocGia.name}</div>,
            })),
          };
        } else {
          return {
            key: item,
            icon: icons[index],
            label: (
              <Link
                to={`/${convertToSlug(item)}`}
                onClick={handleCloseSideBar}>
                {item}
              </Link>
            ),
          };
        }
      }),
    [theLoaiData, quocGiaData, handleCategoryClick, handleCloseSideBar]
  );

  return (
    <div>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <div className='relative custom-bg rounded-tr-lg'>
          <div className='flex items-center justify-between'>
            <div className='logo'>
              <LazyLoadImage
                src='/logo.jpg'
                alt='Logo'
              />
            </div>
            <div className='mr-5'>
              <span className='logo-text'>
                Cuồng <span className='text-primary'>Phim</span>
              </span>
            </div>
            <button
              onClick={handleCloseSideBar}
              className='text-black text-xl mr-1.5 rounded-full px-1 x-button'>
              <CloseOutlined />
            </button>
          </div>
        </div>
        <Menu
          className='overflow-y-scroll scroll-bar-custom'
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['TRANG CHỦ']}
          items={menuItems}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        />
      </div>
      <div
        onClick={handleOverlayClick}
        className={`bg-black/60 z-[5] fixed top-0 left-0 w-full h-full visible lg:invisible md:opacity-0 transition duration-300 ${isSidebarActive ? 'opacity-100 visible' : 'opacity-0 invisible'} media-screen`}
      />
    </div>
  );
});
SideBar.displayName = 'SideBar';
export default SideBar;
