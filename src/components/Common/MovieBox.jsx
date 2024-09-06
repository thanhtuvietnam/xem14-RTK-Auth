import React, { useState, useEffect } from 'react';

import { MediaPlayer, MediaProvider, Spinner, ToggleButton, Poster } from '@vidstack/react';
import { PlyrLayout } from '@vidstack/react/player/layouts/plyr';
import { ThumbsDownIcon, ThumbsUpIcon } from '@vidstack/react/icons';
import { customPlyrIcons } from '../../shared/icon';
import Rating from '@mui/material/Rating';
import { icons } from '../../shared/icon';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { IMG_URL } from '../../shared/constant';
const { ImStarEmpty } = icons;

const PlyrControl = [
  'play-large', // The large play button in the center
  'restart', // Restart playback
  'play', // Play/pause playback
  'progress', // The progress bar and scrubber for playback and buffering
  'current-time', // The current time of playback
  'duration', // The full duration of the media
  'rewind', // Rewind by the seek time (default 10 seconds)
  'fast-forward', // Fast forward by the seek time (default 10 seconds)
  // 'download',
  // 'mute',
  'volume', // Volume control
  'settings', // Settings menu
  'pip', // Picture-in-picture (currently Safari only)
  'fullscreen', // Toggle fullscreen
];

const MovieBox = React.memo(({ episode, poster }) => {
  // console.log(poster)
  const [loading, setLoading] = useState(false);
  const handleSeeking = () => {
    setLoading(true);
  };
  const handleSeeked = () => {
    setLoading(false);
  };

  return (
    <div className='mt-2 relative'>
      <MediaPlayer
        streamType='on-demand'
        viewType='video'
        crossOrigin='mixed'
        load='play'
        poster={`${IMG_URL}/${poster}`}
        posterLoad='visible'
        src={episode?.link_m3u8}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}>
        <MediaProvider />
        <PlyrLayout
          clickToFullscreen={false}
          clickToPlay={false}
          toggleTime={true}
          icons={customPlyrIcons}
          controls={PlyrControl}
        />
        {loading && (
          <div className='pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
            <Spinner.Root
              className='text-white  transition-opacity duration-200 ease-linear animate-spin opacity-100'
              size={84}>
              <Spinner.Track
                className='opacity-25'
                width={8}
              />
              <Spinner.TrackFill
                className='opacity-75'
                width={8}
              />
            </Spinner.Root>
          </div>
        )}
      </MediaPlayer>
      <div className='flex items-center '>
        <ToggleButton
          className='group ring-sky-400 relative inline-flex h-4 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset data-[focus]:ring-4'
          aria-label='Like video'>
          <ThumbsUpIcon
            className='w-8 h-6 hidden group-data-[pressed]:block'
            color='#4bc729'
          />
          <ThumbsDownIcon
            className='w-8 h-6 group-data-[pressed]:hidden'
            color='#c94436'
          />
        </ToggleButton>
        <div className='flex'>
          <div>
            <span>*0/5(0 lượt)</span>
          </div>
          <Rating
            name='half-rating'
            defaultValue={2.5}
            precision={0.5}
          />
        </div>
      </div>
    </div>
  );
});
MovieBox.displayName = 'MovieBox';
export default MovieBox;
