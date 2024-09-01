// import React, { useState, useEffect } from 'react';
// import { MovieCategory } from '../components/Common';
// import { useLocation } from 'react-router-dom';
// import { useAppdispatch, useAppSelector } from '../store/hook';
// import { useGetCategoriesQuery } from '../store/apiSlice/homeApi.slice';
// import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
// import { setError } from '../store/mainSlice/LoadingSlice/loadingSlice';
// import { addSlug, addType } from '../store/mainSlice/SubmenuSlice/submenuSlice';

// const QuocGia = () => {
//   const selectedSlug = useAppSelector((state) => state.submenu.slug);
//   const selectedType = useAppSelector((state) => state.submenu.type);

//   const location = useLocation();
//   const dispatch = useAppdispatch();
//   useEffect(() => {
//     // dispatch(clearType());
//     // dispatch(clearSlug());
//     const { slug, type } = location.state || {};
//     if (slug && type) {
//       dispatch(addType(type));
//       dispatch(addSlug(slug));
//       // setSelectedSlug(slug);
//       // setSelectedType(type);
//     }
//   }, [location.state]);

//   const page = useAppSelector((state) => state.search.page);

//   const { data: quocgiaRes, isLoading, isFetching, refetch, isError, error } = useGetCategoriesQuery({ category: selectedType, genreName: selectedSlug, page }, { skip: !selectedSlug || !selectedType });

//   const titlePage = quocgiaRes?.data?.titlePage;

//   const totalPages = quocgiaRes?.data?.params?.pagination?.totalItems;
//   const dataResults = quocgiaRes?.data?.items;

//   useEffect(() => {
//     if (isError && error) {
//       console.log(error);
//       dispatch(setError(true));
//     }
//   }, [isError, error]);
//   return (
//     <div className='custom-page min-h-screen px-0 bg-[#151d25]'>
//       {isFetching ? (
//         <SkeletonForAll />
//       ) : (
//         <MovieCategory
//           OthersBreadCrumb={titlePage}
//           categoryBreadCrumb={'Quốc gia'}
//           totalItemsSearch={totalPages}
//           sectionTitle={`Quốc gia ${titlePage}`}
//           dataResults={dataResults}
//         />
//       )}
//     </div>
//   );
// };

// export default QuocGia;



import React from 'react';
import { MovieCategory } from '../components/Common';
import SkeletonForAll from '../components/Skeleton/SkeletonForAll/SkeletonForAll';
import { useCategoryPage } from '../hooks/useCategoryPage';

const Theloai = () => {
  const { titlePage, totalPages, dataResults, isFetching } = useCategoryPage();

  return (
    <div className='custom-page min-h-screen px-0 bg-[#151d25]'>
      {isFetching ? (
        <SkeletonForAll />
      ) : (
        <MovieCategory
          OthersBreadCrumb={titlePage}
          categoryBreadCrumb={'Thể Loại'}
          dataResults={dataResults}
          sectionTitle={`Thể loại ${titlePage}`}
          totalItemsSearch={totalPages}
        />
      )}
    </div>
  );
};

export default Theloai;