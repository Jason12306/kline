/**
 * @name RealTime
 * @description 分时图
 * @author Vanyi
 * @date 2020-01-17 09:43:35
 */

import ChartBaseConfig from '../ChartBaseConfig'

class RealTime extends ChartBaseConfig {
  draw({ ctx, c }) {
    this._ctx = ctx
    this.c = c
    this._ctx.beginPath()
    let { kline_data, column_width, theme } = this.$store.state
    let { realtime_line_color, realtime_area_color } = theme
    kline_data.forEach((data, index) => {
      let { x, columnStartY, columnHeight, isRise } = data
      let lineX = this.$handleCanvasDrawValue(this.$decimal('+', x, Math.floor(column_width / 2)))
      let startY = isRise ? columnStartY : this.$decimal('+', columnStartY, columnHeight)
      if (!index) {
        this._ctx.moveTo(lineX, startY)
      } else {
        this._ctx.lineTo(lineX, startY)
      }
    })
    let firstData = kline_data[0]
    let lastData = kline_data[kline_data.length - 1]
    let lastDataX = this.$handleCanvasDrawValue(this.$decimal('+', lastData.x, Math.floor(column_width / 2)))
    let firstDataX = this.$handleCanvasDrawValue(this.$decimal('+', firstData.x, Math.floor(column_width / 2)))

    this._ctx.lineTo(lastDataX, this.c.height + 1)
    this._ctx.lineTo(firstDataX, this.c.height + 1)

    this._ctx.lineWidth = 1
    this._ctx.strokeStyle = realtime_line_color
    this._ctx.fillStyle = realtime_area_color
    this._ctx.stroke()
    this._ctx.fill()
  }
}

export default new RealTime()
