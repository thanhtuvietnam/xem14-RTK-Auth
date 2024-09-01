// import { MovieCategory } from '../components/Common';

// const PhimLe = () => {
//   return (
//     <>
//       <MovieCategory
//         categoryBreadCrumb='Phim Lẻ'
//         categorySlug='phim-le'
//         sectionTitle='Phim Lẻ'
//         hiddenOther={`hidden`}
//       />
//     </>
//   );
// };
// export default PhimLe;

import React from 'react';
import { MovieCategory } from '../components/Common';

const PhimLe = () => (
  <MovieCategory
    categoryBreadCrumb='Phim Lẻ'
    categorySlug='phim-le'
    sectionTitle='Phim Lẻ'
    hiddenOther='hidden'
  />
);

export default PhimLe;