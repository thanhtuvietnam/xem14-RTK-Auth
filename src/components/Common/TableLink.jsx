import React from 'react';
import { icons } from '../../shared/icon';
import { Link } from 'react-router-dom';

const { MdCloudDownload } = icons;

const thContent = ['Liên kết tải về', 'Chất lượng', 'Ngôn ngữ'];

const TableLink = React.memo(({ movieServerData }) => {
  return (
    <div className=''>
      <table className='text-[13px] mb-[20px] w-full'>
        <thead className='border-b-2 border-[#202b35]'>
          <tr className='font-bold truncate'>
            {thContent.map((content, index) => (
              <th
                className='p-[8px]'
                key={index}>
                {content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='hover:bg-[#04090e]'>
          {movieServerData?.map((linkm3u8, index) => (
            <tr key={index}>
              <td className='p-[8px] flex items-center gap-2'>
                <MdCloudDownload
                  color='#b83826'
                  size={25}
                />
                <Link
                  className='text-[#87c3f9] hover:text-[#b83826]'
                  to={linkm3u8.link_m3u8}>
                  {linkm3u8.filename}
                </Link>
              </td>
              <td className='p-[8px]'>
                <span className='p-1 bg-[#0e1215] rounded-sm text-white border-[1px] border-[#1e2732]'>1080p</span>
              </td>
              <td className='p-[8px]'>Vietsub sẵn</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
TableLink.displayName = 'TableLink';
export default TableLink;
