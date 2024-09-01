import React, { useState, useEffect } from 'react';
import { useGetImdbResQuery } from '../../store/apiSlice/imdbApi.slice';

const ImdbFeat = ({ film }) => {
  const { data: imdbRes, isLoading, error } = useGetImdbResQuery(film?.imdb?.id, { skip: !film?.imdb?.id });

  useEffect(()=>{if(imdbRes){console.log(imdbRes)}},[imdbRes])

  
  return <span></span>;

  // ... Xử lý loading, error, và hiển thị dữ liệu từ imdbRes
};

export default ImdbFeat;
