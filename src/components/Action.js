
const Action = (node, state, dispatch) => {

  const params = Object.keys(node)
  .filter( key => !['_id', '_type', '_node', 'type'].includes(key))
  .map( key => node[key])

  return {
    type: node.type,
    payload: params
  }
}

export default Action
