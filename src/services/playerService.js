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

    // positioning
    this.top = 0;
    this.left = 0;
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
          this.top -= 10;
          break;
        case this.KEYS.down:
          this.top += 10;
          break;
        case this.KEYS.left:
          this.left -= 10;
          break;
        case this.KEYS.right:
          this.left += 10;
          break;
        case this.KEYS.spacebar:
        default:
          break;
      }
    });
  }
}

export default new PlayerService();
