import Node from './Node'

const Project = (node, state, dispatch) => {
  return node.content.map( id => Node(id, state, dispatch) )
}

export default Project
