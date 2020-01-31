import React from 'react';
import PropTypes from 'prop-types';
// import MoodSelector from '../MoodSelector/MoodSelector';

const MoodCard = ({mood}) => {
  return (
    <div className='c-MoodCard padder col-3'>
      <div className="c-mood-image" style={{backgroundImage: `url(${mood.src})`}} />
      <p className="c-mood-text">{mood.text}</p>
    </div>
  );
};

MoodCard.defaultProps = {

};

MoodCard.propTypes = {
  mood: PropTypes.object
};

export default MoodCard;