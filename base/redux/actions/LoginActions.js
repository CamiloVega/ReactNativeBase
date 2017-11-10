import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_CANCELLED, TOKEN_NOT_FOUND, TOKEN_NOT_VALID, REFRESH_CURRENT_USER } from '../constants'
import { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin'
import firebase from 'firebase'

export function loginUserUsingFacebook() {
    return (dispatch) => {
        dispatch(loginUserProgress())
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    dispatch(loginUserCancelled())
                } else {
                    continueSuccessfulFacebookLogin(result, (user) => {
                        if (user == null) {
                            dispatch(loginUserFailed())
                        } else {
                            dispatch(loginUserSuccess(user))
                        }
                    })
                }
            },
            (error) => {
                dispatch(loginUserFailed())
            }
        );
    }
}

function continueSuccessfulFacebookLogin(result, userCallback) {
    AccessToken.getCurrentAccessToken().then(
        (data) => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
                if (error) {
                    dispatch(loginUserFailed())
                } else {
                    //TODO WHAT TO DO WITH THE USER
                    var user = {
                        first_name: result.first_name,
                        last_name: result.last_name,
                        picture: result.picture.data.url,
                        email: result.email,
                        facebook_id: result.id.toString()
                    }
                    console.log("this is the result from Facebook", user)
                    const provider = firebase.auth.FacebookAuthProvider
                    continueSignInWithFirebase(provider, accessToken, () => {
                        userCallback(user);
                    })
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

function continueSignInWithFirebase(authProvider, accessToken, onSuccess, onError) {
    const credential = authProvider.credential(accessToken)
    firebase.auth().signInWithCredential(credential).then((result) => {
        console.log("this is the result from FIREBASE", result)
        onSuccess()
    }, (error) => {
        onError(error)
    })
}

export function loginUserUsingGmail() {
    console.log("GOOGLE loginUserUsingGmail")
    return (dispatch) => {
        dispatch(loginUserProgress())
        GoogleSignin.signIn()
            .then((googleUser) => {
                console.log("this is the result from Google", googleUser)
                var user = {
                    first_name: googleUser.first_name,
                    last_name: googleUser.last_name,
                    picture: googleUser.photo,
                    email: googleUser.email,
                    gmail_id: googleUser.id.toString()
                }
                const provider = firebase.auth.GoogleAuthProvider
                continueSignInWithFirebase(provider, googleUser.idToken, 
                    () => { // success
                        dispatch(loginUserSuccess(user))
                    }, (err) => { // error
                        console.log("Firebase ERROR", err)
                        dispatch(loginUserFailed())
                    }
                )

            })
            .catch((err) => {
                console.log("GOOGLE ERROR", err)
                dispatch(loginUserFailed())
            })
            .done();
    }
}



function loginUserProgress() {
    return {
        type: LOGIN_USER,
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

function loginUserSuccess(data) {
    return {
        type: LOGIN_USER_SUCCESS,
        data
    }
}