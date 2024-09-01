import { Footer, Header } from '../components/MainLayOut/index.js';
import { NavBar, SideBar, Title } from '../components/MainLayOut/index.js';
import { Outlet } from 'react-router-dom';
import { useActiveButton } from '../hooks/useActiveButton.js';
import { navLists } from '../shared/constant.js';

const Home = () => {
  const [activeButton, handleClick] = useActiveButton(navLists);
  const handleLogoClick = () => {
    handleClick(0); // Gọi handleClick để cập nhật activeButton
  };
  return (
    <div className='bg-[#222d38]'>
      <Title value='Cuồng Phim | Xem phim thỏa thích' />
      <Header onLogoClick={handleLogoClick} />
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
