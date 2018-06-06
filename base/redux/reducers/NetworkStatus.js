import { LOGIN_USER_SUCCESS, USER_LIST_UPDATED, NETWORK_ERROR } from '../constants'

const initialState = {
    showNetworkError: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
        case USER_LIST_UPDATED:
            return {
                ...initialState
            }
        case NETWORK_ERROR:
            return {
                ...state,
                showNetworkError: true
            }
        default:
            return state
    }
}