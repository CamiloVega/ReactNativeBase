/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoginView from './components/login/LoginView'
import { Provider } from 'react-redux'
import configureStore from './ConfigureStore'
import {setupGoogleSignIn, initializeFireBase} from './utils/SetupUtils'
import {RootNavigator} from './navigation/NavigatorRoutes'
const store = configureStore()

export default class App extends Component {

  componentWillMount() {
    initializeFireBase()
    setupGoogleSignIn()
  }

  render() {
    return (
      <Provider store = {store}>
        <RootNavigator />
      </Provider>
    );
  }
}

