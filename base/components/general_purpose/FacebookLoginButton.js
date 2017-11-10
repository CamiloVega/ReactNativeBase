import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class FacebookLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      buttonText: props.buttonText,
      onPressed: props.onPressed
     };
  }
  
  render() {
    return (  
        <TouchableOpacity style = {styles.container} onPress={this.props.onPressed} > 
            <Text style = {styles.facebook_button_text_style}>
              {this.state.buttonText}
            </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 305,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    borderRadius: 5,
  },
  facebook_button_text_style: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});


AppRegistry.registerComponent('FacebookLoginButton', () => FacebookLoginButton);