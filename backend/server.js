const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: 'http://web.fc.utm.my',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/ttms'
  }
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3001`);
  console.log(`Frontend path: ${path.join(__dirname, '../frontend')}`);
});