import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import FlashCards from './components/FlashCards.js'
import Home from './components/Home.js'
import Contact from './components/Contact.js'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <Home />  */}
    {/* <FlashCards /> */}
    {/* <App /> */}
    <Contact />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
