/* 右下角 块  */
import ChartBaseConfig from './ChartBaseConfig'
import CONSTANTS from './config/CONSTANTS'

class BottomRightBlock extends ChartBaseConfig {
  constructor() {
    super()
    this.c = this.$Od.$createElement('canvas')
    this.c.width = this._handleDevicePixelRatio({ value: this.$store.state.y_axis_width })
    this.c.height = this._handleDevicePixelRatio({ value: this.$store.state.x_axis_height })
    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`
    this._ctx = this.c.getContext("2d");
    this.$Od.$setElementAttribute(this.c, 'style', {
      position: 'absolute',
      bottom: 0,
      right: 0,
      background: this.$store.state.theme.background_color,
    })

    this.draw()
    // 主题切换
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, () => {
      this.$Od.$setElementAttribute(this.c, 'style', {
        background: this.$store.state.theme.background_color,
      })
      this.draw()
    })
  }

  draw() {
    let { axis_color } = this.$store.state.theme

    this._ctx.moveTo(0, 0 + 0.5);
    this._ctx.lineTo(this.c.width, 0 + 0.5);
    this._ctx.moveTo(0 + 0.5, 0);
    this._ctx.lineTo(0 + 0.5, this.c.height);
    this._ctx.lineWidth = 1
    this._ctx.strokeStyle = axis_color

    this._ctx.stroke()
  }
}

export default BottomRightBlock
