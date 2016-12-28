import Node from './Node'
import Immutable from 'immutable'

const Context = (node, state, dispatch) => {

  const addedState = Immutable
    .fromJS(state)
    .mergeDeep({context: node})
    .toJS()

  const reference = node._node

  return Node(reference, addedState, dispatch)
}

export default Context
