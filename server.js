// server.js

const server = require('http').createServer();
const io = require('socket.io')(server);

// Set up WebSocket communication
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Event listener for receiving messages from clients
  socket.on('message', (data) => {
    // Broadcast the received message to all other clients except the sender
    socket.broadcast.emit('message', data);
  });

  // Event listener for receiving mouse move data from clients
  socket.on('mouseMove', (data) => {
    // Log the received mouse move data
    console.log(`Received mouse coordinates from client ${socket.id}: x=${data.x}, y=${data.y}`);

    // Broadcast the received mouse move data to all other clients except the sender
    socket.broadcast.emit('mouseMove', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});