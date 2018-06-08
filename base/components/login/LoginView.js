import React, { Component } from 'react';
import {
  StyleSheet,
  Text, ImageBackground,
  View, Image
} from 'react-native';

import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import SocialMediaLoginButton from '../general_purpose/SocialMediaLoginButton'

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { loginUserUsingFacebook, loginUserUsingGmail, loginUserInServer } from '../../redux/actions/LoginActions'
import { setupGoogleSignIn } from '../../utils/SetupUtils'
import LoadingOverlay from 'react-native-loading-overlay'
import { SocialIcon } from 'react-native-elements'

export class LoginView extends Component {

  onFacebookLoginPressed = () => {
    this.props.loginUserUsingFacebook()
  }

  googleSignIn() {
    this.props.loginUserUsingGmail()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.signedInUser == null && nextProps.signedInUser != null) {
      this.props.navigation.navigate('Main', { user: nextProps.signedInUser })
    } else if (this.props.firebaseUser == null && nextProps.firebaseUser) {
      this.props.loginUserInServer(nextProps.firebaseUser)
    }
  }

  render() {
    const { buttonContainer,
      titleTextStyle,
      descriptionTextStyle,
      googleButtonStyle,
      mainContainer,
      titleContainer,
      signInTextStyle,
      signInContainer
    } = localStyles
    const { isFetching, error } = this.props.loginInfo
    return (
      <ImageBackground source={require('../../image_resources/login_bg.jpg')} style={{ flex: 1 }}>
        <View style={mainContainer}>
          <View style={titleContainer}>
            <Text style={titleTextStyle}>App Name</Text>
            <Text style={descriptionTextStyle}>Some kind of description</Text>
          </View>
          <View style = {signInContainer}>
            <Text style={signInTextStyle}>Sign in using Facebook or Gmail</Text>
            <View style={buttonContainer}>
              <SocialMediaLoginButton type={'facebook'} onPressed={this.onFacebookLoginPressed} />
              <SocialMediaLoginButton type={'google'} onPressed={this.googleSignIn.bind(this)} />
            </View>
          </View>
        </View>
        <LoadingOverlay visible={isFetching} text={'Registering user... '} />
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginInfo: state.Login,
    signedInUser: state.User.currentUser,
    firebaseUser: state.FirebaseCloudMessaging.firebaseUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupGoogleSignIn: () => dispatch(setupGoogleSignIn()),
    loginUserUsingFacebook: () => dispatch(loginUserUsingFacebook()),
    loginUserUsingGmail: () => dispatch(loginUserUsingGmail()),
    loginUserInServer: (firebaseUser) => dispatch(loginUserInServer(firebaseUser))
  }
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'center',
    flexDirection: 'row'
  },
   signInContainer: {
    marginBottom: 50,
  },
  
  titleTextStyle: {
    fontSize: 54,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 32,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  descriptionTextStyle: {
    fontSize: 24,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  signInTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 24
  },
  googleButtonStyle: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
