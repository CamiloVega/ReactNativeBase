/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import LoginView from './components/login/LoginView'
import { connect } from 'react-redux'
import { setupGoogleSignIn, initializeFireBase } from './utils/SetupUtils'
import { RootNavigator } from './navigation/NavigatorRoutes'
import Toast from './components/general_purpose/Toast'

export class App extends Component {

  componentWillMount() {
    initializeFireBase()
    setupGoogleSignIn()
  }

  renderNetworkError() {
    if (this.props.showNetworkError) {
      return <Toast type={'error'} text={'Unable to contact the server'} />
    }
    return null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderNetworkError()}
        <RootNavigator />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    showNetworkError: state.networkStatus.showNetworkError,
  }
}

export default connect(mapStateToProps, null)(App)