/**
 * @name KlineCanvas
 * @description 用于绘制  1. 主体 k   2. 线 MA线等
 */
import ChartBaseConfig from './ChartBaseConfig'
import Kline from './charts/Kline'
import RealTime from './charts/RealTime'
import EmptyKline from './charts/EmptyKline'
import MALine from './MALine'
import CONSTANTS from './config/CONSTANTS'

class KlineCanvas extends ChartBaseConfig {
  constructor() {
    super()
    this.c = this.$Od.$createElement('canvas')
    this.c.width = this._handleDevicePixelRatio({ value: this.$decimal('-', this.$store.state.el.offsetWidth, this.$store.state.y_axis_width) })
    this.c.height = this._handleDevicePixelRatio({ value: this.$decimal('-', this.$store.state.el.offsetHeight, this.$store.state.x_axis_height, this.$store.state.volume_height) })
    this.c.style.position = 'absolute'
    this.c.style.top = 0
    this.c.style.left = 0
    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`
    this._ctx = this.c.getContext("2d");
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, this.dragMouseMoving.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, this.mouseScaling.bind(this))

    this.mALineInstanceList = []
    this.$store.state.ma_Lines.forEach(item => {
      let mALineInstance = new MALine({ _ctx: this._ctx, range: item.range })
      this.mALineInstanceList.push(mALineInstance)
    })
  }

  /* 绘制历史数据图表 */
  drawHistory() {
    let { y_axis_scale_list, chart_type, theme } = this.$store.state
    let { background_line_color } = theme
    this._clearScreen(this._ctx, this.c.width, this.c.height)
    this._drawBackground(this._ctx, this.c.width, this.c.height)
    this._ctx.setLineDash([0]) // 虚线间隔
    y_axis_scale_list.forEach(item => {
      this._ctx.beginPath()
      this._ctx.strokeStyle = background_line_color
      this._ctx.lineWidth = 1
      let y = Math.round(item) - 0.5
      this._ctx.moveTo(0, y)
      this._ctx.lineTo(this.c.width, y)
      this._ctx.stroke();
    })

    // 绘制MA线
    this._ctx.strokeStyle = this.$store.state.ma_Lines[0].lineColor
    this.mALineInstanceList[0].draw() // 5
    this._ctx.strokeStyle = this.$store.state.ma_Lines[1].lineColor
    this.mALineInstanceList[1].draw() // 10

    /* switch (chart_type) {
      case this.CONSTANTS.CHART_TYPE.KLINE:
        this.drawKLine()
        break;
      case this.CONSTANTS.CHART_TYPE.REAL_TIME:
        this.drawRealTime()
        break;
      default:
        this.drawKLine()
    } */

    switch (chart_type) {
      case this.CONSTANTS.CHART_TYPE.KLINE:
        Kline.draw({ ctx: this._ctx })
        break;
      case this.CONSTANTS.CHART_TYPE.REAL_TIME:
        RealTime.draw({ ctx: this._ctx, c: this.c })
        break;
      case this.CONSTANTS.CHART_TYPE.EMPTY_KLINE:
        EmptyKline.draw({ ctx: this._ctx })
        break;
      default:
        Kline.draw({ ctx: this._ctx })
    }

    // 绘制实时数据线
    this.drawRealTimeLine()
  }

  /*   // 绘制 KLine 图
    drawKLine() {
      this.$store.state.kline_data.forEach((data, index) => {
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
    } */

  // 绘制 分时 图
  /*  drawRealTime() {
     this._ctx.beginPath()
     let { kline_data, column_width, realtime_line_color, realtime_area_color } = this.$store.state
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
 
     this._ctx.lineTo(lastDataX, this.c.height)
     this._ctx.lineTo(firstDataX, this.c.height)
 
     this._ctx.lineWidth = 1
     this._ctx.strokeStyle = realtime_line_color
 
     this._ctx.fillStyle = realtime_area_color
     this._ctx.stroke()
     this._ctx.fill()
   } */

  // 绘制实时数据线
  drawRealTimeLine() {
    let { max, min, all_kline_data, default_rise_color, default_fall_color, realtime_tagY, precision } = this.$store.state
    let { close, open, low, high } = all_kline_data[0]
    let dataGap = this.$decimal('-', max, min) // 最大/小值间距
    let everyDataPX = this.$decimal('/', this.c.height, dataGap)
    let columnHeight = this.$decimal('*', everyDataPX, Math.abs(this.$decimal('-', open, close)))
    let colMin = Math.min(open, close) // 较小的柱值
    let columnStartY = this.$decimal('-', this.c.height, (colMin - min) * everyDataPX, columnHeight)

    let isRise = close >= open
    let color = isRise ? default_rise_color : default_fall_color
    let y = isRise ? columnStartY : this.$decimal('+', columnStartY, columnHeight)
    this._ctx.strokeStyle = color
    this._ctx.beginPath()
    this._ctx.lineWidth = 1;
    this._ctx.setLineDash([2]) // 虚线间隔
    this._ctx.moveTo(0, y);
    this._ctx.lineTo(this.c.width, y);
    this._ctx.stroke()

    realtime_tagY.innerText = close.toFixed(precision)
    this.$Od.$setElementAttribute(realtime_tagY, 'style', {
      top: `${this._handleDevicePixelRatio({ symbol: '/', value: y }) - 8}px`,
      backgroundColor: color
    })
  }

  // 拖拽时鼠标移动
  dragMouseMoving() {
    this.drawHistory()
  }

  mouseScaling() {
    this.drawHistory()
  }
}

export default KlineCanvas
