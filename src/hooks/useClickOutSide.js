import React, { useState, useEffect, useRef, useCallback } from 'react';

const useClickOutSide = (addtionalRefs = [], mouseAction = '') => {
  const [isOpen, setIsOpen] = useState(null);
  const dropdownRef = useRef();
  const toggleDropdown = useCallback((ev) => {
    setIsOpen(ev);
  }, []);
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      const refs = [dropdownRef, ...addtionalRefs];
      if (refs.every((ref) => ref.current && !ref.current.contains(e.target))) {
        closeDropdown();
      }
    };
    document.addEventListener(mouseAction, handleClickOutside);
    return () => {
      document.removeEventListener(mouseAction, handleClickOutside);
    };
  }, [addtionalRefs, mouseAction, closeDropdown]);
  return { isOpen, toggleDropdown, closeDropdown, dropdownRef };
};
export default useClickOutSide;
