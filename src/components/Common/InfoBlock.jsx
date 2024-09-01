// import React from 'react';
// import { icons } from '../../shared/icon';

// const { FaCalendarAlt, FaClock } = icons;

// const InfoBlock = ({ title, originalName, episodeCurrent, qua, lang, actor, director, category, country, year, time, view, imdbScore }) => {
//   return (
//     <div>
//       <div className='text-[#a5a5a5] text-[12.5px] leading-[20px] flex flex-col gap-1.5'>
//         <h1 className='text-[20px] text-[#cacaca] font-bold'>{title}</h1>
//         <p className='text-[13px]'>{originalName}</p>
//         <div className='flex items-center gap-3'>
//           <span className='flex items-center gap-1'>
//             <FaCalendarAlt />:<span className='text-[#82b0da]'>{year}</span>
//           </span>
//           <span className='flex items-center gap-1'>
//             <FaClock />:<span>{time}</span>
//           </span>
//           <span className='flex items-center gap-1 text-yellow-300'>
//             <i className='fa-brands fa-imdb text-xl'></i>
//             {imdbScore}
//           </span>
//         </div>
//         <p>
//           Đang phát: <span className='cardInfo-trailer text-white py-1 px-1 rounded-sm font-medium'>{episodeCurrent}</span>
//         </p>
//         <p>Tập mới nhất:</p>
//         <p>
//           Quốc gia: <span className='text-[#82b0da]'>{country?.join(', ')}</span>
//         </p>
//         <p className='text-[#cacaca] font-bold'>
//           Chất lượng:{' '}
//           <span className='cardInfo-trailer text-white py-1 px-1 rounded-sm font-medium'>
//             {lang}+{qua}
//           </span>
//         </p>
//         <p>
//           Đạo diễn: <span className='text-[#82b0da]'>{director}</span>
//         </p>
//         <p>
//           Diễn Viên: <span className='text-[#82b0da]'>{actor}</span>
//         </p>
//         <p>
//           Thể loại: <span className='text-[#82b0da]'>{category?.join(', ')}</span>
//         </p>
//         <p>
//           Lượt xem: <span className='text-[#82b0da]'>{view}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default InfoBlock;


import React from 'react';
import { icons } from '../../shared/icon';

const { FaCalendarAlt, FaClock } = icons;

const InfoBlock = React.memo(({ 
  title, 
  originalName, 
  episodeCurrent, 
  qua, 
  lang, 
  actor, 
  director, 
  category, 
  country, 
  year, 
  time, 
  view, 
  imdbScore 
}) => {
  return (
    <div className='text-[#a5a5a5] text-[12.5px] leading-[20px] flex flex-col gap-1.5'>
      <h1 className='text-[20px] text-[#cacaca] font-bold'>{title}</h1>
      <p className='text-[13px]'>{originalName}</p>
      <div className='flex items-center gap-3'>
        <span className='flex items-center gap-1'>
          <FaCalendarAlt />:<span className='text-[#82b0da]'>{year}</span>
        </span>
        <span className='flex items-center gap-1'>
          <FaClock />:<span>{time}</span>
        </span>
        <span className='flex items-center gap-1 text-yellow-300'>
          <i className='fa-brands fa-imdb text-xl'></i>
          {imdbScore}
        </span>
      </div>
      <p>
        Đang phát: <span className='cardInfo-trailer text-white py-1 px-1 rounded-sm font-medium'>{episodeCurrent}</span>
      </p>
      <p>Tập mới nhất:</p>
      <p>
        Quốc gia: <span className='text-[#82b0da]'>{country?.join(', ')}</span>
      </p>
      <p className='text-[#cacaca] font-bold'>
        Chất lượng:{' '}
        <span className='cardInfo-trailer text-white py-1 px-1 rounded-sm font-medium'>
          {lang}+{qua}
        </span>
      </p>
      <p>
        Đạo diễn: <span className='text-[#82b0da]'>{director}</span>
      </p>
      <p>
        Diễn Viên: <span className='text-[#82b0da]'>{actor}</span>
      </p>
      <p>
        Thể loại: <span className='text-[#82b0da]'>{category?.join(', ')}</span>
      </p>
      <p>
        Lượt xem: <span className='text-[#82b0da]'>{view}</span>
      </p>
    </div>
  );
});

export default InfoBlock;