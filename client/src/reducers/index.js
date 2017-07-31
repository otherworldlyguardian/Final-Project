import { combineReducers } from 'redux'
import LoggedIn from './reducer-login'
import CharInfo from './reducer-character-info'

const allReducers = combineReducers({
  loggedIn: LoggedIn,
  charInfo: CharInfo
})

export default allReducers
