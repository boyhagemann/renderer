import Node from './Node'
import Immutable from 'immutable'
import { flatten } from '../helpers'

const Context = (node, state, dispatch) => {

  const data = Immutable
    .fromJS(state)
    .getIn(node.source.split('.'))

  if(!data) return

  return flatten(

    data.map( (item, key) => {

      const addedState = Immutable
        .fromJS(state)
        .mergeDeep({context: item, key})
        .toJS()

      return node.content.map( id => Node(id, addedState, dispatch))
    })
  )


}

export default Context
