import React from 'react';
import './chat.css';
import '../service/chatService';


const Chat = () => {
  return(
    <div className="chat">
      <ul id="messages"></ul>
      <form action="">
        <input id="m" /><button>Send</button>
      </form>
    </div>
  );
};


export default Chat;