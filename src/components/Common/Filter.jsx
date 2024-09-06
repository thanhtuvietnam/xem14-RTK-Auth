import React from 'react';
import { Select, Option } from '@mui/joy';

const Filter = () => {
  return (
    <div className='custom-page px-4 py-3 mt-1 h-full !rounded-t-lg w-full'>
      <Select
        // className='bg-black'
        color='warning'
        disabled={false}
        placeholder='Choose one…'
        size='lg'
        variant='solid'></Select>
    </div>
  );
};

export default Filter;
