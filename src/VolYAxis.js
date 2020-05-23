/* Volume Y 轴 */
import ChartBaseConfig from './ChartBaseConfig'
import CONSTANTS from './config/CONSTANTS'

const regK = /0{3}$/
class VolYAxis extends ChartBaseConfig {
  constructor() {
    super()
    let { el, x_axis_height, y_axis_width, volume_height } = this.$store.state

    this.c = this.$Od.$createElement('canvas')
    this.c.width = this._handleDevicePixelRatio({ value: y_axis_width })
    this.c.height = this._handleDevicePixelRatio({ value: this.$decimal('-', volume_height) })
    this.c.style.position = 'absolute'
    this.c.style.bottom = `${this.$decimal('-', x_axis_height)}px`
    this.c.style.right = 0
    this.c.style.background = this.$store.state.background_color

    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`

    this._ctx = this.c.getContext("2d");
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, this.dragMouseMoving.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, this.mouseScaling.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, this.onRealTimeData.bind(this))

    // 主题切换
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, theme => {
      this.draw()
    })
  }

  draw() {
    // Y 轴

    this._drawBackground(this._ctx, this.c.width, this.c.height)

    let { axis_color } = this.$store.state.theme
    this._ctx.strokeStyle = axis_color
    this._ctx.beginPath()
    this._ctx.moveTo(0 + 0.5, 0);
    this._ctx.lineTo(0 + 0.5, this.c.height);
    this._ctx.lineWidth = 1;
    this._ctx.stroke();
    this.drawVolYAxis()
  }

  drawVolYAxis() { // 绘制Y坐标 与绘制交易量逻辑重复
    let { theme, kline_data, volume_height, axis_segment, axis_font } = this.$store.state
    let { axis_text_color } = theme
    let volumeArray = kline_data.map(item => item.volume)
    this.maxVolume = Math.max(...volumeArray) //  最大值
    this.minVolume = Math.min(...volumeArray) //  最小值

    this.dataGap = this.$decimal('-', this.maxVolume, this.minVolume) // 最大/小值间距
    let volume_height_dpr = this._handleDevicePixelRatio({ value: volume_height })
    this.everyDataPX = this.$decimal('/', volume_height_dpr, this.dataGap)

    let power = Math.trunc(Math.log10(this.dataGap)) - 1 // 幂
    let start = Math.trunc(this.minVolume)
    let scale = 5 * 10 ** power // 刻度
    let perScale = scale // 刻度

    while (scale * this.everyDataPX < 20) {
      scale = this.$decimal('+', scale, perScale)
    }

    this._ctx.fillStyle = axis_text_color
    this._ctx.font = axis_font

    let count = 1 // 计数

    while ((start + scale * count) < this.maxVolume) {
      let yText = String(scale * count)
      if (regK.test(yText)) {
        yText = yText.replace(regK, 'k')
      }

      // let yText = start + scale * count
      let y = this.c.height - this.everyDataPX * scale * count // y 起点
      this._ctx.beginPath()
      this._ctx.moveTo(0, y - 0.5);
      this._ctx.lineTo(axis_segment, y - 0.5);
      this._ctx.lineWidth = 1
      this._ctx.stroke();
      this._ctx.fillText(yText, 5, y + this._handleDevicePixelRatio({ value: 4 })); // 4 使其上下居中
      count++
    }
  }

  dragMouseMoving() {
    this._ctx.clearRect(0, 0, this.c.width, this.c.height)
    this.draw()
  }

  mouseScaling() {
    this._ctx.clearRect(0, 0, this.c.width, this.c.height)
    this.draw()
  }

  onRealTimeData() {
    this._ctx.clearRect(0, 0, this.c.width, this.c.height)
    this.draw()
  }
}

export default VolYAxis