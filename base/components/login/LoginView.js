import React, { Component } from 'react';
import {
  StyleSheet,
  Text, ImageBackground,
  View, Image} from 'react-native';

import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import {loginUserUsingFacebook, loginUserUsingGmail} from '../../redux/actions/LoginActions'
import {setupGoogleSignIn} from '../../utils/SetupUtils'
import {styles} from '../../styles/Styles' 
export class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation
    };
  }

  handleOnTextChanged = (varName, inputText) => {
    this.setState({
      [varName]: inputText,
    })
  }

  onFacebookLoginPressed = () => {
      this.props.loginUserUsingFacebook()
  }

  googleSignIn() {
        this.props.loginUserUsingGmail()
  }

componentWillUpdate (nextProps, nextState) {
    if (nextProps.signedInUser != null) {
      console.log("THIS IS THE USER LOGIN VIEW", nextProps.signedInUser)
       this.props.navigation.navigate('Profile')
    }  
}
  render() {

    return (
      <ImageBackground source ={require('../../image_resources/login_background_1.jpg')} style={[styles.container_general_space_between, {}]}>
          <Text style={[styles.text_view_heading_1, { color: '#FFFFFF', textAlign: 'center', margin: 60, backgroundColor: 'rgba(0,0,0,0)', }]}>CV DEVELOPERS EXAMPLE</Text>
              <View style={[styles.container_general_center,{ alignItems: 'center',}]}>
                <FacebookLoginButton buttonText="Continue with Facebook" onPressed={this.onFacebookLoginPressed} />
                <GoogleSigninButton
                  style={{ width: 312, height: 50, margin: 30, borderRadius: 4 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={this.googleSignIn.bind(this)} />
              </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginInfo: state.Login,
    signedInUser: state.User.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupGoogleSignIn: () => dispatch(setupGoogleSignIn()),
    loginUserUsingFacebook: () => dispatch(loginUserUsingFacebook()),
    loginUserUsingGmail: () => dispatch(loginUserUsingGmail())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
