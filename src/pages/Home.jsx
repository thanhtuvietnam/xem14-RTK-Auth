import { logEvent } from "firebase/analytics";
import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Footer,
  Header,
  NavBar,
  Title,
} from "../components/MainLayOut/index.js";
import { useActiveButton } from "../hooks/useActiveButton.js";
import { navLists } from "../shared/constant.js";
import { analytics } from "../shared/firebase.js";

const Home = React.memo(() => {
  const [activeButton, handleClick] = useActiveButton(navLists);
  const handleLogoClick = useCallback(() => {
    if (activeButton !== 0) {
      handleClick(0); // Gọi handleClick để cập nhật activeButton
    }
  }, [handleClick, activeButton]);

  const location = useLocation(); // Sử dụng useLocation để theo dõi đường dẫn
  useEffect(() => {
    const trackPageView = (page) => {
      logEvent(analytics, "page_view", {
        page_location: window.location.href,
        page_title: document.title,
        page_path: page,
      });
    };

    // Theo dõi trang hiện tại
    trackPageView(location.pathname);

    // Theo dõi sự thay đổi đường dẫn
  }, [location]); // Chạy lại khi location thay đổi

  return (
    <div className="bg-[#222d38]  overflow-x-hidden">
      <Title value="Cuồng Phim | Xem phim thỏa thích" />
      <Header onLogoClick={handleLogoClick} />
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
});
Home.displayName = "Home";
export default Home;
