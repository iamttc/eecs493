import $ from 'jquery';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
// const socket = openSocket('http://space-fighters-backend.herokuapp.com');

export { $, socket };
