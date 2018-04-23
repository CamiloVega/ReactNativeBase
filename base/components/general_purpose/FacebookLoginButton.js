import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const FacebookLoginButton = (props) => {
  const {container, facebook_button_text_style, facebook_icon} = styles
  
  return (  
      <TouchableOpacity style = {container} onPress={props.onPressed} > 
        <Image source={require('../../image_resources/facebook_login_icon.png')} style = {facebook_icon}/>
          <Text style = {facebook_button_text_style}>
            Continue with Facebook
          </Text>
      </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    borderRadius: 5,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row'
  },
  facebook_button_text_style: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  facebook_icon: {
    marginLeft: 10, 
    marginRight: 10,
    height: 40,
    width: 40
  }
});

export default FacebookLoginButton