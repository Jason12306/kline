import ChartBaseConfig from './ChartBaseConfig'
import CONSTANTS from './config/CONSTANTS'

class GenerateSpan {
  constructor($Od, { data = 0, html }) {
    this.span = $Od.$createElement('span')
    this.html = html
    this.data = data
    this.span.innerHTML = `${html}=<i style="color: ${this.color};">${this.data}</i>`
  }

  setData(data, color, spanColor) {
    this.data = data
    this.span.innerHTML = `${this.html}=<i style="color: ${color};">${this.data}</i>`
    this.span.style.color = spanColor
  }
}

class Dashboard extends ChartBaseConfig {
  constructor() {
    super()
    this.dashboardWrapper = this.$Od.$createElement('div')
    this.$Od.$setElementAttribute(this.dashboardWrapper, 'id', 'dashboard-wrapper')
    this.$Od.$setElementAttribute(this.dashboardWrapper, 'style', {
      position: 'absolute',
      zIndex: '50',
      left: 0,
      top: 0
    })

    this.spanWrapper = this.$Od.$createElement('div')
    this.$Od.$setElementAttribute(this.spanWrapper, 'id', 'span-wrapper')
    this.dashboardWrapper.appendChild(this.spanWrapper)

    const { language } = this.$store.state

    this.openSpan = new GenerateSpan(this.$Od, {
      html: language.dashboard.open
    })

    this.highSpan = new GenerateSpan(this.$Od, {
      html: language.dashboard.high
    })

    this.lowSpan = new GenerateSpan(this.$Od, {
      html: language.dashboard.low
    })

    this.closeSpan = new GenerateSpan(this.$Od, {
      html: language.dashboard.close
    })

    this.volSpan = new GenerateSpan(this.$Od, {
      html: 'Vol'
    })

    this.MA5Span = new GenerateSpan(this.$Od, {
      html: 'MA5'
    })
    this.MA10Span = new GenerateSpan(this.$Od, {
      html: 'MA10'
    })

    this.spanWrapper.appendChild(this.openSpan.span)
    this.spanWrapper.appendChild(this.highSpan.span)
    this.spanWrapper.appendChild(this.lowSpan.span)
    this.spanWrapper.appendChild(this.closeSpan.span)
    this.spanWrapper.appendChild(this.volSpan.span)
    this.spanWrapper.appendChild(this.MA5Span.span)
    this.spanWrapper.appendChild(this.MA10Span.span)

    this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_MOVING, this.mouseMoving.bind(this))
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, this.onRealTimeData.bind(this))

  }

  setSpanInnerText({ open, high, low, close, volume, MAClose5 = 0, MAClose10 = 0 }) {
    let { default_rise_color, default_fall_color, axis_text_color, ma_Lines, precision } = this.$store.state
    let color = close >= open ? default_rise_color : default_fall_color
    this.openSpan.setData(open.toFixed(precision), color, axis_text_color)
    this.highSpan.setData(high.toFixed(precision), color, axis_text_color)
    this.lowSpan.setData(low.toFixed(precision), color, axis_text_color)
    this.closeSpan.setData(close.toFixed(precision), color, axis_text_color)
    this.volSpan.setData(volume, color, axis_text_color)
    this.MA5Span.setData(MAClose5.toFixed(precision), ma_Lines[0].lineColor, axis_text_color)
    this.MA10Span.setData(MAClose10.toFixed(precision), ma_Lines[1].lineColor, axis_text_color)
  }

  mouseMoving() {
    if (this.$store.state.current_data) {
      let { open, high, low, close, volume, MAClose5, MAClose10 } = this.$store.state.current_data
      this.setSpanInnerText({ open, high, low, close, volume, MAClose5, MAClose10 })
    }
  }

  onRealTimeData() {
    let { cross_is_in_newest_data, kline_data } = this.$store.state
    // 十字虚线位置在 第一条 数据区域内 or null
    if (cross_is_in_newest_data || cross_is_in_newest_data === null) {
      let { open, high, low, close, volume, MAClose5, MAClose10 } = kline_data[0]
      this.setSpanInnerText({ open, high, low, close, volume, MAClose5, MAClose10 })
    }
  }

  setDashboardLang() {
    const { language } = this.$store.state
    this.openSpan.html = language.dashboard.open
    this.highSpan.html = language.dashboard.high
    this.lowSpan.html = language.dashboard.low
    this.closeSpan.html = language.dashboard.close
  }
}

export default Dashboard
