import React from 'react';
import PropTypes from 'prop-types';

const ChatCard = ({chat}) => {

  const classes = ['c-ChatCard', chat.isUser ? 'rightFloater' : ''].join(' ')
  return (
    <div className={classes}>
      <p>{chat.text}</p>
    </div>
  );
};

ChatCard.propTypes = {

};

export default ChatCard;