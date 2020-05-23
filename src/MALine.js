import ChartBaseConfig from './ChartBaseConfig'

class MALine extends ChartBaseConfig {
  constructor({ _ctx, range }) {
    super()
    this._ctx = _ctx
    this.range = range
  }

  draw() {
    let data = this._handleMALineData()
    this._drawMALine(data)
  }

  _handleMALineData() {
    let mAResultData = []
    let rangData = []
    // MA 曲线只关心收盘价即可
    let ma_kline_data = this.$store.state.all_kline_data.slice(this.$store.state.overflow_data_num, this.$store.state.kline_data.length * 2 + this.$store.state.overflow_data_num)
    ma_kline_data.forEach((item, index, arr) => {
      if (arr.length - this.range - index < 0) return
      rangData = arr.slice(index, index + this.range)
      let o = {
        ...item,
        avgClose: 0
      }
      let sum = 0
      rangData.forEach(item => {
        sum = this.$decimal('+', sum, item.close)
      })
      o.avgClose = this.$decimal('/', sum, this.range)
      mAResultData.push(o)
      if (this.$store.state.kline_data[index]) {
        this.$store.state.kline_data[index][`MAClose${this.range}`] = o.avgClose
      }

      rangData = []
    })
    // this.$store.commit('kline_data', mAResultData)
    // 处理一下当前视图内的 kline_data 即可
    mAResultData = mAResultData.slice(0, this.$store.state.kline_data.length)

    mAResultData.forEach((item, index) => {
      Object.assign(item, this.$store.state.kline_data[index])
    })

    return mAResultData
  }

  // 绘制 MA(moving average) 移动平均线
  _drawMALine(mAData) {
    this._ctx.beginPath();
    let { el, x_axis_height, volume_height, min, every_data_px, column_width } = this.$store.state
    let { offsetHeight } = el
    let chartHeight = this.$decimal('-', offsetHeight, x_axis_height, volume_height) * this.$devicePixelRatio
    mAData.forEach((item, index, arr) => {
      let x = this.$decimal('+', item.x, column_width / 2)
      let y = this.$decimal('-', chartHeight, (item.avgClose - min) * every_data_px)
      if (!index) {
        this._ctx.beginPath();
        this._ctx.moveTo(x, y);
      } else {
        this._ctx.lineTo(x, y);
      }
    })
    this._ctx.stroke();
  }


}
export default MALine
