import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { MoonLoader } from 'react-spinners';
import { BannerSliderSkeleton, CardSkeleton, FilterSkeleton, MiniSliderSkeleton } from '../HomePageSkeleton';

const SkeletonForAll = React.memo(({ withSlider = false, cardCount = 24, sectionCount = 1 }) => {
  return (
    <SkeletonTheme
      baseColor='#202020'
      highlightColor='#444'>
      <div className='relative'>
        {withSlider && (
          <>
            <BannerSliderSkeleton />
            <MiniSliderSkeleton />
          </>
        )}
        <FilterSkeleton />
        <main className='bg-[#151d25] border-t border-t-[#1e2732] custom-page lg:flex shadow-lg min-h-screen mt-3'>
          <section className='lg:mr-5 mb-5 lg:w-3/4'>
            {[...Array(sectionCount)].map((_, index) => (
              <div key={index}>
                <header>
                  <Skeleton
                    height={50}
                    width={100}
                  />
                </header>
                <div className='grid grid-cols-2 min-[540px]:grid-cols-3 min-[712px]:grid-cols-4 gap-2.5'>
                  {[...Array(cardCount)].map((_, index) => (
                    <CardSkeleton
                      key={index}
                      height={250}
                      width='100%'
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
          <aside className='lg:w-2/6'>
            <Skeleton
              className='h-screen lg:flex'
              height={1500}
            />
          </aside>
        </main>
      </div>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
        <MoonLoader
          size={160}
          color='#e06c26'
          className='z-50'
        />
      </div>
    </SkeletonTheme>
  );
});
SkeletonForAll.displayName = 'SkeletonForAll';
export default SkeletonForAll;
