import { useState } from 'react';
import { useAppdispatch, useAppSelector } from '../store/hook';
import { setActiveButton } from '../store/mainSlice/LoadingSlice/loadingSlice';

export const useActiveButton = () => {
  const activeButton = useAppSelector((state) => state.loadingState.activeButton);
  const dispatch = useAppdispatch();
  const handleClick = (index) => {
    dispatch(setActiveButton(index));
  };
  return [activeButton, handleClick];
};

export const useActiveLinkButton = () => {
  const [activeLinkButton, setActiveLinkButton] = useState(0);
  const handleClickLink = (index) => {
    setActiveLinkButton(index);
  };
  return [activeLinkButton, handleClickLink];
};
