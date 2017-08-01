export default function (state=[], action) {
  switch (action.type) {
    case 'ADD_SYSTEM':
      return [...state, action.payload]
    default:
      return state
  }
}
