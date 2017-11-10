import { LOGIN_USER_SUCCESS, REFRESH_CURRENT_USER } from '../constants'

const initialState = {
    currentUser: null,
}

export default function userReducer (state = initialState, action) {
    console.log("USER REDUCER", action.data)
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
        case REFRESH_CURRENT_USER:
            return {
                ...state,
                currentUser: action.data,
            }   
        default:
            return state
    }
}