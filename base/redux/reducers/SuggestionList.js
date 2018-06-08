import { SUGGESTION_LIST_FETCHING, SUGGESTION_LIST_UPDATED} from '../constants'

const initialState = {
    suggestionList: [],
    fetching: false,
}

export default function suggestionListReducer (state = initialState, action) {
    switch (action.type) {
        case SUGGESTION_LIST_UPDATED:
            return {
                ...state,
                suggestionList: action.data,
                fetching: false
            }   
            case SUGGESTION_LIST_FETCHING:
            return {
                ...state,
                fetching: true
            }   
           
        default:
            return state
    }
}