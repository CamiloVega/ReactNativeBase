import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Image, ListView, TextInput, KeyboardAvoidingView, Alert, AsyncStorage,ImageBackground,
} from 'react-native';

import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import {loginUserUsingFacebook, loginUserUsingGmail} from '../../redux/actions/LoginActions'
import {setupGoogleSignIn} from '../../utils/SetupUtils'
import {styles} from '../../styles/Styles' 
export class ProfileView extends Component {


  render() {
    let user = this.props.user
    return (
      <View style={styles.main_container}>
            <View style ={styles.container_general}> 
              <View style = {[styles.container_general_center, {} ]}>
                <Image resizeMode="cover" style={styles.profile_image} source={{uri: user.picture}}/>
                <Text style={styles.text_view_heading_1}>{user.first_name.toUpperCase()} {user.last_name.toUpperCase()}</Text>
              </View>
              <View style = {[styles.container_general, {marginTop: 50} ]}>
              <Text style={styles.text_view_heading_1}>Email </Text>
              <Text style={styles.text_view_body_1}>{user.email}</Text>
              <Text style={styles.text_view_heading_1}>Signed in with </Text>
              { user.gmail_id != null ? 
                  <Text style={styles.text_view_body_1}>Gmail</Text>
                : user.facebook_id != null ?  
                <Text style={styles.text_view_body_1}>Facebook</Text> :
                <Text style={styles.text_view_body_1}>None</Text>
              }
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
