import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/bootstrap.min.css';
import './styles/index.css';
import App from './_app/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);
