import Node from './Node'
import { flatten } from '../helpers'

const Event = (node, state, dispatch) => {

  const actions = node.actions
    .map(action => Node(action, state, dispatch))

  return {
    on: node.on,
    actions: flatten(actions)
  }
}

export default Event
