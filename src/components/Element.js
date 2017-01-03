import React from 'react'
import Node from './Node'
import { flatten, buildEvents } from '../helpers'

const Element = (node, state, dispatch) => {

  // Extract variables from the node
  const {_id, element, content = []} = node

  // Collect the events for this node and map the right
  // acions for these events.
  const events = node.events
    .map(id => Node(id, state, dispatch))

  // Build the style as a simple object, based on the node
  // information.
  const styles = flatten(node.styles.map(id => Node(id, state, dispatch)))
    .reduce( (current, next) => {
      return Object.assign({}, current, next)
    }, {})


  // We must create a unique key for each element that we render.
  // Merge the key given from the Collection item to always have
  // a unique value for the key.
  const key = _id + state.key

  // From the collected events, assign each of them to the
  // according trigger (onClick, onChange .e.d.).
  const eventAttributes = buildEvents(events, dispatch)

  // Start buildin the html attributes in one object.
  let attributes = Object.assign({key}, eventAttributes)

  // These are transformations for the html attributes
  // that need to happen to make a clean React implementation.
  Object.keys(node).forEach(key => {

    switch(key) {

      // These are not valid html attributes
      case '_id':
      case '_type':
      case '_node':
      case 'events':
      case 'element':
        break

      // Value cannot be null in React
      case 'value':
        attributes.value = node[key] || ''
        break

      // We created our own style object earlier
      case 'styles':
        attributes.style = styles
        break

      // Class becomes className in React
      case 'class':
        attributes.className = node[key]
        break

      // For becomes htmlFor in React
      case 'for':
        attributes.htmlFor = node[key]
        break

      // Just assign the rest to the attributes.
      default:
        attributes[key] = node[key]
    }
  })

  return React.createElement(
    element,
    attributes,
    content.length
      ? content.map( id => Node(id, state, dispatch) )
      : null
  )
}

export default Element
