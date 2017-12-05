import { socket } from './baseService';
import { updateBullets } from '../redux/actions';

export class BulletService {
  startService() {
    return (dispatch) => {
      socket.on('bullet locations', (data) => {
        dispatch(updateBullets(data));
      });
    }
  }

  endService() {
    return (dispatch) => {
      socket.removeAllListeners('bullet locations');
      dispatch(updateBullets([]));
    };
  }
}

export default new BulletService();
