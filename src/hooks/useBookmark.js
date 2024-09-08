import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAppdispatch, useAppSelector } from '../store/hook';
import { addBookmarks, fetchBookmarks, removeBookmarks } from '../store/bookmarks/bookmarks.slice';

const useBookmark = (movie) => {
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
            toast.warn(`Bạn đã xoá ${movieNameDb} khỏi danh sách yêu thích`, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'light',
            });
            dispatch(fetchBookmarks(userInfo.uid));
          })
          .catch((error) => {
            toast.error(error);
          });
      } else {
        dispatch(addBookmarks({ userId: userInfo.uid, movieName: movieNameDb, posterPath: posterPathDb, thumbPath: thumbPathDb, slug, originName }))
          .unwrap()
          .then(() => {
            toast.success(`Bạn đã thêm ${movieNameDb} vào danh sách yêu thích`, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'light',
            });
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    } else {
      toast.info(`Vui lòng đang nhập để thực hiện chức năng này`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [userInfo, dispatch, movie, isBookmarked, bookmarks]);

  return { handleBMarks, isBookmarked };
};

export default useBookmark;
