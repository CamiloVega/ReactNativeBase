import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const AppMainColor = '#898989'

const Button = ({ style, onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15, 
  },
  buttonStyle: {
    height: 60,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: AppMainColor,
    borderRadius: 5,
    margin: 5,
    
  }
};

export default Button;