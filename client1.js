// client.js

const io = require('socket.io-client');
const readline = require('readline');
const robot = require('robotjs');

// Connect to the server
const socket = io.connect('http://localhost:3000');

let sendMouseData = false;

// Event listener for receiving messages from other clients
socket.on('message', (data) => {
  console.log('Received message:', data);
});

// Read user input from the terminal and send it to other clients
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if(input === 'x'){
    sendMouseData = !sendMouseData;
    if(sendMouseData){
      console.log('Sending mouse coordinates to the server...');
    }
    else{
      console.log('Stopped sending mouse coordinates to the server.');
    }
  }
  socket.emit('message', input); // Send the input as a message to other clients
});

socket.on('mouseMove', (data) => {
  if (sendMouseData) {
    console.log(`Received mouse coordinates: x=${data.x}, y=${data.y}`);
  }
});

// Periodically send mouse movement data to the server if the flag is true
setInterval(() => {
  if (sendMouseData) {
    const mouse = robot.getMousePos();
    socket.emit('mouseMove', { x: mouse.x, y: mouse.y });
  }
}, 1000); // Adjust the interval as needed