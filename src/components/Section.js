import Node from './Node'
import Immutable from 'immutable'

const Section = (node, state, dispatch) => {
          
  const alias = Immutable
    .fromJS(state)
    .getIn(node.alias.split('.'))

  const ids = alias ? alias.toJS() : []

  return ids.map( id => Node(id, state, dispatch))
}

export default Section
