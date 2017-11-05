const defaultState = {
  position_list: [],
  hour: 0,
  minute: 0,
  loadingState: false
}

const Reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_POSITIONS':
      return {...state, position_list: action.payload}

    case 'SET_HOUR':
      return {...state, hour: action.payload}

    case 'SET_MINUTE':
      return {...state, minute: action.payload}
    case 'setLoading':
      var newState = action.payload
      if(newState === 'false'){
        return {...state, loadingState: true}
      } else {
        return {...state, loadingState: false}
      }
    default:
        return state
  }
}

export default Reducer
