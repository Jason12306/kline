/* 绘制视图数据的主要处理逻辑 */
import ChartBaseConfig from './ChartBaseConfig'
export default class DrawView extends ChartBaseConfig {

  dealCanDrawViewData(data) {
    // data 为 获取的历史数据
    let { el, x_axis_height, y_axis_width, column_space, column_width, init_offset_x, volume_height } = this.$store.state
    let { offsetWidth, offsetHeight } = el

    let chartWidth = this.$decimal('-', offsetWidth, y_axis_width) * this.$devicePixelRatio
    let chartHeight = this.$decimal('-', offsetHeight, x_axis_height, volume_height) * this.$devicePixelRatio

    let range = this.$decimal('+', column_space, column_width)
    // 视图中最多可绘制的数据条数 进一法      * 2 获取两倍的视图数据

    let dataNumInView = Math.ceil(chartWidth / range) + 1
    let rawData
    let startX = 0
    let overflowNum = 0

    if (init_offset_x >= 0) { // 偏移量大于0
      rawData = this.$copyObjectUnsafe(data.slice(0, dataNumInView)) // 视图中原始数据 
    } else { // 偏移量小于0 视图超出了 容器
      let offsetX = Math.abs(init_offset_x)
      // 超出的柱 不包括在边线上的  缩放时同等扩大
      overflowNum = Math.floor(this.$decimal('/', offsetX, range))
      // 缩放触发
      startX = this.$decimal('-', chartWidth, -offsetX, this.$decimal('*', overflowNum, range), column_width)  // 第一条数据 x 起始点
      // 视图中原始数据 
      rawData = this.$copyObjectUnsafe(data.slice(overflowNum, overflowNum + dataNumInView))
      // 表宽 + 当前偏移量 - 超出的柱数 * 每柱宽   
      // 第一条数据起始点
    }
    this.$store.commit('overflow_data_num', overflowNum)
    let highArray = rawData.map(item => item.high)
    let lowArray = rawData.map(item => item.low)
    let max = Math.max(...highArray) //  最大值
    let min = Math.min(...lowArray) //  最小值
    let dataGap = this.$decimal('-', max, min) // 最大/小值间距
    let everyDataPX = this.$decimal('/', chartHeight, dataGap)
    this.$store.commit('every_data_px', everyDataPX)


    let canDrawData = rawData.map((item, index) => {
      let perOffset = this.$decimal('*', range, index)
      if (init_offset_x >= 0) {
        item.x = this.$decimal('-', chartWidth, init_offset_x, perOffset, column_width)
      } else {
        item.x = this.$decimal('-', startX, perOffset)
      }
      /* 烛线 高 始 终  */
      //  线 数据 类似
      item.candleLineHeight = Math.round(this.$decimal('*', everyDataPX, this.$decimal('-', item.high, item.low)))
      item.candleLineStartY = Math.round(this.$decimal('-', chartHeight, (item.low - min) * everyDataPX, item.candleLineHeight))
      //  柱 数据 类似
      let colMin = Math.min(item.open, item.close) // 较小的柱值
      item.columnHeight = Math.round(this.$decimal('*', everyDataPX, Math.abs(this.$decimal('-', item.open, item.close))))
      item.columnStartY = Math.round(this.$decimal('-', chartHeight, (colMin - min) * everyDataPX, item.columnHeight))
      item.isRise = item.close >= item.open
      return item
    })
    this.$store.commit('kline_data', canDrawData)
    this.$store.commit('max', max)
    this.$store.commit('min', min)
  }

}
