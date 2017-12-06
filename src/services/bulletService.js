import { socket } from './baseService';
import { updateBullets } from '../redux/actions';

export class BulletService {
  startService() {
    return (dispatch) => {
      socket.on('bullet', (data) => {
        dispatch(updateBullets(data));
      });
    }
  }

  endService() {
    return (dispatch) => {
      socket.removeAllListeners('bullet');
      dispatch(updateBullets([]));
    };
  }
}

export default new BulletService();
