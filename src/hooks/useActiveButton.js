import { useState } from 'react';
import { useAppdispatch, useAppSelector } from '../store/hook';
import { setActiveButton } from '../store/mainSlice/LoadingSlice/loadingSlice';

// export const useActiveButton = (initialValue = null) => {
export const useActiveButton = () => {
  // const [activeButton, setActiveButton] = useState(initialValue);
  const activeButton = useAppSelector((state) => state.loadingState.activeButton);
  const dispatch = useAppdispatch()
  const handleClick = (index) => {
    // setActiveButton(index);
    
    dispatch(setActiveButton(index));
  };
  return [activeButton, handleClick];
};
