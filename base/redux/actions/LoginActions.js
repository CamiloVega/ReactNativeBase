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
    FETCHING_TOKEN
} from '../constants'
import { AsyncStorage } from 'react-native'
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin'
import { logUserOnServer, logUserUsingTokenServer } from '../../api/UserService'
import firebase from 'firebase'

export function loginUserUsingGmail() {
    return (dispatch, getState) => {
        const { fcmToken } = getState().FirebaseCloudMessaging
        dispatch(loginUserProgress())
        GoogleSignin.signIn()
            .then((googleUser) => {
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
            })
            .catch((error) => {
                console.log("Error loginUserUsingGmail", error)
                dispatch(loginUserFailed())
            })
            .done();
    }
}

export function loginUserUsingFacebook() {
    return (dispatch, getState) => {
        const { fcmToken } = getState().FirebaseCloudMessaging
        dispatch(loginUserProgress())
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    console.log("Error loginUserUsingFacebook isCancelled")
                    dispatch(loginUserCancelled())
                } else {
                    continueSuccessfulFacebookLogin(result, fcmToken, dispatch)
                }
            }
        ).catch((error) => {
            console.log("Error loginUserUsingFacebook", error)
            dispatch(loginUserFailed())
        });
    }
}

function continueSuccessfulFacebookLogin(result, fcmToken, dispatch) {
    AccessToken.getCurrentAccessToken().then(
        (data) => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
                if (error) {
                    console.log("Error continueSuccessfulFacebookLogin", error)
                    dispatch(loginUserFailed())
                } else {
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
        })
}

function continueSignInWithFirebase(user, authProvider, accessToken, dispatch) {
    const credential = authProvider.credential(accessToken)
    firebase.auth().signInWithCredential(credential).then((result) => {
        const { currentUser } = firebase.auth()
        user.firebase_uid = currentUser.uid
        user.display_name = currentUser.displayName
        dispatch(loginFirebaseSuccess(user))
    }, (error) => {
        console.log("Error continueSignInWithFirebase", error)
        dispatch(loginUserFailed())
    })
}

export function loginUserInServer(user) {
    return (dispatch) => {
        logUserOnServer(user, (registeredUser) => {
            global.authToken = registeredUser.token
            AsyncStorage.setItem(CURRENT_USER_TOKEN, registeredUser.token)
                .then(() => {
                    dispatch(loginUserSuccess(registeredUser))
                })
        })
    }
}

export function loginUserUsingToken() {
    return (dispatch) => {
        dispatch(loginUserTokenProgress())
        AsyncStorage.getItem(CURRENT_USER_TOKEN)
            .then((token) => {
                if(token){
                    global.authToken = token
                    logUserUsingTokenServer(token, (registeredUser) => {
                        dispatch(loginUserSuccess(registeredUser))
                    })
                } else {
                    dispatch(tokenNotFound())
                }
            })
    }
}

export function logoutCurrentUser(user, onSuccess, onError) {
    return (dispatch, getState) => {
        AsyncStorage.clear().then(() => {
            global.authToken = null
            firebase.auth().signOut().then((result) => {
                LoginManager.logOut()
                GoogleSignin.signOut()
                dispatch(logoutUserSuccess())
                onSuccess()
        }, (error) => {
            console.log("Error logoutCurrentUser", error)
            onError(error)
        })
           
        })
        
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