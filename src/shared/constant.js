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

// SEO ON PAGE
const currentyear = new Date().getFullYear();
export const titleHomePage = `Phim Mới | Phim hay | Xem phim nhanh | Xem phim online | Phim mới vietsub hay nhất ${currentyear}`;
export const metaDescriptionHome = `Xem phim mới miễn phí nhanh chất lượng cao. Xem Phim online Việt Sub, Thuyết minh, lồng tiếng chất lượng HD. Xem phim nhanh online chất lượng cao`;

export const titlePhimBo = `Phim bộ | Phim bộ hay tuyển chọn | Phim bộ mới nhất ${currentyear}`;
export const metaDescriptionBo = `Phim bộ mới nhất tuyển chọn chất lượng cao, phim bộ trọn bộ ${currentyear} vietsub cập nhật nhanh nhất. Phim bộ vietsub nhanh nhất`;

export const titlePhimLe = `Phim lẻ | Phim lẻ hay tuyển chọn | Phim lẻ mới nhất ${currentyear}`;
export const metaDescriptionLe = `Phim lẻ mới nhất tuyển chọn chất lượng cao, phim lẻ mới nhất ${currentyear} vietsub cập nhật nhanh nhất. Phim lẻ vietsub nhanh nhất`;

export const titleTvShows = `Tv Shows | Tv Shows hay tuyển chọn | Tv Shows mới nhất ${currentyear}`;
export const metaDescriptionShows = `Tv Shows mới nhất tuyển chọn chất lượng cao, Tv Shows mới nhất ${currentyear} vietsub cập nhật nhanh nhất. Tv Shows vietsub nhanh nhất`;

export const titleHoathinh = `Phim hoạt hình | Phim hoạt hình hay tuyển chọn | Phim hoạt hình mới nhất ${currentyear}`;
export const metaDescriptionHinh = `Phim hoạt hình mới nhất tuyển chọn chất lượng cao, Phim hoạt hình mới nhất ${currentyear} vietsub cập nhật nhanh nhất. Phim hoạt hình vietsub nhanh nhất`;

export const titleTheloai = (genre) => `Phim ${genre} | Phim ${genre} hay tuyển chọn | Phim ${genre} mới nhất ${currentyear}`;
export const metaDescriptionLoai = (kind) => `Phim ${kind} mới nhất tuyển chọn chất lượng cao, Phim ${kind}  mới nhất ${currentyear} vietsub cập nhật nhanh nhất. Phim ${kind} vietsub nhanh nhất`;

export const titleQuocgia = (country) => `Phim ${country} | Phim ${country} hay tuyển chọn | Phim ${country} mới nhất ${currentyear}`;
export const metaDescriptionGia = (countryDes) => `Phim ${countryDes} mới nhất tuyển chọn chất lượng cao, Phim ${countryDes}  mới nhất ${currentyear} vietsub cập nhật nhanh nhất. Phim ${countryDes} vietsub nhanh nhất`;
