import ChartBaseConfig from './ChartBaseConfig'
import decimal from './utils/decimals'
import CONSTANTS from './config/CONSTANTS'

class YAxisCanvas extends ChartBaseConfig {
  constructor() {
    super()
    let { el, x_axis_height, y_axis_width, volume_height } = this.$store.state
    this.c = this.$Od.$createElement('canvas')
    this.c.width = this._handleDevicePixelRatio({ value: y_axis_width })
    this.c.height = this._handleDevicePixelRatio({ value: this.$decimal('-', el.offsetHeight, x_axis_height, volume_height) })

    this.c.style.position = 'absolute'
    this.c.style.top = 0
    this.c.style.right = 0
    this.c.style.background = this.$store.state.background_color
    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`

    this._ctx = this.c.getContext("2d");
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, this.reDraw.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, this.reDraw.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, this.reDraw.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.HISTORY_DATA_CHANGE, this.reDraw.bind(this))
  }

  draw() {
    // 当数据区间不变时 可以进行一些性能优化
    this._drawBackground(this._ctx, this.c.width, this.c.height)

    let { theme, min, max, axis_segment, axis_font } = this.$store.state
    let { axis_color, axis_text_color } = theme

    this._ctx.moveTo(0 + 0.5, 0);
    this._ctx.lineTo(0 + 0.5, this.c.height);
    this._ctx.lineWidth = 1
    this._ctx.strokeStyle = axis_color
    this._ctx.stroke();
    let everyDataPX = decimal('/', this.c.height, decimal('-', max, min))  // 每个数据所占像素px
    let count = 0 // 计数

    let power = (Math.trunc(Math.log10(min)) - 1) // 幂
    let start = Math.trunc(min / (10 ** power)) * 10 ** power // 初始值
    // everyDataPX * scale 即为 y 间隔像素 [30 - 50] 合适 取 40

    let scalePower = Math.ceil(Math.log10(max - min)) - 2 // 度量 幂

    let scale = 5 * 10 ** scalePower   // 缩放比
    let perScale = 5 * 10 ** scalePower

    while (scale * everyDataPX < 40) {
      scale = this.$decimal('+', scale, perScale)
    }
    this._ctx.strokeStyle = axis_color
    this._ctx.fillStyle = axis_text_color
    this._ctx.font = axis_font

    // 绘制刻度
    let yAxisScaleList = []
    while ((start + scale * count) < max) {
      let yText = start + scale * count
      yText = yText.toFixed(2)
      let y = this.c.height - everyDataPX * (yText - min) // y 起点
      let startY = y - 0.5
      yAxisScaleList.push(startY)
      this._ctx.beginPath()
      this._ctx.moveTo(0, startY);
      this._ctx.lineTo(axis_segment, startY);
      this._ctx.lineWidth = 1
      this._ctx.stroke();
      this._ctx.fillText(yText, 5, y + 4)
      count++
    }
    this.$store.commit('y_axis_scale_list', yAxisScaleList)
  }

  reDraw() {
    this._ctx.clearRect(0, 0, this.c.width, this.c.height)
    this.draw()
  }

}

export default YAxisCanvas
