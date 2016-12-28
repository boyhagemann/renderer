
import React from 'react'
import { replace } from '../helpers'

import Element from './Element'
import Text from './Text'
import Project from './Project'
import Context from './Context'
import Section from './Section'
import Condition from './Condition'
import Collection from './Collection'
import Event from './Event'
import Action from './Action'
import Style from './Style'

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

    case 'Collection':
      return Collection(node, state, dispatch)

    case 'Context':
      return Context(node, state, dispatch)

    case 'Section':
      return Section(node, state, dispatch)

    case 'Text':
      return Text(node, state, dispatch)

    case 'Event':
      return Event(node, state, dispatch)

    case 'Action':
      return Action(node, state, dispatch)

    case 'Style':
      return Style(node, state, dispatch)

    default:
      throw new Error('Component "' + node._type + '" is not implemented')

  }
}



export default Node
