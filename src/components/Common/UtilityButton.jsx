import React from 'react';
import { FloatButton } from 'antd';
import { icons } from '../../shared/icon';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const { PiArrowLineUpBold } = icons;

const UtilityButton = () => {
  return (
    <>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{
          insetInlineEnd: 24,
       
        }}
        icon={<CustomerServiceOutlined />}>
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.BackTop
        style={{
          insetInlineEnd: 94,
          // backgroundColor: '#f5bb90',
        }}
        type='primary'
        duration={100}
        icon={<PiArrowLineUpBold />}
      />
    </>
  );
};

export default UtilityButton;
