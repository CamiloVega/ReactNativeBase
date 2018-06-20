import {
    LOGIN_USER,
    LOGOUT_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_CANCELLED,
    TOKEN_NOT_FOUND,
    TOKEN_NOT_VALID,
    REFRESH_CURRENT_USER,
    LOGIN_FIREBASE_SUCCESS,
    CURRENT_USER_TOKEN,
    FETCHING_TOKEN,
    NETWORK_ERROR
} from '../constants'
import { AsyncStorage } from 'react-native'
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin'
import * as UserService from '../../api/UserService'
import firebase from 'firebase'

export const loginUserUsingGmail = () => async (dispatch, getState) => {
    try {
        const { fcmToken } = getState().FirebaseCloudMessaging
        dispatch(loginUserProgress())
        let googleUser = await GoogleSignin.signIn()
        const user = {
            first_name: googleUser.first_name,
            last_name: googleUser.last_name,
            picture: googleUser.photo,
            email: googleUser.email,
            gmail_id: googleUser.id.toString(),
            fcm_token: fcmToken
        }
        const provider = firebase.auth.GoogleAuthProvider
        continueSignInWithFirebase(user, provider, googleUser.idToken, dispatch)
    } catch (error) {
        console.log("Error loginUserUsingGmail", error)
        dispatch(loginUserFailed())
    }
}


export const loginUserUsingFacebook = () => async (dispatch, getState) => {
    try {
        const { fcmToken } = getState().FirebaseCloudMessaging
        let result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        if (result.isCancelled) {
            console.log("Error loginUserUsingFacebook isCancelled")
            dispatch(loginUserCancelled())
        } else {
            console.log("loginUserUsingFacebook", fcmToken)
            continueSuccessfulFacebookLogin(result, fcmToken, dispatch)
        }
    } catch (error) {
        console.log("Error loginUserUsingFacebook", error)
        dispatch(loginUserFailed())
    }
}


const continueSuccessfulFacebookLogin = async (result, fcmToken, dispatch) => {
    let data = await AccessToken.getCurrentAccessToken()
    let accessToken = data.accessToken;
    const responseInfoCallback = (error, result) => {
        if (error) {
            console.log("Error continueSuccessfulFacebookLogin", error)
            dispatch(loginUserFailed())
            return
        }
        const user = {
            first_name: result.first_name,
            last_name: result.last_name,
            picture: "https://graph.facebook.com/" + result.id.toString() + "/picture?width=400&height=500",
            email: result.email,
            facebook_id: result.id.toString(),
            fcm_token: fcmToken
        }
        const provider = firebase.auth.FacebookAuthProvider
        continueSignInWithFirebase(user, provider, accessToken, dispatch)

    }
    const infoRequest = new GraphRequest(
        '/me',
        {
            accessToken: accessToken,
            parameters: {
                fields: {
                    string: 'email, first_name, last_name, picture, id'
                }
            }
        },
        responseInfoCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();

}

const continueSignInWithFirebase = async (user, authProvider, accessToken, dispatch) => {
    try {
        const credential = authProvider.credential(accessToken)
        let result = await firebase.auth().signInWithCredential(credential)
        const { currentUser } = firebase.auth()
        user.firebase_uid = currentUser.uid
        user.display_name = currentUser.displayName
        dispatch(loginFirebaseSuccess(user))
    } catch (error) {
        console.log("Error continueSignInWithFirebase", error)
        dispatch(loginUserFailed())
    }
}

export const loginUserInServer = (user) => async dispatch => {
    try {
        let registeredUser = await UserService.logUserOnServer(user)
        global.authToken = registeredUser.token
        await AsyncStorage.setItem(CURRENT_USER_TOKEN, registeredUser.token)
        dispatch(loginUserSuccess(registeredUser))
    } catch (error) {
        console.log("Error loginUserInServer", error)
        dispatch(networkError())
        dispatch(loginUserFailed())
    }
}


export const loginUserUsingToken = () => async dispatch => {
    dispatch(loginUserTokenProgress())
    let token = await AsyncStorage.getItem(CURRENT_USER_TOKEN)
    if (!token) {
        dispatch(tokenNotFound())
        return
    }
    try {
        global.authToken = token
        let registeredUser = await UserService.logUserUsingTokenServer(token)
        dispatch(loginUserSuccess(registeredUser))
    } catch (error) {
        dispatch(networkError())
        dispatch(loginUserFailed())
    }
}


export const logoutCurrentUser = (onSuccess, onError) => async (dispatch, getState) => {
    try {
        await AsyncStorage.clear()
        global.authToken = null
        await firebase.auth().signOut()
        LoginManager.logOut()
        GoogleSignin.signOut()
        dispatch(logoutUserSuccess())
        onSuccess()
    } catch (error) {
        console.log("Error logoutCurrentUser", error)
        onError(error)
    }
}


function loginUserProgress() {
    return {
        type: LOGIN_USER,
    }
}

function loginUserTokenProgress() {
    return {
        type: FETCHING_TOKEN,
    }
}

function tokenNotFound() {
    return {
        type: TOKEN_NOT_FOUND,
    }
}

function logoutUserSuccess() {
    return {
        type: LOGOUT_USER,
    }
}

function loginUserFailed() {
    return {
        type: LOGIN_USER_ERROR,
    }
}

function loginUserCancelled() {
    return {
        type: LOGIN_USER_CANCELLED,
    }
}


function loginFirebaseSuccess(data) {
    return {
        type: LOGIN_FIREBASE_SUCCESS,
        data
    }
}

function loginUserSuccess(data) {
    return {
        type: LOGIN_USER_SUCCESS,
        data
    }
}

function networkError() {
    return {
        type: NETWORK_ERROR,
    }
}