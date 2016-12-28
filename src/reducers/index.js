
import { combineReducers } from 'redux'
import { REQUEST_STRUCTURE, RECEIVE_STRUCTURE, FAILED_STRUCTURE, CHANGE_LOCATION } from '../actions'
import { arrayToObject } from '../helpers'


function location(state = {}, action) {

  switch(action.type) {

    case CHANGE_LOCATION:
      return {path: action.path}

    default:
      return state
  }
}


function structure(state = {}, action) {

  switch(action.type) {

    case REQUEST_STRUCTURE:
      return Object.assign({}, state, {
        id: action.id,
        status: 'fetching',
        code: null,
        message: ''
      })

    case RECEIVE_STRUCTURE:
        return Object.assign({}, state, {
          id: action.id,
          status: 'success',
          code: null,
          message: '',
          json: arrayToObject(action.json, '_id')
        })

    case FAILED_STRUCTURE:
      return Object.assign({}, state, {
        id: action.id,
        status: 'error',
        code: action.code,
        message: '' + action.message
      })

    default:
      return state
  }

}



function data(state = {}, action)
{
  switch(action.type) {

    case 'RECEIVE_DATA':
      return Object.assign({}, state, {...action.data})

    default:
      return state
  }
}



const reducer = combineReducers({
  location,
  structure,
  data,
})

export default reducer
