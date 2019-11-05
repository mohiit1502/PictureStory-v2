import React from 'react';
import PropTypes from 'prop-types';

const ImageHeader = props => {
  const image = props.image
  return (
    <div className="c-ImageHeader">
      <div className="avatar" style={{backgroundImage: `url(${image.imageUrl})`}} />
    </div>
  );
};

ImageHeader.propTypes = {
  image: PropTypes.object
};

export default ImageHeader