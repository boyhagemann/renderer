
const Style = (node, state, dispatch) => {

  const { property, value} = node
  let temp = {}

  temp[property] = value

  return temp
}

export default Style
