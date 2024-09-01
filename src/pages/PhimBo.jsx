// import { MovieCategory } from '../components/Common';
// const PhimBo = () => {
//   return (
//     <>
//       <MovieCategory
//         categoryBreadCrumb='Phim Bộ'
//         categorySlug='phim-bo'
//         sectionTitle='Phim Bộ'
//         hiddenOther={`hidden`}
//       />
//     </>
//   );
// };

// export default PhimBo;


import React from 'react';
import { MovieCategory } from '../components/Common';

const PhimBo = () => (
  <MovieCategory
    categoryBreadCrumb='Phim Bộ'
    categorySlug='phim-bo'
    sectionTitle='Phim Bộ'
    hiddenOther='hidden'
  />
);

export default PhimBo;