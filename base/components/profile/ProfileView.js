import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import FacebookLoginButton from '../general_purpose/FacebookLoginButton'
import NavBarButton from '../general_purpose/NavBarButton'
import { logoutCurrentUser } from '../../redux/actions/LoginActions'
import ProfileCard from './ProfileCard'

export class ProfileView extends Component {


  static navigationOptions = (navigation) => {
    const { params = {} } = navigation.navigation.state;
    return {
      title: 'Profile',
      headerRight: <NavBarButton onPress={() => params.handleLogOut()} >Log Out</NavBarButton>,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleLogOut: this.handleLogOut.bind(this) });
  }

  handleLogOut = () => {
    this.props.logoutCurrentUser(
      this.props.user,
      () => {
        this.props.navigation.navigate('Login')
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
    flex: 1,
    backgroundColor: '#E1E1E1'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
