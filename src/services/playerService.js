import _ from 'lodash';
import { $, socket } from './baseService';
import {
  updatePlayerLocations,
  updateMyData,
  updateContent,
  error
} from '../redux/actions';
import bulletService from '../services/bulletService';

// constants
const UP = 87;
const DOWN = 83;
const LEFT = 65;
const RIGHT = 68;
const R = 82;

const INTERVAL = 32;
const MOVE_DIST = 5;
const AMMO = 10;

const WORLD_HEIGHT = 3000;
const WORLD_WIDTH = 3000;


export class PlayerService {
  constructor() {
    this.rotation = 0;
    this.velocity = 10;
    this.playerId = '';
    this.score = 0;
    this.locationInterval = null;
    this.moveInterval = null;
  }


  /**
   * sets window listers and socket emits
   */
  startService() {
    return (dispatch) => {
      // positioning
      this.top = Math.floor(Math.random() * (WORLD_HEIGHT - 100)) + 50;
      this.left = Math.floor(Math.random() * (WORLD_WIDTH - 100)) + 50;
      this.keyDown = {
        87: false, // up
        83: false, // down
        65: false, // left
        68: false, // right
        82: false  // R
      };

      // player variables
      this.ammo = AMMO;
      this.reloading = false;
      this.removeIntervals();

      // set content
      this.playerId = $('.name').val();
      if (_.isEmpty(this.playerId)) {
        dispatch(this.showError('Please specify a name'));
        return;
      }

      socket.emit('players');
      socket.on('players', (data) => {
        if (_.some(data, p => this.playerId === p)) {
          dispatch(this.showError('That name is already in use'));
          return;
        }
        dispatch(this.start());
      });
    };
  }

  start() {
    return (dispatch) => {
      // redux store
      dispatch(error(null));
      dispatch(updateContent({splash: false, map: true}));
  
      // set emitters and listeners
      this.watchMovement();
      this.locationInterval = setInterval(() => dispatch(this.updateLocation()), INTERVAL);
      this.moveInterval = setInterval(this.moveCharacter, INTERVAL);
      dispatch(this.updateOtherPlayers());
    };
  }

  /**
   * show an error
   */
  showError(msg) {
    return (dispatch) => {
      dispatch(error(msg));
      setTimeout(() => {
        dispatch(error(null));
      }, 3000);
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
      this.rotation = Math.atan2(this.top - e.pageY, this.left - e.pageX) - Math.PI/2;
    });
    $(window).mousedown(() => {
      this.fireBullet();
    });
  }


  /**
   * returns this players location object
   */
  getPlayerLocation() {
    return {
      id: this.playerId,
      pos: {
        rot: this.rotation.toFixed(1),
        top: this.top,
        left: this.left
      }
    };
  }


  /**
   * returns other player data
   */
  getPlayerData(alive = true) {
    return {
      ammo: this.ammo,
      reloading: this.reloading,
      score: this.score,
      alive
    }
  }


  /**
   * continuously emit the new location of the player
   */
  updateLocation() {
    return (dispatch) => {
      const loc = this.getPlayerLocation();
      socket.emit('pos', loc);
      const data = { ...loc, ...this.getPlayerData() };
      dispatch(updateMyData(data));
      window.scrollTo(loc.pos.left - (window.innerWidth / 2), loc.pos.top - (window.innerHeight / 2));
    };
  }


  /**
   * move the character based on keypress
   * update redux store
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
    // reload
    if (this.keyDown[R])
      this.reload();
  };


  /**
   * update the redux store for all player locations
   */
  updateOtherPlayers() {
    return (dispatch) => {
      socket.on('pos', (data) => {

        const p = data[ this.playerId ];
        if (_.isEmpty(p))
          return;

        this.score = p.s;
        if (_.has(p, 'alive') && !p.alive)
          dispatch(this.endService());
        else dispatch(updatePlayerLocations(data));
      });
    }
  }


  /**
   * fire a bullet
   */
  fireBullet() {
    if (!this.reloading && this.ammo > 1) {
      const data = {
        id: this.playerId,
        rot: this.rotation,
        top: this.top,
        left: this.left,
        d: 0
      };
      socket.emit('fire', data);
      this.ammo -= 1;
    }
    else this.reload();
  }


  /**
   * reload
   */
  reload() {
    if (!this.reloading) {
      this.reloading = true;
      setTimeout(() => {
        this.ammo = AMMO;
        this.reloading = false;
      }, 1000);
    }
  }


  /**
   * stops all intervals - no longer emits
   * removes socket listeners
   */
  endService() {
    return (dispatch) => {
      dispatch(this.removePlayer());
      this.removeIntervals();

      // watch a 1.5 seconds of gameplay after death
      setTimeout(() => {
        socket.removeAllListeners('pos');
        dispatch(bulletService.endService());
        dispatch(updateContent({splash: true, map: false}));
        dispatch(updatePlayerLocations({}));
      }, 2000);
    };
  }

  removePlayer() {
    return (dispatch) => {
      socket.removeAllListeners('players');
      socket.emit('kill', { id: this.playerId });
      dispatch(updateMyData(
        { ...this.getPlayerLocation(), ...this.getPlayerData(false) }
      ));
    };
  }

  removeIntervals() {
    $(window).off();
    clearInterval(this.locationInterval);
    clearInterval(this.moveInterval);
    this.locationInterval = null;
    this.moveInterval = null;
  }
}

export default new PlayerService();
