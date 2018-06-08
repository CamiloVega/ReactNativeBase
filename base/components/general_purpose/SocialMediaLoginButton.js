import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const SocialMediaLoginButton = (props) => {

  const { container, button_text_style, icon_style } = styles

  let icon_resource = null
  let container_style = container
  let background_color = '#FFFFFF'
  let text = ''
  console.log("BUTTON TYPE" , props.type)
  if (props.type == 'facebook') {
    icon_resource = require('../../image_resources/facebook_login_icon.png')
    background_color = '#4267B2'
  } else if (props.type == 'google') {
    icon_resource = require('../../image_resources/google_icon.png')
  }
  
  return (
    <TouchableOpacity style={[container, {backgroundColor: background_color}]} onPress={props.onPressed} >
      <Image source={icon_resource} style={icon_style} />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row'
  },
  button_text_style: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  icon_style: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    width: 40
  }
});

export default SocialMediaLoginButton