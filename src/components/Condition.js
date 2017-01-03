import Node from './Node'

const Condition = (node, state, dispatch) => {

  // Extract variables from the node
  const { source, operator, value, valid = [], invalid = []} = node

  // Determine if we need to render the valid or invalid content,
  // based on the outcome of the condition.
  const content = isValid(source, operator, value) ? valid : invalid

  // Render the content
  return content.map( id => Node(id, state, dispatch) )
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
