import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './ConfigureStore'
import App from './App'

const store = configureStore()

const Base = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('base', () => Base);
