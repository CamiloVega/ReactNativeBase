import {FCM_TOKEN, LOGIN_FIREBASE_SUCCESS, LOGOUT_USER} from '../constants'

const initialState = {
    fcmToken: null,
    firebaseUser: null,
}

export default function fmcReducer (state = initialState, action) {
    switch (action.type) {
        case FCM_TOKEN:
            return {
                ...state,
                fcmToken: action.data,
            }
            case LOGIN_FIREBASE_SUCCESS: 
            return {
                ...state, 
                firebaseUser: action.data
            }
            case LOGOUT_USER: 
            return {
                ...state,
                firebaseUser: null
            }
        default:
            return state
    }
}