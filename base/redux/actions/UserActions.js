import { USER_LIST_UPDATED, USER_LIST_FETCHING} from '../constants'

import { getUserList} from '../../api/UserService'
import { database } from 'firebase';

export function fetchUserList() {
    return (dispatch) => {
        dispatch(fetchProgress())
        getUserList((userList) => {
            dispatch(userListSuccess(userList))
        })
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