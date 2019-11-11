import React from 'react';
import StepProgressBar from '../../../components/molecules/common/StepProgressBar/StepProgressBar';
import ImageContainer from '../../../components/molecules/PrincipalContent/ImageContainer';
import MoodSelector from '../../../components/molecules/ecstatica/creator/MoodSelector/MoodSelector';

const Creator = props => {
  return (
    <div className='c-Creator'>
      <StepProgressBar />
      <ImageContainer />
      <MoodSelector />
    </div>
  );
};

export default Creator;