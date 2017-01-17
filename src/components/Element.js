import React from 'react'
import styled from 'styled-components'
import Node from './Node'
import { flatten, buildEvents } from '../helpers'

const Element = (node, state, dispatch) => {

  // Extract variables from the node
  const {_id, element, content = [], styles = []} = node

  // Collect the events for this node and map the right
  // acions for these events.
  const events = node.events
    .map(id => Node(id, state, dispatch))

  // We must create a unique key for each element that we render.
  // Merge the key given from the Collection item to always have
  // a unique value for the key.
  const key = _id + '___' + state.key + '___' + Math.random()

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
      case 'styles':
        break

      // Value cannot be null in React
      case 'value':
        attributes.value = node[key] || ''
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


  // Build the css for the component
  const css = flatten(styles.map(id => Node(id, state, dispatch))).join(';')

  // Create the styled component
  const styledElement = styled[element]`${ css }`

  // Create the React element based on the Styled component
  return React.createElement(
    styledElement,
    attributes,
    content.length
      ? content.map( id => Node(id, state, dispatch) )
      : null
  )
}

export default Element
