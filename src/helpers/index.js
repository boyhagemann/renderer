import Immutable from 'immutable'

export function arrayToObject(array, key) {

  let object = {}

  array.map( item => object[item[key]] = item )

  return object
}

export function replace(object, values) {

  const pattern = /"{{[\w\.]+}}"/gi
  let string = JSON.stringify(object)

  const matches = string.match(pattern) || []

  matches.forEach(match => {

    const key = match.match(/[\w\.]+/i)[0]

    const value = Immutable
      .fromJS(values)
      .getIn(key.split('.'))

    // Always replace the original placeholder
    const replace = typeof value !== 'undefined' ? value : null

    string = string.replace(match, JSON.stringify(replace))
  })

  return JSON.parse(string)
}


export const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);


export const buildEventCallback = (events, type, dispatch) => e => {

    e.preventDefault()

    events
    .filter(event => event.on === type)
    .forEach(event => event.actions.forEach(action => {
      action.payload.push(e.target)
      dispatch(action.type, action.payload)
    }))
}

export const buildEvents = (events, dispatch) => {

  const types = [
    {attribute: 'onChange', type: 'change'},
    {attribute: 'onBlur', type: 'blur'},
    {attribute: 'onClick', type: 'click'},
  ]

  return types
    .reduce( (current, next) => {
      return Object.assign(current, {
        [next.attribute]: buildEventCallback(events, next.type, dispatch)
      })
    }, {})
}
