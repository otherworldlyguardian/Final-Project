import { combineReducers } from 'redux'
import LoggedIn from './reducer-login'

const allReducers = combineReducers({
  loggedIn: LoggedIn
})

export default allReducers
