// import React, { useState, useEffect } from 'react';

// import { MovieCategory } from '../components/Common';
// import { useLocation } from 'react-router-dom';
// import { useGetCategoriesQuery } from '../store/apiSlice/homeApi.slice';
// import { useAppdispatch, useAppSelector } from '../store/hook';
// import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
// import { setError } from '../store/mainSlice/LoadingSlice/loadingSlice';
// import { addSlug, addType } from '../store/mainSlice/SubmenuSlice/submenuSlice';

// const Theloai = () => {
//   const selectedSlug = useAppSelector((state) => state.submenu.slug);
//   const selectedType = useAppSelector((state) => state.submenu.type);

//   const location = useLocation();
//   const dispatch = useAppdispatch();
//   useEffect(() => {
//     const { slug, type } = location.state || {};
//     if (slug && type) {
//       dispatch(addType(type));
//       dispatch(addSlug(slug));
//     }
//   }, [location.state]);

//   const page = useAppSelector((state) => state.search.page);
//   // const page = 5

//   const { data: genreRes, isLoading, isFetching, refetch, isError, error } = useGetCategoriesQuery({ category: selectedType, genreName: selectedSlug, page }, { skip: !selectedSlug || !selectedType });

//   const titlePage = genreRes?.data?.titlePage;
//   const totalPages = genreRes?.data?.params?.pagination?.totalItems;
//   const dataResults = genreRes?.data?.items;
//   useEffect(() => {
//     if (isError && error) {
//       console.log(error);
//       dispatch(setError(true));
//     }
//   }, [isError, error]);
//   return (
//     <div className='custom-page min-h-screen px-0 bg-[#151d25] '>
//       {isFetching ? (
//         <SkeletonForAll />
//       ) : (
//         <MovieCategory
//           OthersBreadCrumb={titlePage}
//           categoryBreadCrumb={'Thể Loại'}
//           dataResults={dataResults}
//           sectionTitle={`Thể loại ${titlePage}`}
//           totalItemsSearch={totalPages}
//         />
//       )}
//     </div>
//   );
// };

// export default Theloai;



import React from 'react';
import { MovieCategory } from '../components/Common';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { useCategoryPage } from '../hooks/useCategoryPage';

const QuocGia = () => {
  const { titlePage, totalPages, dataResults, isFetching } = useCategoryPage();

  return (
    <div className='custom-page min-h-screen px-0 bg-[#151d25]'>
      {isFetching ? (
        <SkeletonForAll />
      ) : (
        <MovieCategory
          OthersBreadCrumb={titlePage}
          categoryBreadCrumb={'Quốc gia'}
          totalItemsSearch={totalPages}
          sectionTitle={`Quốc gia ${titlePage}`}
          dataResults={dataResults}
        />
      )}
    </div>
  );
};

export default QuocGia;