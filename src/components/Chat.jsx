import React from 'react';
import './styles/chat.css';
import '../services/chatService';

const Chat = () => {
  return(
    <div className="chat">
      <p className="chat-title">chat</p>
      <ul className="messages"></ul>
      <form action="">
        <input id="m" placeholder="message"/>
      </form>
    </div>
  );
};

export default Chat;
