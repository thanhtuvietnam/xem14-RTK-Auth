// import * as React from 'react';

// const ContentInfo = ({ data }) => {
//   const [isExpanded, setIsExpanded] = React.useState(false);
//   const contentBlock = data?.content;
//   const contentBlockWithoutTags = contentBlock?.replace(/<[^>]+>/g, '');
//   const contentBlockSplitted = [contentBlockWithoutTags?.slice(0, contentBlockWithoutTags?.length / 2), contentBlockWithoutTags?.slice(contentBlockWithoutTags?.length / 2)];
//   // console.log(contentBlockJoin);

//   return (
//     <div>
//       <div className='text-[#989898] text-[13.5px] '>
//         <div className='sectionTitle-custom border-b py-3 mb-3.5'>
//           <span className='sectionTitle-custom'>Nội dung phim</span>
//         </div>
//         <p className='leading-[1.8] mb-4'>{isExpanded ? `${contentBlockWithoutTags}` : `${contentBlockSplitted[0]}...`}</p>
//         <button
//           className='text-white button-two rounded-md px-2'
//           onClick={() => setIsExpanded((prev) => !prev)}>
//           {isExpanded ? <span>Thu gọn...</span> : <span>Mở rộng...</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContentInfo;

import React, { useState, useMemo } from 'react';

const ContentInfo = React.memo(({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { contentBlockWithoutTags, contentBlockSplitted } = useMemo(() => {
    const contentBlock = data?.content || '';
    const withoutTags = contentBlock.replace(/<[^>]+>/g, '');
    const halfLength = Math.floor(withoutTags.length / 2);
    return {
      contentBlockWithoutTags: withoutTags,
      contentBlockSplitted: [withoutTags.slice(0, halfLength), withoutTags.slice(halfLength)],
    };
  }, [data?.content]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className='text-[#989898] text-[13.5px]'>
      <div className='sectionTitle-custom border-b py-3 mb-3.5'>
        <span className='sectionTitle-custom'>Nội dung phim</span>
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
