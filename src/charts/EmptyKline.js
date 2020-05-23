/**
 * @name EmptyKline
 * @description 空心k线
 *  当天：空心的就是升，实心的就是跌
 *  假阳线：应涨实跌 收盘价高于开盘价的股票 但相对前一个的股价是跌的
 *  假阴线：应跌实涨 收盘价低于开盘价的股票 但相对前一个的股价是涨的
 * @author Vanyi
 * @date 2020-01-17 09:42:33
 */
import ChartBaseConfig from '../ChartBaseConfig'

class EmptyKline extends ChartBaseConfig {
  draw({ ctx }) {
    this._ctx = ctx
    this.$store.state.kline_data.forEach((data, index, arr) => {
      let { x, columnStartY, columnHeight, close, open, candleLineStartY, candleLineHeight } = data
      let { column_width, default_rise_color, default_fall_color } = this.$store.state
      let isRise = arr[index + 1] ? (close - arr[index + 1].close >= 0) : true
      this._ctx.strokeStyle = this._ctx.fillStyle = isRise ? default_rise_color : default_fall_color
      this._ctx.lineWidth = 1

      let profileFillX = (this.$devicePixelRatio % 2 === 0) ? 0.5 : 0
      let strokeStartX = Math.round(x) + 0.5
      let fillStartX = Math.round(x) + profileFillX
      let lineX = this.$handleCanvasDrawValue(this.$decimal('+', fillStartX, Math.floor(column_width / 2)))
      // 线
      this._ctx.beginPath()
      this._ctx.moveTo(lineX, candleLineStartY)
      this._ctx.lineTo(lineX, columnStartY)
      this._ctx.moveTo(lineX, this.$decimal('+', columnStartY, columnHeight))
      this._ctx.lineTo(lineX, this.$decimal('+', candleLineStartY, candleLineHeight))
      this._ctx.lineWidth = 1;
      this._ctx.stroke();
      // 柱
      if (data.isRise) { // 空心
        this._ctx.strokeRect(strokeStartX, columnStartY, column_width, columnHeight)
      } else { // 实心
        this._ctx.fillRect(fillStartX, columnStartY, column_width, columnHeight)
      }
    })
  }
}

export default new EmptyKline()