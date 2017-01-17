import Immutable from 'immutable'

/**
 * Transform an array to a keyed object
 */
export function arrayToObject(array, key) {

  // Loop over the array and merge each result with a
  // keyed version of itself.
  return array.reduce( (current, next) => {
    return Object.assign({}, current, {[next[key]]: next})
  }, {})
}

/**
 * Helper method to replace all placeholders in an
 * object with actual values.
 */
export function replace2(object, values) {
  // const objectWithStringsReplaced = replacePattern(object, values, /{{[\w\.|#%-]+}}/gi)

  return replace(object, values, /"{{[\w\.|#%-]+}}"/gi)
}

export function replace(object, values) {

  // Setup the pattern to match
  const pattern = /{{[\w\.|#%-]+}}/gi

  // We transform the object to a plain string, so we can
  // search very efficient and fast
  const string = JSON.stringify(object)

  // We collect the matches in an array
  const matches = string.match(pattern) || []

  // Do the actual replacement for each match
  const replaced = matches.reduce( (string, match) => {

    // Within the matches, we are now only interested in
    // the keyword. With this we can lookup the actual
    // value and replace it.
    const key = match.match(/[\w\.|#%-]+/i)[0]

    // Kind of hack to check if we must replace the whole value
    // or if we have multiple placeholders in a single string
    const index = string.match(match).index
    const replaceAll = string.substr(index - 1, 1) === '"'

    // Handle multiple failover replacements
    const replace = key.split('||').reduce( (current, next) => {

          // Nothing to do if there is value replaced already
          if(current.replaced) return current

          // Extract the actual value from the provided object
          const value = Immutable
            .fromJS(values)
            .getIn(next.split('.'))

          // Did we find a replacement?
          return typeof value !== 'undefined'
            ? { replaced: true, value }
            : { replaced: false, value: next }

    }, { replaced: false, value: null })

    // Do the actual replacement
    return replaceAll
      ? string.replace('"' + match + '"', JSON.stringify(replace.value))
      : string.replace(match, replace.value)

  }, string)

  return JSON.parse(replaced)
}

/**
 * Flatmap equivalent
 */
export const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

/**
 * Bind a dispatch call to per action for one event type.
 */
export const buildEventCallback = (events, type, dispatch) => e => {

    e.preventDefault()

    events
    .filter(event => event.on === type)
    .forEach(event => event.actions.forEach(action => {
      action.payload.push(e.target)
      dispatch(action.type, action.payload)
    }))
}

/**
 * Build a plain object with all events and its mapped actions
 */
export const buildEvents = (events, dispatch) => {

  const types = [
    {attribute: 'onChange', type: 'change'},
    {attribute: 'onBlur', type: 'blur'},
    {attribute: 'onClick', type: 'click'},
    // @todo Append this list with more attributes
  ]

  return types
    .reduce( (current, next) => {
      return Object.assign(current, {
        [next.attribute]: buildEventCallback(events, next.type, dispatch)
      })
    }, {})
}


export const parseJSON = source => {
  try {
      return typeof source === 'string' ? JSON.parse(source) : false
  }
  catch(e) {
    return false
  }
}
