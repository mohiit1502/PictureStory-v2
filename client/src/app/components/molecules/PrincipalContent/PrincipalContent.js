import React from 'react';
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

export default PrincipalContent;