import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Image, ListView, TextInput, KeyboardAvoidingView, Alert, AsyncStorage, ImageBackground,
} from 'react-native';

import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { loginUserUsingFacebook, loginUserUsingGmail } from '../../redux/actions/LoginActions'
import { setupGoogleSignIn } from '../../utils/SetupUtils'
import { styles } from '../../styles/Styles'
export class ProfileView extends Component {


  render() {
    let user = this.props.user
    let loginSource = user.gmail_id != null ? require("../../image_resources/google_icon.png") : user.facebook_id != null ? require("../../image_resources/facebook_icon.png") : null
    return (
      <View style={styles.main_container}>
        <View style={styles.container_general}>
          <View style={[styles.container_general_center, { backgroundColor: "#FFFFFF", borderRadius: 4, marginLeft: 20, marginRight: 20, marginTop: 80 }]}>
            <Image resizeMode="cover" style={[styles.profile_image, { margin: 20 }]} source={{ uri: user.picture }} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.text_view_heading_1,{marginRight: 15}]}>{user.first_name.toUpperCase()} {user.last_name.toUpperCase()}</Text>
              {
                loginSource != null ? <Image source={loginSource} style={{ height: 30, width: 30 }} /> : null
              }
            </View>
            <Text style={styles.text_view_heading_2}>{user.email}</Text>

          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginInfo: state.Login,
    user: state.User.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupGoogleSignIn: () => dispatch(setupGoogleSignIn()),
    loginUserUsingFacebook: () => dispatch(loginUserUsingFacebook()),
    loginUserUsingGmail: () => dispatch(loginUserUsingGmail())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
