import { useState } from "react";
import { navLists } from "./constant";
import { nanoid } from "@reduxjs/toolkit";

export const convertToSlug = (text) => {
  if (text === "TRANG CHỦ") {
    return "";
  } else {
    return text
      .toString()
      .toLowerCase()
      .normalize("NFD") // Normalize Unicode để xử lý ký tự tiếng Việt có dấu
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu ngã, huyền, hỏi,... trong Unicode
      .replace(/[đĐ]/g, "d") // Chuyển đổi đ, Đ thành d
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w-]+/g, "") // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
      .replace(/-+/g, "-"); // Loại bỏ dấu gạch ngang liên tiếp
  }
};
export const navListsSlug = navLists.map((text) => convertToSlug(text));

export const useHoverState = () => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return { isHovering, handleMouseEnter, handleMouseLeave };
};

export const linkUrl = (film) => {
  switch (film.type) {
    case "series":
      return `chitiet-phim/${film.slug}`;
    case "single":
      return `chitiet-phim/${film.slug}`;
    case "hoathinh":
      return `chitiet-phim/${film.slug}`;
    case "tvshows":
      return `chitiet-phim/${film.slug}`;
    default:
      return "/error";
  }
};
export const titleListButton = (sectionFilm) => {
  if (sectionFilm) {
    return convertToSlug(sectionFilm);
  }
};

export const shuffleAndSliceArray = (array, slicesize) => {
  let maxSliceSize = slicesize || array.length;
  let shuffledArray = array.slice();
  let currentIndex = shuffledArray.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let tempValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = tempValue;
  }
  return shuffledArray.slice(0, maxSliceSize);
};

export const classifyAddon = (film) => {
  if (film?.sub_docquyen === true) {
    return "Vietsub Độc Quyền";
  } else {
    if (film?.episode_current.toLowerCase() === "full") {
      if (film?.time === "Đang cập nhật") {
        return null;
      } else {
        return film.time;
      }
    } else {
      return film.episode_current || film.episode_total;
    }
  }
};

export const getYoutubeVideoId = (url) => {
  // const url = 'https://www.youtube.com/watch?v=Q47BZGNaA2o';
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(e\/)|(u\/\w+\/)|(embed\/)|(v=))([^#\&\?]*).*/;
  const match = url?.match(regExp);
  if (match && match[8].length === 11) {
    // console.log(match[8]);
    return match[8];
  } else {
    return null;
  }
};

export function randomPage() {
  const randomScore = Math.floor(Math.random() * (50 - 2 + 1)) + 2;
  return randomScore;
}

export function createYears(startYear, endYear) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({
      _id: nanoid(),
      year: year,
      slug: year,
    });
  }
  return years;
}
export const getRandomItem = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return null; // Hoặc giá trị mặc định nào đó
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

export const getCurrentYear = new Date().getFullYear();
