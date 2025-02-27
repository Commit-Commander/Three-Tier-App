// Importing necessary components from React & React-Dom
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main component of the application
import App from './App.jsx';

// Rendering the root component of the application
// Wrapping the App component with React.StrictMode for additional checks
// ReactDOM.createRoot is used for concurrent mode rendering
ReactDOM.createRoot(document.getElementById('root')).render(<App />);