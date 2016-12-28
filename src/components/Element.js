import React from 'react'
import Node from './Node'
import { flatten } from '../helpers'

const Element = (node, state, dispatch) => {

  const {_id, type, content} = node

  const events = node.events
    .map(id => Node(id, state, dispatch))

  const styles = flatten(node.styles.map(id => Node(id, state, dispatch)))
    .reduce( (current, fresh) => {
      return Object.assign({}, current, fresh)
    }, {})


  // We must create a unique key for each element that we render.
  // Merge the key given from the Collection item to always have
  // a unique value for the key.
  const key = _id + state.key


  /**
   * Start building the html attributes
   */
  let attributes = { key: key, onClick: e => {

      e.preventDefault()

      events
      .filter(event => event.on === 'click')
      .map(event => event.actions.map(action => dispatch(action.type, action.payload)))
    }
  }


  /**
   * Filter out some invalid html attributes
   */
  Object.keys(node).forEach(key => {

    switch(key) {

      case '_id':
      case '_type':
      case '_node':
      case 'events':
      // case 'styles':
        break;

      case 'styles':
        attributes.style = styles
        break;

      case 'class':
        attributes.className = node[key]
        break;

      default:
        attributes[key] = node[key]
    }
  })

  return React.createElement(
    type,
    attributes,
    content.map( id => Node(id, state, dispatch) )
  )
}

export default Element
