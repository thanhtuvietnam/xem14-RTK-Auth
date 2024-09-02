// import * as React from 'react';
// import HomeIcon from '@mui/icons-material/Home';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
// import GrainIcon from '@mui/icons-material/Grain';
// import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
// import { Link, useNavigate } from 'react-router-dom';
// import { useActiveButton } from '../../hooks/useActiveButton';
// import { navLists } from '../../shared/constant';
// import { useAppdispatch, useAppSelector } from '../../store/hook';
// import { setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice';

// export default function BreadCrumb({ categoryBreadCrumb, PageBreadCrumb, hidden, hiddenOther, OthersBreadCrumb }) {
//   const [activeButton, handleClick] = useActiveButton(navLists);
//   const navigate = useNavigate();
//   const activeOther = useAppSelector((state) => state.loadingState.activeOther);
//   const dispatch = useAppdispatch()
//   function handleClickHome(event) {
//     event.preventDefault();
//     if (activeOther !== null) {
//       dispatch(setActiveOther(null));
//     }
//     if (activeButton !== null) {
//       handleClick(0);
//     }
//     navigate('/');
//     // console.info('You clicked a breadcrumb.');
//   }
//   return (
//     <div
//       role='presentation'
//       className='flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap'>
//       <Link
//         className='cursor-pointer text-[#1890ff]'
//         onClick={handleClickHome}
//         underline='hover'
//         sx={{ display: 'flex', alignItems: 'center' }}>
//         <HomeIcon
//           sx={{ mr: 0.5 }}
//           fontSize='inherit'
//         />
//         Trang chủ
//       </Link>
//       <div className='flex text-[#b0e8e5] items-center'>
//         <WhatshotIcon
//           sx={{ mr: 0.5 }}
//           fontSize='inherit'
//         />
//         {categoryBreadCrumb}
//       </div>
//       <div className={`${hiddenOther} text-[#b0e8e5] flex items-center`}>
//         <GrainIcon
//           sx={{ mr: 0.5 }}
//           fontSize='inherit'
//         />
//         {OthersBreadCrumb}
//       </div>
//       <div className={`${hidden} text-[#b0e8e5] flex items-center`}>
//         <BakeryDiningIcon
//           sx={{ mr: 0.5 }}
//           fontSize='inherit'
//         />
//         {PageBreadCrumb}
//       </div>
//     </div>
//   );
// }

import React, { useCallback } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { Link, useNavigate } from 'react-router-dom';
import { useActiveButton } from '../../hooks/useActiveButton';
import { navLists } from '../../shared/constant';
import { useAppdispatch, useAppSelector } from '../../store/hook';
import { setActiveOther } from '../../store/mainSlice/LoadingSlice/loadingSlice';

const BreadCrumb = React.memo(({ categoryBreadCrumb, PageBreadCrumb, hidden, hiddenOther, OthersBreadCrumb }) => {
  const [activeButton, handleClick] = useActiveButton(navLists);
  const navigate = useNavigate();
  const activeOther = useAppSelector((state) => state.loadingState.activeOther);
  const dispatch = useAppdispatch();

  const handleClickHome = useCallback(
    (event) => {
      event.preventDefault();
      if (activeOther !== null) {
        dispatch(setActiveOther(null));
      }
      if (activeButton !== null) {
        handleClick(0);
      }
      navigate('/');
    },
    [activeOther, activeButton, dispatch, handleClick, navigate]
  );

  return (
    <div
      role='navigation'
      className='flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap'>
      <Link
        to='/'
        className='cursor-pointer text-[#1890ff] flex items-center'
        onClick={handleClickHome}>
        <HomeIcon
          sx={{ mr: 0.5 }}
          fontSize='inherit'
        />
        Trang chủ
      </Link>
      {categoryBreadCrumb && (
        <div className='flex text-[#b0e8e5] items-center'>
          <WhatshotIcon
            sx={{ mr: 0.5 }}
            fontSize='inherit'
          />
          {categoryBreadCrumb}
        </div>
      )}
      {OthersBreadCrumb && (
        <div className={`${hiddenOther} text-[#b0e8e5] flex items-center`}>
          <GrainIcon
            sx={{ mr: 0.5 }}
            fontSize='inherit'
          />
          {OthersBreadCrumb}
        </div>
      )}
      {PageBreadCrumb && (
        <div className={`${hidden} text-[#b0e8e5] flex items-center`}>
          <BakeryDiningIcon
            sx={{ mr: 0.5 }}
            fontSize='inherit'
          />
          {PageBreadCrumb}
        </div>
      )}
    </div>
  );
});
BreadCrumb.displayName = 'BreadCrumb';
export default BreadCrumb;
