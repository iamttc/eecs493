import { socket } from './baseService';
import { updateBullets } from '../redux/actions';

export class BulletService {
  startService() {
    return (dispatch) => {

      // listen for bullet locations
      socket.on('bullet locations', (data) => {
        dispatch(updateBullets(data));
      });

      // handle page navigation away
      window.onbeforeunload = () => {
        dispatch(this.endService());
      };
    }
  }

  endService() {
    socket.removeAllListeners('bullet locations');
  }
}

export default new BulletService();
