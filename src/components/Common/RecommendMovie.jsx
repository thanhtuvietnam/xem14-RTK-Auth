import React from 'react';
import { CardItem } from '../Common/index.js';

const RecommendMovie = () => {
  return (
    <div>
      <div className='sectionTitle-custom border-b mb-3'>
        <h1 className='font-bold tracking-wide text-base '>Có thể phù hợp với bạn</h1>
      </div>
      <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 grid-rows-2  mb-5'>
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
        <CardItem
          image='https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg'
          title='hehe'
        />
      </div>
    </div>
  );
};

export default RecommendMovie;
