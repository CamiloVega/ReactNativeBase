import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import Button from '../general_purpose/Button'
import { logoutCurrentUser } from '../../redux/actions/LoginActions'
import ProfileCard from './ProfileCard'
export class ProfileView extends Component {

  static navigationOptions = (navigation) => {
    const { params = {} } = navigation.navigation.state;
    return {
      title: 'Profile',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(10,49,52,1)',
      },
      headerTitleStyle:
        {
          color: 'white',
        },
      headerRight: <Button onPress={() => params.handleLogOut()} >Log Out</Button>
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleLogOut: this.handleLogOut.bind(this) });
  }

  handleLogOut = () => {
    this.props.logoutCurrentUser(
      this.props.user,
      () => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
      },
      (error) => {
        alert("Error while loging out")
      }

    )
  }

  render() {
    const { user, logoutCurrentUser } = this.props
    return (
      <View style={styles.main_container}>
      { user != null && <ProfileCard user = {user} /> }
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
    logoutCurrentUser: (user, onSuccess, onError) => dispatch(logoutCurrentUser(user, onSuccess, onError)),
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
