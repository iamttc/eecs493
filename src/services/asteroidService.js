import { socket } from './baseService';
import { updateAsteroids } from '../redux/actions';

export class AsteroidService {
  startService() {
    return (dispatch) => {
      socket.on('asteroid locations', (data) => {
        dispatch(updateAsteroids(data));
      });
    }
  }
}

export default new AsteroidService();
