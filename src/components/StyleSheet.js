import Node from './Node'
import { flatten } from '../helpers'

const Stylesheet = (node, state, dispatch) => {

  const { content = [], css, selector } = node

  const styles = [
    content.map( id => Node(id, state, dispatch)),
    css // custom css has preference over the separate properties
  ]

  return selector
    ? selector + ' { ' + flatten(styles).join(';') + ' }'
    : styles
}

export default Stylesheet
