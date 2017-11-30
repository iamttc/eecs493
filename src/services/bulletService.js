import { socket } from './baseService';
import { updateBullets } from '../redux/actions';

export class BulletService {
  initBulletService() {
    return (dispatch) => {
      socket.on('bullet locations', (data) => {
        dispatch(updateBullets(data));
      });
    }
  }
}

export default new BulletService();
