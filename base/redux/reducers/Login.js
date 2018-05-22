import { LOGIN_USER, LOGOUT_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_CANCELLED, TOKEN_NOT_FOUND, TOKEN_NOT_VALID, FETCHING_TOKEN } from '../constants'

const initialState = {
    isFetching: false,
    error: false,
    loggedInUserFound: null,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        case FETCHING_TOKEN:
            return {
                ...state,
                isFetching: true,
                error: false,
                loggedInUserFound: null,
            }
        case LOGOUT_USER:
        case LOGIN_USER_CANCELLED:
            return { ...initialState }
        case TOKEN_NOT_FOUND:
            return {
                ...initialState,
                loggedInUserFound: false,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                loggedInUserFound: true,
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        default:
            return state
    }
}