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

const proxyHandlers = {
  set: (target, key, newValue) => {
    target[key] = newValue
    renderer.emit('change', target)
  },
}

const target = {count: 0}
const p = new Proxy(target, proxyHandlers)
renderer.render(target)

p.count = p.count + 1
p.count = p.count + 1

console.log(p)
