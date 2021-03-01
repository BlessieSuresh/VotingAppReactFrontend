import React from 'react';
import { Navigate } from 'react-router-dom';

import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <LoginView /> },
      { path: 'products', element: <ProductListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
