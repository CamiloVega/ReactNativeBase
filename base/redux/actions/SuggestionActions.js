import { SUGGESTION_LIST_FETCHING, SUGGESTION_LIST_UPDATED, NETWORK_ERROR } from '../constants'

import { getSuggestionList} from '../../api/SuggestionService'
import { database } from 'firebase';

export function fetchSuggestionList() {
    console.log("fetchSuggestionList ")
    return (dispatch) => {
        dispatch(fetchProgress())
        getSuggestionList((suggestionList) => {
            dispatch(userListSuccess(suggestionList))
        }, (error) => {
            console.error(error)
            dispatch(networkError())
        })
    }
}

function fetchProgress() {
    return {
        type: SUGGESTION_LIST_FETCHING,
    }
}

function userListSuccess(data) {
    return {
        type: SUGGESTION_LIST_UPDATED,
        data
    }
}

function networkError() {
    return {
        type: NETWORK_ERROR,
    }
}