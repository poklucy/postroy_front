import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

export const AppRouter: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};
