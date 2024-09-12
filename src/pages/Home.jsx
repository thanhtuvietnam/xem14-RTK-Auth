import React, { useCallback } from 'react';
import { Footer, Header, NavBar, Title } from '../components/MainLayOut/index.js';
import { Outlet } from 'react-router-dom';
import { useActiveButton } from '../hooks/useActiveButton.js';
import { navLists } from '../shared/constant.js';

const Home = React.memo(() => {
  const [activeButton, handleClick] = useActiveButton(navLists);
  const handleLogoClick = useCallback(() => {
    if (activeButton !== 0) {
      handleClick(0); // Gọi handleClick để cập nhật activeButton
    }
  }, [handleClick, activeButton]);
  return (
    <div className='bg-[#222d38] overflow-x-hidden'>
      <Title value='Cuồng Phim | Xem phim thỏa thích' />
      <Header onLogoClick={handleLogoClick} />
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
});
Home.displayName = 'Home';
export default Home;
