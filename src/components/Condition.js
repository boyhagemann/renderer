import Node from './Node'
import Immutable from 'immutable'

const Condition = (node, state, dispatch) => {

  // Extract variables from the node
  const { source, operator, value, valid = [], invalid = [], defaults = []} = node

  // Pass down the defaults that need to be rendered to the valid and invalid nodes
  // This will be available using a Section component using the alias "conditionDefaults".
  // This way, we can wrap content conditionally.
  const addedState = Immutable
    .fromJS(state)
    .mergeDeep({conditionDefaults: defaults})
    .toJS()

  // Determine if we need to render the valid or invalid content,
  // based on the outcome of the condition.
  const content = isValid(source, operator, value) ? valid : invalid
  
  // Render the content
  return content.map( id => Node(id, addedState, dispatch) )
}

/**
 * Helper method to check if a condition is true or false.
 */
function isValid(source, operator, value) {

    switch (operator) {

      case '==':
        return source == value

      case '===':
        return source === value

      default:
        return false
    }
}

export default Condition
