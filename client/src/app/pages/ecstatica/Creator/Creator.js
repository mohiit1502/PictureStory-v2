import React from 'react';
import StepProgressBar from '../../../components/molecules/common/StepProgressBar/StepProgressBar';
import ImageContainer from '../../../components/molecules/PrincipalContent/ImageContainer';

const Creator = props => {
  return (
    <div className='c-Creator'>
      <StepProgressBar />
      <ImageContainer />
    </div>
  );
};

export default Creator;