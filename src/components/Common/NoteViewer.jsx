import React from 'react';
import { noteLine } from '../../shared/constant';

const NoteViewer = ({ hidden, note }) => {
  return (
    <div className='bg-[#fef5c4] border-[1px] border-[#fadf98] p-[5px] overflow-hidden text-center text-[10px] md:text-[11px] lg:text-[13px] leading-[1.6] rounded-t-sm'>
      <span className='text-[#222222]'>
        <strong>
          {note}
          <a
            href=''
            className={`text-[#87c3f9] ml-2 ${hidden}`}>
            Bấm vào đây
          </a>
        </strong>
      </span>
    </div>
  );
};

export default NoteViewer;
