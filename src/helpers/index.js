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

      if(typeof value !== 'undefined') {

        // if(typeof(value) === 'string') {
        //   string = string.replace(match, value)
        // }
        // else {
          string = string.replace(match, JSON.stringify(value))
        // }

      }
  })

  return JSON.parse(string)
}


export const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);
