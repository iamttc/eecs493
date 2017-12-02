import $ from 'jquery';
import openSocket from 'socket.io-client';
const socket = openSocket('localhost:8080');
// const socket = openSocket('http://space-fighters.herokuapp.com');

export { $, socket };
