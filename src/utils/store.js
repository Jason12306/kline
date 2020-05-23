/* 
  简单的数据管理 store
*/

export default class Store {
  constructor({ state }) {
    this.state = {}
    let _this = this
    for (let k in state) {
      Object.defineProperty(this.state, k, {
        configurable: false,
        enumerable: true,
        get() {
          return state[k]
        },
        set(val) {
          if (_this[k] !== undefined) {
            state[k] = val
          }
        }
      })
    }
  }

  commit(k, payload) {
    this[k] = k
    this.state[k] = payload
  }
}

