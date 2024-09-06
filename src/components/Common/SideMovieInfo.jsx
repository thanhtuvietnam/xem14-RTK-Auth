import React, { useCallback, useEffect } from 'react';
import { CarInfo, InfoBlock, ContentInfo, TableLink, RecommendMovie, LinkServer } from './index.js';
import { IMG_URL } from '../../shared/constant.js';
import { icons } from '../../shared/icon.js';
import { getYoutubeVideoId } from '../../shared/utils.js';

import ImdbScore from './ImdbScore.jsx';
import { useAppdispatch, useAppSelector } from '../../store/hook.js';
import { addBookmarks, fetchBookmarks, removeBookmarks, setActiveBM } from '../../store/bookmarks/bookmarks.slice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { TbAlertTriangleFilled } = icons;

const SideMovieInfo = React.memo(({ detail, handleWatchMovie }) => {
  const [expandServer, setExpandServer] = React.useState(false);

  const movie = detail;
  const movieTrailerUrl = movie?.trailer_url;
  // console.log(movieTrailerUrl);
  const movieID = getYoutubeVideoId(movieTrailerUrl);
  const movieServerName = movie?.episodes[0]?.server_name;
  const movieServerData = movie?.episodes[0]?.server_data;

  const actors = movie?.actor?.length > 0 && movie.actor[0] !== '' ? movie.actor.join(', ') : 'NaN';
  const directors = movie?.director?.length > 0 && movie.director[0] !== '' ? movie.director.join(', ') : 'NaN';
  // console.log(movie);
  const dispatch = useAppdispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);
  const isBookmarked = Array.isArray(bookmarks) && bookmarks.some((bookmark) => bookmark.movieName === movie?.name);

  const handleBMarks = useCallback(() => {
    if (userInfo) {
      const movieNameDb = movie?.name;
      const posterPathDb = movie?.poster_url;
      const thumbPathDb = movie?.thumb_url;
      const slug = movie?.slug;
      const originName = movie?.origin_name;

      if (isBookmarked) {
        const bookmarkId = bookmarks.find((bookmark) => bookmark.movieName === movieNameDb).id;
        dispatch(removeBookmarks(bookmarkId))
          .unwrap()
          .then(() => {
            toast.warn(`Bạn đã xoá ${movieNameDb} khỏi danh sách yêu thích`);

            dispatch(fetchBookmarks(userInfo.uid));
          })
          .catch((error) => {
            toast.error(error);
          });
      } else {
        // dispatch(setActiveBM(true));
        dispatch(addBookmarks({ userId: userInfo.uid, movieName: movieNameDb, posterPath: posterPathDb, thumbPath: thumbPathDb, slug: slug, originName: originName }))
          .unwrap()
          .then(() => {
            toast.success(`Bạn đã thêm ${movieNameDb} vào danh sách yêu thích`);
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    } else {
      toast.info(`Vui lòng đang nhập để thực hiện chức năng này`);
      // console.log(`vui long dang nhap de thuc hien chuc nang nay`);
    }
  }, [userInfo, dispatch, movie, isBookmarked, bookmarks]);

  return (
    <div>
      <div>
        <div className='grid md:flex gap-4 my-3'>
          <div className='md:w-[30%] rounded-lg'>
            {detail ? (
              <CarInfo
                isBookmarked={isBookmarked}
                handleWatchMovie={handleWatchMovie}
                trailerLink={movieID}
                // trailerLink={movieTrailerUrl}
                setExpandServer={setExpandServer}
                image={`${IMG_URL}/${movie?.thumb_url} `}
                altname={movie?.name}
                handleBMarks={handleBMarks}
              />
            ) : (
              <div>đang tải</div>
            )}
          </div>
          <div className='md:w-[70%]'>
            <InfoBlock
              title={movie?.name}
              originalName={movie?.origin_name}
              episodeCurrent={movie?.episode_current}
              country={movie?.country.map((coun) => coun.name)}
              qua={movie?.quality}
              lang={movie?.lang}
              actor={actors}
              director={directors}
              category={movie?.category.map((cat) => cat.name)}
              year={movie?.year}
              time={movie?.time}
              view={movie?.view}
              imdbScore={<ImdbScore film={movie} />}
            />
          </div>
        </div>
        <div className={`${expandServer ? 'h-auto' : 'h-0'} overflow-hidden  mb-3 transition duration-500`}>
          <LinkServer
            onEpisodeClick={handleWatchMovie}
            serverName={movieServerName}
            serverData={movieServerData}
          />
        </div>
        <div className='text-[#eed238] text-[13.5px] flex items-center gap-3 bg-[#224361] p-[12px]  border-[#435567] mb-[10px]'>
          <TbAlertTriangleFilled size={35} />
          <p>Phim bị lỗi thì bình luận bên dưới để ad fix hoặc qua nhóm tele:...</p>
        </div>
        <div className='bg-[#101821] p-3 rounded-md  mb-2.5'>
          <ContentInfo data={movie} />
        </div>
        <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto overflow-x-scroll h-60 scroll-bar-custom'>
          <TableLink movieServerData={movieServerData} />
        </div>

        <div className='hidden min-[425px]:flex transition duration-300'>
          <RecommendMovie />
        </div>
      </div>
      {/* <ToastContainer position='top-center' /> */}
    </div>
  );
});
SideMovieInfo.displayName = 'SideMovieInfo';

export default SideMovieInfo;
