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

const target = document.querySelector('[data-component]')
const component = target.dataset.component
const node = target.dataset.node

store.dispatch(fetchStructure(node, component))
store.dispatch(initLocation())





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
