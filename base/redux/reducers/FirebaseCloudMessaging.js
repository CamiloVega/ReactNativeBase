import {FCM_TOKEN} from '../constants'

const initialState = {
    fcmToken: null,
}

export default function fmcReducer (state = initialState, action) {
    switch (action.type) {
        case FCM_TOKEN:
            return {
                ...state,
                fcmToken: action.data,
            }
        default:
            return state
    }
}