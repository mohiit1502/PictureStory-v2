import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {getChatViewStatus} from './../../../pages/Home/selectors'
import ChatCard from './../ChatCard'

const ChatView = props => {

  const classes1 = ['c-ChatView', props.chatView ? 'pad' : ''].join(' ')
  const classes2 = ['c-display flex', props.chatView ? 'show' : ''].join(' ')

  const chats = [
    {
      isUser: false,
      text: "Do something"
    },
    {
      isUser: true,
      text: "Do something else"
    },
    {
      isUser: true,
      text: "Try againg"
    },
    {
      isUser: false,
      text: "Got response from server"
    },
    {
      isUser: true,
      text: "13 images found"
    },
    {
      isUser: false,
      text: "Find colorful images"
    }
  ]

  const chatCards = chats && chats.map(chat => {
    return <ChatCard chat={chat} />
  })
  return (
    <div className={classes1}>
      <div className={classes2}>
        {chatCards}
      </div>
    </div>
  );
};

ChatView.propTypes = {
  chatView: PropTypes.bool
};

const mapStateToProps = createPropsSelector({
  chatView: getChatViewStatus
})

export default connect(
  mapStateToProps,
  null
)(ChatView)