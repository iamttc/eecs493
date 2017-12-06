import _ from 'lodash';
import { $, socket } from './baseService';
import { updatePlayerLocations, updateContent } from '../redux/actions';
import bulletService from '../services/bulletService';

// constants
const UP = 87;
const DOWN = 83;
const LEFT = 65;
const RIGHT = 68;

const INTERVAL = 32;
const MOVE_DIST = 5;
const CLIP = 10;

const WORLD_HEIGHT = 3000;
const WORLD_WIDTH = 3000;


export class PlayerService {
  constructor() {
    this.rotation = 0;
    this.velocity = 10;
    this.clip = CLIP;
    this.reloading = false;

    this.locationInterval = null;
    this.moveInterval = null;
    this.playerId = '';
    this.score = null;
  }


  /**
   * sets window listers and socket emits
   */
  startService() {
    return (dispatch) => {
      // positioning
      this.top = Math.floor(Math.random() * WORLD_HEIGHT - 100) + 50;
      this.left = Math.floor(Math.random() * WORLD_WIDTH - 100) + 50;
      this.keyDown = {
        87: false, // up
        83: false, // down
        65: false, // left
        68: false  // right
      };

      // set content
      this.playerId = $('.name').val();
      dispatch(updateContent({splash: false, map: true}));

      // set emitters and listeners
      this.watchMovement();
      this.locationInterval = setInterval(this.updateLocation, INTERVAL);
      this.moveInterval = setInterval(this.moveCharacter, INTERVAL);
      dispatch(this.updateOtherPlayers());
    };
  }


  /**
   * @returns {string} playerId
   */
  getName() {
    return this.playerId;
  }
  getScore() {
    return this.score;
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
    if (this.keyDown[UP] && !this.keyDown[DOWN] && this.top > (2 * MOVE_DIST))
      this.top -= MOVE_DIST;
    // move down
    if (this.keyDown[DOWN] && !this.keyDown[UP] && this.top < (WORLD_HEIGHT - 30))
      this.top += MOVE_DIST;
    // move left
    if (this.keyDown[LEFT] && !this.keyDown[RIGHT] && this.left > (2 * MOVE_DIST))
      this.left -= MOVE_DIST;
    // move right
    if (this.keyDown[RIGHT] && !this.keyDown[LEFT] && this.left < (WORLD_WIDTH - 30))
      this.left += MOVE_DIST;
  };


  /**
   * returns this players location object
   */
  getPlayerLocation() {
    return {
      id: this.playerId,
      pos: {
        rot: this.rotation,
        top: this.top,
        left: this.left
      }
    };
  }


  /**
   * continuously emit the new location of the player
   */
  updateLocation = () => {
    socket.emit('pos', this.getPlayerLocation());
  }


  /**
   * update the redux store for all player locations
   */
  updateOtherPlayers() {
    return (dispatch) => {
      socket.on('pos', (data) => {

        const p = data[ this.playerId ];
        if (!_.isEmpty(p)) {
          if (p && 'alive' in p && !p.alive) {
            this.score = p.s;
            dispatch(this.endService());
          }
          else {
            dispatch(updatePlayerLocations(data));
            window.scrollTo(p.left - (window.innerWidth / 2), p.top - (window.innerHeight / 2));
          }
        }

      });
    }
  }


  /**
   * fire a bullet
   */
  fireBullet() {
    if (this.clip > 0) {
      const data = {
        id: this.playerId,
        rot: this.rotation,
        top: this.top,
        left: this.left,
        d: 0
      };
      socket.emit('fire', data);
      this.clip -= 1;
    }
    else if (!this.reloading) {
      this.reloading = true;
      setTimeout(() => {
        this.clip = CLIP;
        this.reloading = false;
      }, 1500)
    }
  }


  /**
   * stops all intervals - no longer emits
   * removes socket listeners
   */
  endService() {
    return (dispatch) => {
      $(window).off();
      clearInterval(this.locationInterval);
      clearInterval(this.moveInterval);
      socket.removeAllListeners('pos');

      // end bullet service
      dispatch(bulletService.endService());

      // reset redux store
      dispatch(updateContent({splash: true, map: false}));
      dispatch(updatePlayerLocations({}));

      // kill player on server
      socket.emit('kill', { id: this.playerId });
    };
  }
}

export default new PlayerService();
