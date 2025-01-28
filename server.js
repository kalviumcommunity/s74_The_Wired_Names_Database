const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');

// Your routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Invalid route handler
app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
