import React from 'react';
import PropTypes from 'prop-types';
import ImageContainer from './ImageContainer';
import ImageViewer from './ImageViewer';

const PrincipalContent = props => {
  return (
    <div className='c-PrincipalContent'>
      <ImageContainer />
      <ImageViewer />
    </div>
  );
};

PrincipalContent.propTypes = {

};

export default PrincipalContent;