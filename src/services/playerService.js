import { $, socket } from './baseService';

const KEYS = {
  left: 97,
  up: 119,
  right: 100,
  down: 115,
  spacebar: 32
};


$(() => {

  const player = $('#player1');

  // emit keypress to other players
  $(window).keypress((e) => {

    const x = player.offset().left;
    const y = player.offset().top;
    let moved = false;

    switch(e.which) {
      case KEYS.up:
        player.css({top: y - 10, left: x});
        moved = true;
        break;
      case KEYS.down:
        player.css({top: y + 10, left: x});
        moved = true;
        break;
      case KEYS.left:
        player.css({top: y, left: x - 10});
        moved = true;
        break;
      case KEYS.right:
        player.css({top: y, left: x + 10});
        moved = true;
        break;
      case KEYS.spacebar:
        break;
      default:
        break;
    }

    // update move
    if (moved) {
      socket.emit('player keypress', {
        playerId:'#player1',
        offset: player.offset()
      });
    }
  });

  socket.on('player keypress', (data) => {
    const player2 = $(data.playerId);
    player2.css(data.offset);
  });
});
