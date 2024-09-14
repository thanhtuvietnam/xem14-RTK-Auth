import React, { useEffect } from 'react';
import { CarInfo, InfoBlock, ContentInfo, TableLink, RecommendMovie, LinkServer } from './index.js';
import { IMG_URL } from '../../shared/constant.js';
import { icons } from '../../shared/icon.js';
import { getYoutubeVideoId } from '../../shared/utils.js';

import ImdbScore from './ImdbScore.jsx';
import useBookmark from '../../hooks/useBookmark.js';
import { useAppSelector } from '../../store/hook.js';

const { TbAlertTriangleFilled } = icons;

const SideMovieInfo = React.memo(({ detail, handleWatchMovie }) => {
  const [expandServer, setExpandServer] = React.useState(false);

  const movie = detail;
  const movieTrailerUrl = movie?.trailer_url;
  const newestEpisode = movie?.episodes[0]?.serverdata;
  const movieID = getYoutubeVideoId(movieTrailerUrl);

  const movieServerName = movie?.episodes[0]?.server_name;
  const movieServerData = movie?.episodes[0]?.server_data;

  const actors = movie?.actor?.length > 0 && movie.actor[0] !== '' ? movie.actor.join(', ') : 'NaN';
  const directors = movie?.director?.length > 0 && movie.director[0] !== '' ? movie.director.join(', ') : 'NaN';
  const { handleBMarks, isBookmarked } = useBookmark(movie);

  const items = useAppSelector((state) => state.filter.recommendMovies);
  const excludeItems = useAppSelector((state) => state.filter.excludeItems);

  const lastThreeEpisodes = movieServerData?.slice(-3).map((i) => i.slug);
  // console.log(lastThreeEpisodes.join(', '));

  return (
    <div>
      <div>
        <div className='grid md:flex  gap-4 my-3'>
          <div className='md:w-[30%] rounded-lg'>
            {detail ? (
              <CarInfo
                isBookmarked={isBookmarked}
                handleWatchMovie={handleWatchMovie}
                handleBMarks={handleBMarks}
                trailerLink={movieID}
                // trailerLink={movieTrailerUrl}
                setExpandServer={setExpandServer}
                image={`${IMG_URL}/${movie?.thumb_url} `}
                altname={movie?.name}
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
              newestEpisode={lastThreeEpisodes.join(', ')}
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
        <div className='bg-[#101821] rounded-md p-3 text-[#a5a5a5] mb-2 border-[1px] border-[#1e2732] overflow-y-auto  h-60 scroll-bar-custom'>
          <TableLink movieServerData={movieServerData} />
        </div>

        <div className='transition duration-300'>
          <RecommendMovie
            items={items}
            excludeItems={excludeItems}
          />
        </div>
      </div>
      {/* <ToastContainer position='top-center' /> */}
    </div>
  );
});
SideMovieInfo.displayName = 'SideMovieInfo';

export default SideMovieInfo;
