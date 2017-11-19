import { $, socket } from './baseService';
import { updatePlayerLocation, updateContent } from '../redux/actions';

//var R = 10;
var CENTER = {
  X: window.innerWidth/2,
  Y: window.innerHeight/2
}

var W = window.innerWidth;
var H = window.innerHeight;

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
    this.x = this.left;
    this.y = this.top;
    this.rotation = 0;

    this.velocity = 9;
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

    var d = {
      x: this.left - this.x,
      y: this.top - this.y,
    };

    if(Math.abs(d.x) > 12 || Math.abs(d.y) > 12){
      var h = Math.sqrt(Math.pow(d.x,2) + Math.pow(d.y,2));
      var a = Math.atan2(d.x, d.y);

      var v = h/100 * this.velocity;

      this.top = (-v) * Math.cos(a) + this.top,
      this.left = (-v) * Math.sin(a) + this.left
    }

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
          this.y = this.top - 100;
          break;
        case this.KEYS.down:
          this.y = this.top + 100;
          break;
        case this.KEYS.left:
          this.x = this.left - 100;
          break;
        case this.KEYS.right:
          this.x = this.left + 100;
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
