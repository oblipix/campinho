import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/global.css';
import './styles/header.css';
import './styles/dropdown.css';
import './styles/footer.css';
import './styles/colors.css';
import './styles/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>
  
);


