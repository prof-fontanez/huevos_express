import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A0522D', // Saddle Brown - hen wings
      contrastText: '#FFF8DC', // Cornsilk for text contrast
    },
    secondary: {
      main: '#E97451', // Soft Orange - feathers & comb
      contrastText: '#FFF8DC',
    },
    background: {
      default: '#FFF8DC', // Cornsilk - soft background
      paper: '#D2B48C',   // Tan - paper cards, modals
    },
    text: {
      primary: '#3B2F2F', // Dark brown - main text
      secondary: '#A0522D', // Slightly lighter brown
    },
    warning: {
      main: '#F4C430', // Golden Yellow - accent
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      color: '#3B2F2F',
    },
    body1: {
      color: '#3B2F2F',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
