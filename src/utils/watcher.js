let tank = {}

export default class Watcher {
  emit(name, payload = null) {
    if (!tank[name]) return
    tank[name].forEach(cb => {
      cb(payload)
    })
  }

  on(name, cb) {
    if (!tank[name]) {
      tank[name] = []
    }
    tank[name].push(cb)
  }
}

/*

  this.$Watcher.emit('test', {a: 1})
  this.$Watcher.on('test', (p) => {
    conosle.log(p)
  })


*/



