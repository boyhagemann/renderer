import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

import { fetchStructure, initLocation } from './actions'


const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(fetchStructure('c5f2e43e43dedcf6b5152e921fb04ca2', 'ja9278040a5029a55db8031e0be4ac29'))
store.dispatch(initLocation())





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
