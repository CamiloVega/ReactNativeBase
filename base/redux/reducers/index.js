import {combineReducers} from 'redux'
import Login from './Login'
import User from './User'
import FirebaseCloudMessaging from './FirebaseCloudMessaging'
import UserList from './UserList'

const rootReducer = combineReducers({
    Login, User, FirebaseCloudMessaging, userList: UserList
})

export default rootReducer