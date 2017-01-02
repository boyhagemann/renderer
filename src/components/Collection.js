import Node from './Node'
import Immutable from 'immutable'
import { flatten } from '../helpers'

const Context = (node, state, dispatch) => {

  const source = node.source

  if(!source) return

  const json = typeof source === 'string' ? JSON.parse(source) : false

  const data = json || source

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
