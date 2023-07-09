import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './assets/css/index.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css";
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.Fragment>
)
