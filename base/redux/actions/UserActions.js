import { USER_LIST_UPDATED, USER_LIST_FETCHING, NETWORK_ERROR } from '../constants'

import { getUserList } from '../../api/UserService'
import { database } from 'firebase';

export const fetchUserList = () => async dispatch => {
    dispatch(fetchProgress())
    try {
        let userList = await getUserList()
        dispatch(userListSuccess(userList))
    } catch (error) {
        console.log("Error fetchUserList", error )
        dispatch(networkError())
    }
}


function fetchProgress() {
    return {
        type: USER_LIST_FETCHING,
    }
}

function userListSuccess(data) {
    return {
        type: USER_LIST_UPDATED,
        data
    }
}

function networkError() {
    return {
        type: NETWORK_ERROR,
    }
}