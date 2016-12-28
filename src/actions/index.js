
export const REQUEST_STRUCTURE = 'REQUEST_STRUCTURE'
export const RECEIVE_STRUCTURE = 'RECEIVE_STRUCTURE'
export const FAILED_STRUCTURE = 'FAILED_STRUCTURE'

export const INIT_LOCATION = 'INIT_LOCATION'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()



export const initLocation = () => changeLocation(history.location.pathname)

export function changeLocation(path) {

  history.push(path)

  return { type: CHANGE_LOCATION, path }
}

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
    })
    .then(function(json) {
      dispatch(queryData(id, json))
    })
    // .catch(function(error) {
    //     dispatch(failedStructure(id, 500, error))
    // });

  }
}



import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag'
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://api.komparu.dev/graphql' }),
});

function receiveData(data) {

  return {
    type: 'RECEIVE_DATA',
    data
  }
}


export function queryData(id, json) {

  return dispatch => {

          // console.log('start query')

      client.query({
        query: gql`query { products { __id, title }}`
      })
      .then(result => {
            // console.log('received', result)
        dispatch(receiveData(result.data))
      })

  }

}






function callFunction(name) {

  switch(name) {
    case 'changeLocation': return changeLocation

    default:
      return
  }
}

export function callAction(type, payload) {
  return dispatch => dispatch(callFunction(type).apply(null, payload))
}
