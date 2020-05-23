/**
 * @name Kline
 * @description 常规 kline
 * @author Vanyi
 * @date 2020-01-17 09:36:38
 */
import ChartBaseConfig from '../ChartBaseConfig'

class Kline extends ChartBaseConfig {
  draw({ ctx }) {
    this._ctx = ctx
    this.$store.state.kline_data.forEach(data => {
      let { x, columnStartY, columnHeight, close, open, candleLineStartY, candleLineHeight } = data
      let { column_width, default_rise_color, default_fall_color } = this.$store.state
      this._ctx.strokeStyle = this._ctx.fillStyle = close >= open ? default_rise_color : default_fall_color
      this._ctx.lineWidth = 1
      let lineX = this.$handleCanvasDrawValue(this.$decimal('+', x, Math.floor(column_width / 2)))
      // 线
      this._ctx.beginPath()
      this._ctx.moveTo(lineX, candleLineStartY);
      this._ctx.lineTo(lineX, candleLineStartY + candleLineHeight);

      this._ctx.lineWidth = 1;
      this._ctx.stroke();
      // 柱
      this._ctx.fillRect(Math.round(x), columnStartY, column_width, columnHeight)
    })
  }
}

export default new Kline()
