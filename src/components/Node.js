
import React from 'react'
import { replace } from '../helpers'

import Element from './Element'
import Text from './Text'
import Project from './Project'
import Context from './Context'
import Section from './Section'
import Condition from './Condition'
import Data from './Data'
import Event from './Event'
import Action from './Action'
import StyleProperty from './StyleProperty'
import StyleSheet from './StyleSheet'

const Node = (id, state = {}, dispatch) => {

  if(state.structure.status === 'fetching'){
    return <div>Loading...</div>
  }

  if(state.structure.status === 'error'){
    return <div>{state.structure.message}</div>
  }

  if(!state.structure.json[id]) {
    throw new Error('Node with ID "' + id + '" is not found')
  }

  const raw = state.structure.json[id]

  const node = replace(raw, state)
  
  switch(node._type) {

    case 'Element':
      return Element(node, state, dispatch)

    case 'Project':
      return Project(node, state, dispatch)

    case 'Condition':
      return Condition(node, state, dispatch)

    case 'Data':
      return Data(node, state, dispatch)

    case 'Context':
      return Context(node, state, dispatch)

    case 'Section':
      return Section(node, state, dispatch)

    case 'Text':
    case 'TextElement':
      return Text(node, state, dispatch)

    case 'Event':
      return Event(node, state, dispatch)

    case 'Action':
      return Action(node, state, dispatch)

    case 'StyleProperty':
      return StyleProperty(node, state, dispatch)

    case 'StyleSheet':
      return StyleSheet(node, state, dispatch)

    default:
      console.log(node)
      throw new Error('Component "' + node._type + '" is not implemented')

  }
}



export default Node
