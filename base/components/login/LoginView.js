import React, { Component } from 'react';
import {
  StyleSheet,
  Text, ImageBackground,
  View, Image
} from 'react-native';

import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { loginUserUsingFacebook, loginUserUsingGmail, loginUserInServer } from '../../redux/actions/LoginActions'
import { setupGoogleSignIn } from '../../utils/SetupUtils'
import LoadingOverlay from 'react-native-loading-overlay'

export class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation
    };
  }

  onFacebookLoginPressed = () => {
    this.props.loginUserUsingFacebook()
  }

  googleSignIn() {
    this.props.loginUserUsingGmail()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.signedInUser == null && nextProps.signedInUser != null) {
      this.props.navigation.navigate('Profile')
    } else if (this.props.firebaseUser == null && nextProps.firebaseUser) {
      this.props.loginUserInServer(nextProps.firebaseUser)
    }
  }

  render() {
    const { buttonContainer,
      textViewStyle,
      googleButtonStyle,
      mainContainer
    } = localStyles
    const { isFetching, error } = this.props.loginInfo
    return (
      <ImageBackground source={require('../../image_resources/login_bg.jpg')} style={{flex: 1}}>
        <View style={mainContainer}>
          <Text style={textViewStyle}>CV DEVELOPERS EXAMPLE</Text>
          <View style={buttonContainer}>
            <FacebookLoginButton onPressed={this.onFacebookLoginPressed} />
            <GoogleSigninButton
              style={googleButtonStyle}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.googleSignIn.bind(this)} />
          </View>
        </View>
        <LoadingOverlay visible={isFetching} text = {'Registering user... '}/>
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
  buttonContainer: {
    height: 120,
    marginBottom: 50,
    justifyContent: 'space-between'
  },
  textViewStyle: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#00000000',
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 60,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  googleButtonStyle: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
