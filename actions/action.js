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

export const fetchDataPositions = (payload) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `http://yota.achim.my.id/positions/filter?hour=${payload.hour}&minute=${payload.minute}`
    })
    .then(response => {
      dispatch(actionGetPositions(response.data))
      // dispatch(actionSetLoading(false))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const actionSetLoading = (payload) => ({
  type: 'setLoading',
  payload: payload
})
