import { $, socket } from './baseService';
import { updatePlayerLocation, updateContent } from '../redux/actions';

export class PlayerService {

  constructor() {
    this.KEYS = {
      left: 97,
      up: 119,
      right: 100,
      down: 115,
      spacebar: 32
    };
    this.playContentToggle = {
      splash: false,
      map: true
    };
    this.center = {
      X: window.innerWidth/2,
      Y: window.innerHeight/2
    };

    // positioning
    this.top = Math.floor(Math.random() * 4940) + 10;
    this.left = Math.floor(Math.random() * 5990) + 10;
    this.rotation = 0;
  }

  initPlayerService() {
    return (dispatch) => {
      // get player name
      this.playerId = $('.name').val();

      // update redux store
      dispatch(updateContent(this.playContentToggle));

      // continuously update locations
      this.watchMovement();
      setInterval(this.updateLocation, 50);
      dispatch(this.updateOtherPlayers());
    };
  }

  /**
   * continuously emit the new location of the player
   */
  updateLocation = () => {
    window.scrollTo(this.left - (window.innerWidth / 2), this.top - (window.innerHeight / 2));
    socket.emit('update location', {
      playerId: this.playerId,
      position: {
        rotation: this.rotation,
        top: this.top,
        left: this.left
      }
    });
  }

  /**
   * update the redux store for all player locations
   */
  updateOtherPlayers() {
    return (dispatch) => {
      socket.on('update location', (data) => {
        dispatch(updatePlayerLocation(data));
      });
    }
  }

  /**
   * watch keypress
   */
  watchMovement() {
    $(window).keypress((e) => {
      switch(e.which) {
        case this.KEYS.up:
          if (this.top > 10)
            this.top -= 10;
          break;
        case this.KEYS.down:
          if (this.top < 4940)
            this.top += 10;
          break;
        case this.KEYS.left:
          if (this.left > 10)
            this.left -= 10;
          break;
        case this.KEYS.right:
          if (this.top < 4990)
            this.left += 10;
          break;
        case this.KEYS.spacebar:
        default:
          break;
      }
    });

    $(window).mousemove((e) => {
      var r = Math.atan2(this.top - e.pageY, this.left - e.pageX) - Math.PI/2;
      this.rotation = r;
    });
  }
}

export default new PlayerService();
