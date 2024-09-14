import { useMemo } from 'react';

export const useSplitContents = (data) => {
  return useMemo(() => {
    const contentBlock = data?.content || '';
    const withoutTags = contentBlock.replace(/<[^>]+>/g, '');
    const halfLength = Math.floor(withoutTags.length / 2);

    return {
      contentBlockWithoutTags: withoutTags,
      contentBlockSplitted: [withoutTags.slice(0, halfLength), withoutTags.slice(halfLength)],
    };
  }, [data?.content]);
};

export default useSplitContents;
