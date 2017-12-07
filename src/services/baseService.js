import $ from 'jquery';
import openSocket from 'socket.io-client';
const socket = openSocket('https://space-fighters-backend.herokuapp.com');
// const socket = openSocket('localhost:8080');

export { $, socket };
