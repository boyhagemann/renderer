

/**
 *
 * Location
 *
 */

export const INIT_LOCATION = 'INIT_LOCATION'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()


export const initLocation = () => changeLocation(history.location.pathname)

export function changeLocation(path) {
  history.push(path)
  return { type: CHANGE_LOCATION, path }
}



/**
 *
 * Structure
 *
 */
export const REQUEST_STRUCTURE = 'REQUEST_STRUCTURE'
export const RECEIVE_STRUCTURE = 'RECEIVE_STRUCTURE'
export const FAILED_STRUCTURE = 'FAILED_STRUCTURE'

const requestStructure = id => ({ type: REQUEST_STRUCTURE, id })
const failedStructure = (id, code, message) => ({ type: FAILED_STRUCTURE, id, code, message })
const receiveStructure = (id, json) => ({ type: RECEIVE_STRUCTURE, id, json })

export function fetchStructure(id) {

  return dispatch => {

    dispatch(requestStructure(id))

    fetch('//api.komparu.dev/v1/test/data/' + id + '/export', {
      headers: {
        'Content-type': 'application/json',
        'X-Auth-Token': 'foi3d04mG2354irfV5wSGxlr',
        'X-Auth-Domain': 'partner.komparu.com'
      }
    })
    .then(function(response) {
        if (response.status >= 400) {
            dispatch(failedStructure(id, response.status, "Bad response from server"))
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(json) {
      dispatch(receiveStructure(id, json))
      dispatch(initArguments(json))
      dispatch(fetchData())
    })
    // .catch(function(error) {
    //     dispatch(failedStructure(id, 500, error))
    // });

  }
}


/**
 *
 * Query
 *
 */
export const SET_ARGUMENTS = 'SET_ARGUMENTS'
export const SET_ARGUMENT = 'SET_ARGUMENT'

export function initArguments(json) {

   const defaults = json
     .filter( node => node._type === 'Argument')
     .reduce( (current, next) => ({[next.name]: next.default}), {})

   return {
     type: SET_ARGUMENTS,
     defaults
   }
 }

export function setArgument(name, element) {

  let value = ''

  switch(element.nodeName) {

    case 'SELECT':
    case 'INPUT':
      value = element.value
      break

    default:
      value = ''
  }

  return { type: SET_ARGUMENT, name, value }

}

/**
 *
 * Data
 *
 */

export const RECEIVE_DATA = 'RECEIVE_DATA'
export const QUERY_DATA   = 'QUERY_DATA'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag'
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://api.komparu.dev/graphql' }),
});

const receiveData = data => ({type: RECEIVE_DATA, data})

export function fetchData() {

  return (dispatch, getState) => {

      client.query({
        query: gql`
          query  ($limit: Int) {
            products (limit: $limit) {
              __id
              title
            }
          }`,
        variables: getState().query
      })
      .then(result => {
        dispatch(receiveData(result.data))
      })

  }

}




/**
 *
 * Helper function
 *
 */

function callFunction(name) {

  switch(name) {
    case 'changeLocation': return changeLocation
    case 'setArgument': return setArgument
    case 'fetchData': return fetchData

    default:
      return
  }
}

export function callAction(type, payload) {
  return dispatch => dispatch(callFunction(type).apply(null, payload))
}
