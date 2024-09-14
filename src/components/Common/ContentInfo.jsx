import React, { useState, useMemo } from 'react';
import useSplitContents from '../../hooks/useSplitContent';
import SectionTitle from './SectionTitle';

const ContentInfo = React.memo(({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { contentBlockWithoutTags, contentBlockSplitted } = useSplitContents(data);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className='text-[#989898] text-[13.5px]'>
      <div className='sectionTitle-custom  py-3 mb-3.5'>
        <SectionTitle
          sectionFilm={`Nội dung phim`}
          hidden={`hidden`}
        />
      </div>
      <p className='leading-[1.8] mb-4'>{isExpanded ? contentBlockWithoutTags : `${contentBlockSplitted[0]}...`}</p>
      <button
        className='text-white button-two rounded-md px-2'
        onClick={toggleExpand}>
        {isExpanded ? 'Thu gọn...' : 'Mở rộng...'}
      </button>
    </div>
  );
});
ContentInfo.displayName = 'ContentInfo';
export default ContentInfo;
