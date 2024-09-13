import { nanoid } from '@reduxjs/toolkit';

export const path = {
  HOME: '/',
  HOMEPAGE: '/',
  ERROR: '/error',
  PHIMLE: '/phim-le',
  PHIMBO: '/phim-bo',
  // SAPCHIEU: '/sap-chieu',
  PHIM18CONG: '/phim-18',
  // MOVIEINFO: '/:loai/chitiet-phim/:slug/',
  MOVIEINFO: '/chitiet-phim/:slug/',
  TVSHOWS: '/tv-shows',
  HOATHINH: '/hoat-hinh',
  XEMPHIM: '/xem-phim/:slug',
  THELOAI: '/the-loai/:slug',
  QUOCGIA: '/quoc-gia/:slug',
  SORT: '/sort/:movieSort/',
  SEARCHRESULTS: '/tim-kiem',
};
export const navLists = ['TRANG CHỦ', 'PHIM BỘ', 'PHIM LẺ', 'TV SHOWS', 'HOẠT HÌNH', 'THỂ LOẠI', 'QUỐC GIA'];

export const dropdownItems = {
  5: ['Hành Động', 'Tình Cảm', 'Hài Hước', 'Cổ Trang', 'Tâm Lý', 'Hình Sự', 'Chiến Tranh', 'Thể Thao', 'Võ Thuật', 'Viễn Tưởng', 'Phiêu Lưu', 'Khoa Học', 'Kinh Dị', 'Âm Nhạc', 'Thần Thoại', 'Tài Liệu', 'Gia Đình', 'Chính kịch', 'Bí ẩn', 'Học Đường', 'Kinh Điển', 'Phim 18+'],
  6: ['Trung Quốc', 'Hàn Quốc', 'Nhật Bản', 'Thái Lan', 'Âu Mỹ', 'Đài Loan', 'Hồng Kông', 'Ấn Độ', 'Anh', 'Pháp', 'Canada', 'Quốc Gia Khác', 'Đức', 'Tây Ban Nha', 'Thổ Nhĩ Kỳ', 'Hà Lan', 'Indonesia', 'Nga', 'Mexico', 'Ba lan', 'Úc', 'Thụy Điển', 'Malaysia', 'Brazil', 'Philippines', 'Bồ Đào Nha', 'Ý', 'Đan Mạch', 'UAE', 'Na Uy', 'Thụy Sĩ', 'Châu Phi', 'Nam Phi', 'Ukraina', 'Ả Rập Xê Út', 'Bỉ', 'Ireland', 'Colombia', 'Phần Lan', 'Việt Nam', 'Chile', 'Hy Lạp', 'Nigeria', 'Argentina', 'Singapore'],
};

export const noteLine = `– CHÚ Ý: NẾU KHÔNG TẢI ĐƯỢC NỘI DUNG,HÃY BẤM F5 HOẶC BẤM TẢI LẠI TRANG 1 HOẶC 2 LẦN BẠN NHÉ .`;
export const noteMovieWatch = `– Chú ý: Yêu Cầu Phim Tại Đây:`;
export const noteMovieWatch2 = `– Chú ý: Hãy bình luận khen chê báo lỗi bên dưới nhé.`;
export const movieSort = ['Phim Mới', 'Phim Bộ', 'Phim Lẻ', 'TV Shows', 'Hoạt Hình', 'Phim Vietsub', 'Phim Thuyết Minh', 'Phim Lồng Tiếng', 'Phim Bộ Đang Chiếu', 'Phim Trọn Bộ', 'Phim Sắp Chiếu', 'Subteam'];

export const timeSort = [
  { id: nanoid(), name: 'Thời gian đăng', sortfield: '_id' },
  { id: nanoid(), name: 'Năm sản xuất', sortfield: 'year' },
  { id: nanoid(), name: 'Thời gian cập nhật', sortfield: 'modified.time' },
];
// export const API_URL = 'https://phimapi.com/v1/api';
export const API_URL = 'https://ophim1.com/v1/api/';
// export const API_URL = "https://api.themoviedb.org/3";
// export const IMG_URL = 'https://phimimg.com/';
export const IMG_URL = 'https://img.ophim.live/uploads/movies';
