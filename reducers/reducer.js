const defaultState = {
  position_list: [],
  hour: 0,
  minute: 0,
  route_list: []
}

const Reducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_POSITIONS':
      return {...state, position_list: action.payload}

    case 'SET_HOUR':
      return {...state, hour: action.payload}

    case 'SET_MINUTE':
      return {...state, minute: action.payload}

    case 'GET_ROUTES':
      return {...state, route_list: action.payload}

    default:
        return state
  }
}

export default Reducer
