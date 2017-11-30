import $ from 'jquery';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
// const socket = openSocket('http://space-fighters.herokuapp.com');

export { $, socket };
