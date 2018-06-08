import { combineReducers } from 'redux'
import Login from './Login'
import User from './User'
import FirebaseCloudMessaging from './FirebaseCloudMessaging'
import UserList from './UserList'
import SuggestionList from './SuggestionList'
import NetworkStatus from './NetworkStatus'

const rootReducer = combineReducers({
    Login, User, FirebaseCloudMessaging, userList: UserList, networkStatus: NetworkStatus, suggestionList: SuggestionList
})

export default rootReducer