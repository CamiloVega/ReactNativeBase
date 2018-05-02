import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { setupGoogleSignIn, initializeFireBase } from '../../utils/SetupUtils'
import { initializeFirebaseMessaging } from '../../redux/actions/FCMActions'


class PassThroughView extends Component {
    componentWillMount() {
        this.props.initializeFirebaseMessaging()
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.FCM.fcmToken == null && nextProps.FCM.fcmToken) {
            this.props.navigation.navigate('Login')
        }
    }

    render() {
       return ( <View />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initializeFirebaseMessaging: () => dispatch(initializeFirebaseMessaging())
    }
}

function mapStateToProps(state) {
    return {
        FCM: state.FirebaseCloudMessaging
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassThroughView)