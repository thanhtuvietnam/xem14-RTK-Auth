import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Title = React.memo(({ value }) => {
  useEffect(() => {
    document.title = value;
  }, [value]);
  return <></>;
});
Title.propTypes = {
  value: PropTypes.string.isRequired,
};
Title.displayName = 'Title';
export default Title;
