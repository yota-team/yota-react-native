import axios from 'axios'

export const actionSetHour = (payload) => ({
  type: 'SET_HOUR',
  payload: payload
})

export const actionSetMinute = (payload) => ({
  type: 'SET_MINUTE',
  payload: payload
})

export const actionGetPositions = (payload) => ({
  type: 'GET_POSITIONS',
  payload: payload
})

export const actionGetRoutes = (payload) => ({
  type: 'GET_ROUTES',
  payload: payload
})

export const fetchDataPositions = (payload) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `http://yota.achim.my.id/positions/filter?hour=${payload.hour}&minute=${payload.minute}`
    })
    .then(response => {
      dispatch(actionGetPositions(response.data))
      dispatch(actionSetLoading(false))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const fetchDataRoutes = (payload) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `http://api-ext.trafi.com/routes?start_lat=${payload.start_lat}&start_lng=${payload.start_lng}&end_lat=${payload.end_lat}&end_lng=${payload.end_lng}&time=${payload.time}&is_arrival=${payload.is_arrival}&api_key=${payload.api_key}`
    })
    .then(response => {
      dispatch(actionGetRoutes(response.data))
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const actionSetLoading = (payload) => ({
  type: 'setLoading',
  payload: payload
})
