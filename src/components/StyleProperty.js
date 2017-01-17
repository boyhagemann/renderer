
const StyleProperty = (node, state, dispatch) => {

  const { property, value } = node

  return [property, value].join(':')
}

export default StyleProperty
