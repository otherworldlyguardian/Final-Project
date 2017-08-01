import { combineReducers } from 'redux'
import LoggedIn from './reducer-login'
import CharInfo from './reducer-character-info'
import SysList from './reducer-system-list'

const allReducers = combineReducers({
  loggedIn: LoggedIn,
  charInfo: CharInfo,
  sysList: SysList
})

export default allReducers
