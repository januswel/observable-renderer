const EventEmitter = require('eventemitter3')

class Renderer extends EventEmitter {
  render(props) {
    console.log(`count: ${props.count}`)
  }
}
const renderer = new Renderer()
renderer.on('change', (props) => {
  renderer.render(props)
})

const createProxy = src => {
  const result = {}
  for (key of Object.keys(src)) {
    const dataKey = `_${key}`
    result[dataKey] = src[key]
    Object.defineProperty(result, key, {
      get: () => result[dataKey],
      set: newValue => {
        result[dataKey] = newValue
        renderer.emit('change', result)
      }
    })
  }
  return result
}

const src = {count: 0}
const p = createProxy(src)
renderer.render(src)

p.count = p.count + 1
p.count = p.count + 1

console.log(p)
console.log(src)
