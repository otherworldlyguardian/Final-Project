export default function (state=false, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload
    case 'LOG_OUT':
      return action.payload
    default:
      return state
  }
}
