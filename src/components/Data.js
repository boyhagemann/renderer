import Node from './Node'
import Immutable from 'immutable'
import { flatten, parseJSON } from '../helpers'

const provideData = (node, state, dispatch, alias, item, key = '') => {

  const path = alias.split('.')

  const addedState = Immutable
  .fromJS(state)
  .mergeDeep({[path]: item, key})
  .toJS()

  return node.content.map( id => Node(id, addedState, dispatch))
}

const Data = (node, state, dispatch) => {

  const {source, alias = 'context'} = node

  if(!source) return

  const data = parseJSON(source) || source
  
  return flatten(

      data instanceof Array

        ? data.map( (item, key) => {
            return provideData(node, state, dispatch, alias, item, key)
          })
        : provideData(node, state, dispatch, alias, data)


  )


}

export default Data
