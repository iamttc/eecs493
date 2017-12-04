import $ from 'jquery';
import openSocket from 'socket.io-client';
const socket = openSocket('35.1.228.53:8080');
// const socket = openSocket('http://space-fighters.herokuapp.com');

export { $, socket };
