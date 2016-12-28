import Node from './Node'

const Condition = (node, state, dispatch) => {

  const { source, operator, value, valid = [], invalid = []} = node

  const content = isValid(source, operator, value) ? valid : invalid

  return content.map( id => Node(id, state, dispatch) )
}

function isValid(source, operator, value) {

    switch (operator) {

      case '=':
        return source === value

      default:
        return false
    }
}

export default Condition
