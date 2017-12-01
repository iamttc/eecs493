import { $, socket } from './baseService';
import { updatePlayerLocations, updateContent } from '../redux/actions';

// constants
const UP = 87;
const DOWN = 83;
const LEFT = 65;
const RIGHT = 68;

const UPDATE_RATE = 15;
const MOVE_DIST = 5;
const BULLET_SPEED = 5;

const WORLD_HEIGHT = 3000;
const WORLD_WIDTH = 3000;


export class PlayerService {
  constructor() {
    this.keyDown = {
      87: false, // up
      83: false, // down
      65: false, // left
      68: false  // right
    };
    this.playContentToggle = {
      splash: false,
      map: true
    };

    // positioning
    this.top = Math.floor(Math.random() * WORLD_HEIGHT - 100) + 10;
    this.left = Math.floor(Math.random() * WORLD_WIDTH - 100) + 10;

    this.desiredTop = this.top;
    this.desiredLeft = this.left;

    this.rotation = 0;
    this.velocity = 10;
  }


  initPlayerService() {
    return (dispatch) => {
      // get player name
      this.playerId = $('.name').val();

      // update redux store
      dispatch(updateContent(this.playContentToggle));

      // continuously update locations
      this.watchMovement();
      setInterval(this.updateLocation, UPDATE_RATE);
      setInterval(this.moveCharacter, UPDATE_RATE);
      dispatch(this.updateOtherPlayers());
    };
  }


  /**
   * continuously emit the new location of the player
   */
  updateLocation = () => {
    // var d = {
    //   x: this.left - this.desiredLeft,
    //   y: this.top - this.desiredTop,
    // };

    // if (Math.abs(d.x) > 12 || Math.abs(d.y) > 12){
    //   var h = Math.sqrt(Math.pow(d.x,2) + Math.pow(d.y,2));
    //   var a = Math.atan2(d.x, d.y);
    //   var v = h / 100 * this.velocity;
    //   this.top = (-v) * Math.cos(a) + this.top;
    //   this.left = (-v) * Math.sin(a) + this.left;
    // }

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
   * watch keypress
   */
  watchMovement() {
    $(window).keydown((e) => {
      this.keyDown[e.which] = true;
    });
    $(window).keyup((e) => {
      this.keyDown[e.which] = false;
    });
    $(window).mousemove((e) => {
      var r = Math.atan2(this.top - e.pageY, this.left - e.pageX) - Math.PI/2;
      this.rotation = r;
    });
    $(window).mousedown((e) => {
      this.fireBullet();
    });
  }


  /**
   * move the character based on keypress
   */
  moveCharacter = () => {
    // move up
    if (this.keyDown[UP] && !this.keyDown[DOWN] && this.top > (0 + MOVE_DIST))
        // this.desiredTop = this.top - MOVE_DIST;
        this.top -= MOVE_DIST;
    // move down
    if (this.keyDown[DOWN] && !this.keyDown[UP] && this.top < (WORLD_HEIGHT - (MOVE_DIST * 2)))
        // this.desiredTop = this.top + MOVE_DIST;
        this.top += MOVE_DIST;
    // move left
    if (this.keyDown[LEFT] && !this.keyDown[RIGHT] && this.left > (0 + MOVE_DIST))
        // this.desiredLeft = this.left - MOVE_DIST;
        this.left -= MOVE_DIST;
    // move right
    if (this.keyDown[RIGHT] && !this.keyDown[LEFT] && this.left < (WORLD_WIDTH - (MOVE_DIST * 2)))
        // this.desiredLeft = this.left + MOVE_DIST;
        this.left += MOVE_DIST;
  };


  /**
   * fire a bullet
   */
  fireBullet() {
    socket.emit('fire bullet', {
      playerId: this.playerId,
      position: {
        direction: this.rotation,
        top: this.top + BULLET_SPEED,
        left: this.left + BULLET_SPEED,
        init_x: this.left + BULLET_SPEED,
        init_y: this.top + BULLET_SPEED,
      }
    });
  }


  /**
   * update the redux store for all player locations
   */
  updateOtherPlayers() {
    return (dispatch) => {
      socket.on('player locations', (data) => {
        dispatch(updatePlayerLocations(data));
        window.scrollTo(
          data[this.playerId].left - (window.innerWidth / 2),
          data[this.playerId].top - (window.innerHeight / 2)
        );
      });
    }
  }
}

export default new PlayerService();
