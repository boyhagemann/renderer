import React from 'react'
import Node from './Node'
import { flatten } from '../helpers'

const Element = (node, state, dispatch) => {

  const {_id, element, content = []} = node

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
  let attributes = {
    key: key,
    onClick: e => {

      e.preventDefault()

      events
      .filter(event => event.on === 'click')
      .map(event => event.actions.map(action => {
        action.payload.push(e.target)
        dispatch(action.type, action.payload)
      }))
    },
    onChange: e => {

      e.preventDefault()

      events
      .filter(event => event.on === 'change')
      .map(event => event.actions.map(action => {
        action.payload.push(e.target)
        dispatch(action.type, action.payload)
      }))
    },
    onBlur: e => {

      e.preventDefault()

      events
      .filter(event => event.on === 'blur')
      .map(event => event.actions.map(action => {
        action.payload.push(e.target)
        dispatch(action.type, action.payload)
      }))
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
      case 'element':
        break

      case 'value':
        attributes.value = node[key] || ''
        break

      case 'styles':
        attributes.style = styles
        break

      case 'class':
        attributes.className = node[key]
        break

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
