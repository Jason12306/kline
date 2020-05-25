import ChartBaseConfig from './ChartBaseConfig'
import CONSTANTS from './config/CONSTANTS'

const timeStrategies = {
  // 分钟 每隔 10 柱
  m: (item) => {
    return {
      time: Math.trunc(item.time / 60000), // 1000 * 60
      format: 'HH:mm'
    }
  },
  h: (item) => {
    return {
      time: Math.trunc(item.time / 3600000), // 1000 * 60 * 60
      format: 'DD HH:mm'
    }
  },
  d: (item) => {
    return {
      time: Math.trunc(item.time / 86400000), //  1000 * 60 * 60 * 24
      format: 'MM-DD'
    }
  },
  w: (item) => {
    return {
      time: Math.trunc(item.time / 604800000), //  1000 * 60 * 60 * 24 * 7
      format: 'MM-DD'
    }
  },
  M: (item) => {
    return {
      time: Math.trunc(item.time / 2592000000), //  1000 * 60 * 60 * 24 * 30
      format: 'YYYY-MM'
    }
  }
}

class XAxisCanvas extends ChartBaseConfig {
  constructor() {
    super()
    let { el, x_axis_height, y_axis_width } = this.$store.state
    this.c = this.$Od.$createElement('canvas')
    this.c.width = this._handleDevicePixelRatio({ value: this.$decimal('-', el.offsetWidth, y_axis_width) })
    this.c.height = this._handleDevicePixelRatio({ value: x_axis_height })
    this.c.style.position = 'absolute'
    this.c.style.bottom = 0
    this.c.style.left = 0
    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`
    this.c.style.background = this.$store.state.background_color

    this._ctx = this.c.getContext('2d');
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, this.reDraw.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, this.reDraw.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, this.reDraw.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.HISTORY_DATA_CHANGE, this.reDraw.bind(this))
    // 主题切换
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, theme => {
      this.draw()
    })
  }

  draw() {
    this._drawBackground(this._ctx, this.c.width, this.c.height)
    let { theme, axis_font, kline_data, current_scale, current_interval, column_width, axis_segment } = this.$store.state
    let { axis_text_color, axis_color } = theme
    if (!kline_data) return
    // x 轴
    this._ctx.moveTo(0, 0.5); // 0 + 0.5
    this._ctx.lineTo(this.c.width, 0.5);
    this._ctx.lineWidth = 1
    this._ctx.strokeStyle = axis_color

    this._ctx.stroke()
    this._ctx.textAlign = 'center'

    // s m h d w M 
    let interval_num = current_interval.match(/[0-9]*$/)
    let interval_type = current_interval[0]
    this._ctx.strokeStyle = axis_color
    this._ctx.fillStyle = axis_text_color
    this._ctx.font = axis_font

    kline_data.forEach((item, i) => {
      let { time, format } = timeStrategies[interval_type](item)  // 最小度量  分钟
      let timeRange = Math.trunc(interval_num * 10 / current_scale)
      timeRange = Math.ceil(timeRange / 5) * 5 // 分钟间隔
      if (!(time % timeRange)) {
        let startX = this.$decimal('+', item.x, Math.ceil(column_width / 2))
        this._ctx.beginPath()
        this._ctx.moveTo(startX - 0.5, 0)
        this._ctx.lineTo(startX - 0.5, (axis_segment * this.$devicePixelRatio))
        this._ctx.stroke()
        let t = this.$time.format(item.time, format)
        this._ctx.fillText(t, startX, (15 * this.$devicePixelRatio))
      }

    })
  }

  reDraw() {
    this._ctx.clearRect(0, 0, this.c.width, this.c.height)
    this.draw()
  }
}

export default XAxisCanvas
