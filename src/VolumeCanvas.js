/* 交易量 Canvas */
import ChartBaseConfig from './ChartBaseConfig'
import CONSTANTS from './config/CONSTANTS'
class Volume extends ChartBaseConfig {
  constructor() {
    super()
    let { el, x_axis_height, y_axis_width, volume_height } = this.$store.state
    this.c = this.$Od.$createElement('canvas')

    this.c.width = this._handleDevicePixelRatio({ value: this.$decimal('-', el.offsetWidth, y_axis_width) })
    this.c.height = this._handleDevicePixelRatio({ value: volume_height })
    this.c.style.position = 'absolute'
    this.c.style.bottom = `${x_axis_height}px`
    this.c.style.left = 0
    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`
    this._ctx = this.c.getContext('2d');

    this.maxVolume = null // 最大值
    this.minVolume = null // 最小值
    this.dataGap = null
    this.everyDataPX = null // 每个数据所占像素px 
    this.YAxisStartX = this.$decimal('-', this._handleDevicePixelRatio({ value: this.c.width }), y_axis_width)  // Y 的X轴起点
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, this.dragMouseMoving.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, this.mouseScaling.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, this.onRealTimeData.bind(this))
  }

  // 绘制 X上边界线
  drawTopLine() {
    // X上边界线
    let { axis_color } = this.$store.state.theme
    this._ctx.strokeStyle = axis_color
    this._ctx.beginPath()
    this._ctx.moveTo(0, 0 + 0.5);
    this._ctx.lineTo(this.c.width, 0 + 0.5);
    this._ctx.lineWidth = 1
    this._ctx.stroke()
  }

  draw() {
    this._clearScreen(this._ctx, this.c.width, this.c.height)
    this._drawBackground(this._ctx, this.c.width, this.c.height)
    this.drawTopLine() // 由于每次都清空了画布 所以需要重绘 绘制 X上边界线
    let { kline_data, volume_height, current_scale, y_axis_width, column_width, default_rise_color, default_fall_color } = this.$store.state
    let volumeArray = kline_data.map(item => item.volume)
    this.maxVolume = Math.max(...volumeArray) //  最大值
    this.minVolume = Math.min(...volumeArray) //  最小值
    this.dataGap = this.$decimal('-', this.maxVolume, this.minVolume) // 最大/小值间距
    this.everyDataPX = this.$decimal('/', this.c.height, this.dataGap)

    kline_data.forEach(item => {
      this._ctx.beginPath()
      this._ctx.strokeStyle = this._ctx.fillStyle = item.close >= item.open ? default_rise_color : default_fall_color
      let range = this.$decimal('-', item.volume, this.minVolume)
      let volHeight = this.$decimal('*', this.everyDataPX, range)
      let startY = this.$decimal('-', this.c.height, volHeight)
      let itemX = item.x - 0.5
      this._ctx.strokeRect(itemX, startY, column_width, volHeight)
      this._ctx.globalAlpha = 0.6
      this._ctx.fillRect(itemX, startY, column_width, volHeight)
    })

  }

  dragMouseMoving() {
    this._clearScreen(this._ctx, this.c.width, this.c.height)
    this.draw()
  }

  mouseScaling() {
    this._clearScreen(this._ctx, this.c.width, this.c.height)
    this.draw()
  }

  onRealTimeData() {
    this._clearScreen(this._ctx, this.c.width, this.c.height)
    this.draw()
  }
}

export default Volume
