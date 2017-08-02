export default function (state=[], action) {
  switch (action.type) {
    case 'ADD_SYSTEM':
      return [...state, action.payload]
    case 'RESET_MAP':
      return state.slice(0, 1)
    case 'DELETE_MAP':
      return []
    default:
      return state
  }
}
