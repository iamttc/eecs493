import { $, socket } from './baseService';

$(() => {
  $('form').submit(() => {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', (msg) => {
    let messages = $('.messages');
    messages.append($('<li>').text(msg));
    messages.scrollTop(messages[0].scrollHeight);
  });
});
