const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors'); // Add this

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors()); // Add this line

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: 'http://web.fc.utm.my',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/ttms'
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying: ${req.method} ${req.url} -> ${proxyReq.path}`);
  }
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3001`);
  console.log(`Frontend path: ${path.join(__dirname, '../frontend')}`);
});