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
      // client.middleware(),
      thunkMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(fetchStructure('p827f99313f52b8e17559a60e5cbf08c'))
store.dispatch(initLocation())





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
