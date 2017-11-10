import {combineReducers} from 'redux'
import Login from './Login'
import User from './User'

const rootReducer = combineReducers({
    Login, User
})

export default rootReducer