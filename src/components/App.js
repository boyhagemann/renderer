import React from 'react'
import { connect } from 'react-redux'
import { callAction } from '../actions'

import Node from './Node'


const App = ({state, dispatch}) => {

  return (
    <div className="App">
      {Node(state.structure.id, state, dispatch)}
    </div>
  )

}

const mapStateToProps = state => ({state})

const mapDispatchToProps = dispatch => {
  return { dispatch: (action, params) => dispatch(callAction(action, params)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
