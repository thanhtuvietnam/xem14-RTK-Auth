import { RightBarCar, SectionTitle } from './index.js';
import { useActiveButton } from '../../hooks/useActiveButton.js';
import { IMG_URL } from '../../shared/constant.js';

const TrendingNow = () => {
  const buttonLists = ['Ngày', 'Tuần', 'Tháng'];
  const [activeButton, handleClick] = useActiveButton();
  return (
    // <div className='w-[80%] xl:w-[65%] hidden lg:flex mb-5 flex-col'>
    <div className='mb-5'>
      <div className='!border-b !border-[#1e2732] flex items-center justify-between'>
        {/* <div className='sectionTitle-custom border-b py-3 truncate'>TOP XEM NHIỀU</div> */}
        <SectionTitle
          sectionFilm={`TOP XEM NHIỀU`}
          hidden={`hidden`}
        />
        <div className='flex items-center '>
          {buttonLists.map((button, index) => (
            <button
              onClick={() => handleClick(index)}
              className={`trending-button ${activeButton === index ? 'activetrending' : ''}`}
              key={index}>
              {button}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-2'>
        {[...Array(10)].map((_, index) => (
          <RightBarCar
            key={index}
            thumbImage={`${IMG_URL}/bot-hon-thumb.jpg`}
            year='2018'
            movieName='lassName=lassName=text-gray-400 line-clamp-3 '
            originName='lassName=text-gray-400 line-clamp-3 sm:line-clamp-none '
            heightThumb={`h-20 lg:h-auto`}
            lineclampCss={`lg:line-clamp-6`}
            view={500}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
