import {combineReducers} from 'redux'
import Login from './Login'
import User from './User'
import FirebaseCloudMessaging from './FirebaseCloudMessaging'

const rootReducer = combineReducers({
    Login, User, FirebaseCloudMessaging
})

export default rootReducer