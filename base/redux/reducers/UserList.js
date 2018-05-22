import { USER_LIST_UPDATED, USER_LIST_FETCHING} from '../constants'

const initialState = {
    userList: [],
    fetching: false,
}

export default function userListReducer (state = initialState, action) {
    switch (action.type) {
        case USER_LIST_UPDATED:
            return {
                ...state,
                userList: action.data,
                fetching: false
            }   
            case USER_LIST_FETCHING:
            return {
                ...state,
                fetching: true
            }   
           
        default:
            return state
    }
}