import { navLists } from '../../shared/constant';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { convertToSlug } from '../../shared/utils';

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  const navListsSlug = useMemo(() => navLists.map(convertToSlug), []);
  return (
    <footer className='bg-[#151d25] text-[#8f8f8f] py-8 border-t border-[#435153a8]'>
      {/* <div className='container mx-auto px-4'> */}
      <div className='container mx-auto px-4'>
        {/* Đặt padding là 0 */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h5 className='text-lg md:text-xl font-bold mb-2'>Cuồng Phim</h5>
            <p className='text-sm md:text-base'>Tất cả nội dung của trang web này được thu thập từ các trang web video chính thống trên Internet, và không cung cấp phát trực tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông báo cho chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời, cảm ơn sự hợp tác của bạn!</p>
          </div>
          <div>
            <h5 className='text-lg md:text-xl font-bold mb-2'>SẢN PHẨM</h5>
            <ul className='list-none flex flex-wrap gap-2 leading-2'>
              {navLists &&
                navLists.map((navList, index) => (
                  <li key={index}>
                    <Link
                      to={`/${navListsSlug[index]}`}
                      className='text-reset underline text-sm md:text-base'>
                      {navList}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h5 className='text-lg md:text-xl font-bold mb-2'>LIÊN HỆ</h5>
            <p className='text-sm md:text-base'>
              Địa chỉ: 123 Đường Phim, Thành phố, Việt Nam
              <br />
              Email: info@cuongphim.com
              <br />
              Điện thoại: +84 123 456 789
              <br />
              Fax: +84 123 456 790
            </p>
          </div>
        </div>
        <div className='text-center mt-4'>
          <small className='text-sm md:text-base'>© {getCurrentYear} Copyright: CuongPhim.vercel.app</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
