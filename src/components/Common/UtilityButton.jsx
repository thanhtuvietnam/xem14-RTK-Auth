import React from 'react';
import { FloatButton } from 'antd';
import { icons } from '../../shared/icon';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const { PiArrowLineUpBold } = icons;

const UtilityButton = React.memo(() => {
  return (
    <>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{
          insetInlineEnd: 24,
        }}
        icon={<CustomerServiceOutlined aria-label='Customer Service' />}>
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
        icon={<PiArrowLineUpBold aria-label='Back to Top' />}
      />
    </>
  );
});
UtilityButton.displayName = 'UtilityButton';

export default UtilityButton;
