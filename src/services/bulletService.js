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
    socket.removeAllListeners('bullet locations');
  }
}

export default new BulletService();
