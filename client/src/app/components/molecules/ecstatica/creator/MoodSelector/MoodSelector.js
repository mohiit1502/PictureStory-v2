import React from 'react';
import MoodCard from '../MoodCard/MoodCard';

const MoodSelector = props => {

  const moodData = [
    {src: './../../../../../../../images/happy.jpg', text: "Happy!"},
    {src: './../../../../../../../images/sad.jpg', text: "Sad!"},
    {src: './../../../../../../../images/love.png', text: "In love!"},
    {src: './../../../../../../../images/disappointed.png', text: "Feeling low!"},
    {src: './../../../../../../../images/angry.png', text: "Angry!"},
    {src: './../../../../../../../images/sleepy.png', text: "Sleepy!"},
    {src: './../../../../../../../images/naughty.png', text: "Feeling naughty!"},
    {src: './../../../../../../../images/bored.png', text: "Bored!"},
    {src: './../../../../../../../images/excited.png', text: "Excited!"},
    {src: './../../../../../../../images/scared.png', text: "Scared!"},
    // {src: './../../../../../../../images/bored.png', text: "I'm feeling bored!"},
    // {src: './../../../../../../../images/bored.png', text: "I'm feeling bored!"},
  ]
  const moodCards = moodData && moodData.map((mood) => {
    return <MoodCard mood={mood} />
  })

  return (
    <div className='c-MoodSelector container'>
      <div className='row selector-row'>
        {moodCards}
      </div>
    </div>
  );
};

MoodSelector.defaultProps = {

};

MoodSelector.propTypes = {

};

export default MoodSelector;