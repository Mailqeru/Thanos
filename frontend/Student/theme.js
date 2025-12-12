// theme.js
// Centralized theme configuration matching your CSS :root variables

const APP_THEME = Object.freeze({
  primary: '#667eea',
  primaryDark: '#764ba2',
  secondary: '#4158d0',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  dark: '#1f2937',
  light: '#f3f4f6',
  white: '#ffffff',

  // Optional: Add semantic aliases
  textPrimary: '#333333',
  background: '#f8f9fc',
  sidebarWidth: '280px',
  headerHeight: '70px'
});

// Optional: Export if using modules (not needed for simple <script> use)
// But we'll keep it global for compatibility with your current setup