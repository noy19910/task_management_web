import './styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {SnackbarProvider} from 'notistack';
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Colors'

import { store } from "./Redux/Store";

let persistor = persistStore(store)

ReactDOM.render (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={10}>
          <App />
        </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>,
  document.getElementById ('root')
);
