import React from 'react';
import { Provider } from 'react-redux';
import { Persona }  from './components/Persona';
import { store } from './store/store';
import { AppRouter } from './router/AppRouter';

export const App = () => {
  return (
      <Provider
       store={ store }
      >

        <AppRouter />
     
  
      </Provider>
  )
}

 