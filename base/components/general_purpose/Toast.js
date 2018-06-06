import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, Platform } from 'react-native';
const { width } = Dimensions.get('window');

const Toast = (props) => {
  var color = '#b52424'
  switch (props.type) {
    case 'success':
      color = 'rgb(63,163,63)'
      break;
    case 'warning':
      color = 'rgb(217,172,30)'
      break;
    case 'error':
    default:
      color = '#b52424'
  }
  const margin = (Platform.OS === 'ios') ? 20 : 0;
  const {toastContainer, toastTextStyle} = styles
  return (
    <View style={[toastContainer, { backgroundColor: color, marginTop: margin }]}>
      <Text style={toastTextStyle}>{props.text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  toastContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastTextStyle: {
    color: '#fff'
  }
});
export default Toast;