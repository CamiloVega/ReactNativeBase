import { LOGIN_USER_SUCCESS, LOGOUT_USER, REFRESH_CURRENT_USER } from '../constants'

const initialState = {
    currentUser: null,
}

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
        case REFRESH_CURRENT_USER:
            return {
                ...state,
                currentUser: action.data,
            }   
            case LOGOUT_USER : 
            return {
                ...state, 
                currentUser: null
            }
        default:
            return state
    }
}