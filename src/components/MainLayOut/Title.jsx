import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Title = ({ value }) => {
  useEffect(() => {
    document.title = value;
  }, [value]);
  return <></>;
};
Title.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Title;
