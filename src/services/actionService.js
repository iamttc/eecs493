import { $, socket } from './baseService';

$(() => {
  $('.content').mouseenter(() => {
    socket.emit('game action', 'mouse entered window');
  });

  $('.content').mouseleave(() => {
    socket.emit('game action', 'mouse left window');
  });

  socket.on('game action', (data) => {
    const action = $('.action');
    action.text(data);
  });
});
