import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { setupGoogleSignIn, initializeFireBase } from '../../utils/SetupUtils'
import { initializeFirebaseMessaging } from '../../redux/actions/FCMActions'
import { loginUserUsingToken } from '../../redux/actions/LoginActions'


class PassThroughView extends Component {
    componentWillMount() {
        this.props.initializeFirebaseMessaging()
        this.props.loginUserUsingToken()
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.FCM.fcmToken == null && nextProps.FCM.fcmToken) {
            if (nextProps.userFound){
                this.props.navigation.replace('Main', {user: nextProps.signedInUser})
            } else if (nextProps.userFound === false) {
                this.props.navigation.replace('Login')
            }
        }
        if (this.props.userFound == null && nextProps.userFound != null) {
            if (nextProps.userFound && nextProps.FCM.fcmToken){
                this.props.navigation.replace('Main', {user: nextProps.signedInUser})
            } else if (nextProps.userFound === false && nextProps.FCM.fcmToken) {
                this.props.navigation.replace('Login')
            }
        }
    }

    render() {
       return ( <View />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initializeFirebaseMessaging: () => dispatch(initializeFirebaseMessaging()),
        loginUserUsingToken: () => dispatch(loginUserUsingToken())
    }
}

function mapStateToProps(state) {
    return {
        FCM: state.FirebaseCloudMessaging,
        userFound: state.Login.loggedInUserFound,
        signedInUser: state.User.currentUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassThroughView)