/**
 * @author Vanyi
 * @description kline
 * @date 2019年10月26日15:38:04
 */
import './style'
import KlineCanvas from './KlineCanvas'
import KlineMaskCanvas from './KlineMaskCanvas'
import YAxis from './YAxis'
import XAxis from './XAxis'
import VolumeCanvas from './VolumeCanvas'
import Dashboard from './Dashboard'
import DrawView from './DrawView'
import VolYAxis from './VolYAxis'
import IntervalToolBar from './IntervalToolBar'
import BottomRightBlock from './BottomRightBlock'
import CONSTANTS from './config/CONSTANTS'

// 创建最外层节点
function VyChartNode($Od, container, state) {
  let vyChart = $Od.$createElement('div')
  $Od.$setElementAttribute(vyChart, 'id', 'vy-chart')
  $Od.$setElementAttribute(vyChart, 'style', {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: `calc(100% - ${state.interval_tool_bar})`
  })

  container.appendChild(vyChart)
  return vyChart
}

// default loading...
function loadingNode($Od, container, state) {
  let loading = $Od.$createElement('div')
  let spin = $Od.$createElement('div')
  $Od.$setElementAttribute(loading, 'id', 'loading')
  $Od.$setElementAttribute(spin, 'class', 'spin')
  spin.innerText = 'loading...'
  $Od.$setElementAttribute(loading, 'style', {
    display: 'block',
    position: 'absolute',
    zIndex: '9527',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255, 0.6)'
  })
  loading.appendChild(spin)
  container.appendChild(loading)
  return loading

}

/**
 * k线图 主类
 */

class Chart extends DrawView {
  /* chart_container */
  constructor() {
    super()
    this.customChart = null
  }
  // 启动图表
  bootstrap(userConfig) {
    let { container, deedfeeds, defaultInterval, customChart, showIntervalToolbar = true, customLoadingEl } = userConfig
    this.$store.commit('user_config', userConfig)
    this.customChart = customChart
    this._customChart(customChart)
    this.$store.commit('deedfeeds', deedfeeds)
    this.$store.commit('current_interval', defaultInterval)

    /* init loading */
    if (customLoadingEl) {
      if (customLoadingEl instanceof HTMLElement) {
        this.loading = customLoadingEl
        this.$store.commit('loadingNode', this.loading)
        container.appendChild(this.loading)
      } else {
        console.error('[vy-kline:ERROR] option "customLoadingEl" is not a HTMLElement;')
      }
    } else { // 加载默认loading
      this.loading = loadingNode(this.$Od, container, this.$store.state)
      this.$store.commit('loadingNode', this.loading)
    }
    /* ================ */
    /* init toolbar */
    this.intervalToolBarInstance = new IntervalToolBar()
    container.appendChild(this.intervalToolBarInstance.c)
    this.intervalToolBarInstance.c.style.display = !showIntervalToolbar ? 'none' : 'block'
    /* ================ */

    this.vyChart = VyChartNode(this.$Od, container, this.$store.state)
    this.$store.commit('el', this.vyChart)
    this.$store.commit('vy_chart', this.vyChart)

    container.style.position = 'relative'
    this.container = container
    this.deedfeeds = deedfeeds
    this.KlineCanvas = null // 主体k线
    this.YAxis = null // Y轴
    this.XAxis = null
    this.Dashboard = null // 左上数据信息
    this.VolumeCanvas = null // 交易量
    this.BottomRightBlock = null // 右下角块
    this.initHistoryData = this.initHistoryData.bind(this)
    this.getRealTimeData = this.getRealTimeData.bind(this)
    // 获取数据后 启动图表 + 获取 实时 k线数据
    deedfeeds.setHistoryData({ interval: defaultInterval, setHistoryData: this.initHistoryData, subscribeData: this.getRealTimeData })
  }

  // 初始化历史数据 main logic 
  // getRealTimeData 会触发这里 避免重复 commit 数据不变时可以优化
  initHistoryData(allData) {
    // allData 初始化时得到所有数据 币种切换时也会触发
    this.$store.commit('all_kline_data', allData)
    this.dealCanDrawViewData(allData)
    if (!this.KlineCanvas) {
      this.initViewOnce() // 保持单例
    }
    this.KlineCanvas.drawHistory()
    this.VolumeCanvas.draw()
    this.$watcher.emit(CONSTANTS.WATCHER_EVENT.HISTORY_DATA_CHANGE)
    this.loading.style.display = 'none'
  }

  // 获取 实时 k线数据
  getRealTimeData(nowData) {
    // 排除 time 为undefined 情况 首次加载可能会出现
    if (!nowData.time) return
    let { all_kline_data } = this.$store.state
    // 等于  替换数据 
    if (!all_kline_data[0]) return
    if (all_kline_data[0].time === nowData.time) {
      all_kline_data[0] = nowData
    } else { // 否则 unshift 数据  数据异常时存在各种情况 需要新增捕错机制
      all_kline_data.unshift(nowData)
      this.$watcher.emit(CONSTANTS.WATCHER_EVENT.ONE_DATA_UPDATED, nowData)
    }
    this.$store.commit('all_kline_data', all_kline_data)
    /* 处理完成后当成 完整的历史数据 绘制 */
    this.initHistoryData(this.$store.state.all_kline_data)
    this.$watcher.emit(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA)
  }

  // 初始化视图节点 once
  initViewOnce() {
    this.KlineCanvas = new KlineCanvas({
      backgroundColor: '#fff'
    })
    this.$store.commit('kline_canvas', this.KlineCanvas)

    this.KlineMaskCanvas = new KlineMaskCanvas()

    this.XAxis = new XAxis()

    this.YAxis = new YAxis()

    this.VolYAxis = new VolYAxis()

    this.VolumeCanvas = new VolumeCanvas()

    this.Dashboard = new Dashboard()

    this.BottomRightBlock = new BottomRightBlock()

    this.intervalToolBarInstance.c.style.backgroundColor = this.$store.state.background_color

    this.XAxis.draw()
    this.YAxis.draw()
    this.VolYAxis.draw()
    this.BottomRightBlock.draw()

    this.vyChart.appendChild(this.KlineCanvas.c)
    this.vyChart.appendChild(this.KlineMaskCanvas.c)
    this.vyChart.appendChild(this.VolumeCanvas.c)
    this.vyChart.appendChild(this.XAxis.c)
    this.vyChart.appendChild(this.YAxis.c)
    this.vyChart.appendChild(this.VolYAxis.c)
    this.vyChart.appendChild(this.Dashboard.dashboardWrapper)
    this.vyChart.appendChild(this.BottomRightBlock.c)
  }

  // 设置图表类型
  switchChartType(type) {
    this.$store.commit('chart_type', type)
    this.initHistoryData(this.$store.state.all_kline_data)
  }

  // 主题切换
  switchTheme(theme) {
    this.$store.commit('theme', this.THEME[theme])
    this.$watcher.emit(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, theme)
    this.initHistoryData(this.$store.state.all_kline_data)
  }
}
let chartInstance = new Chart()
chartInstance.$store.commit('chart_instance', chartInstance)

window.vyChart = chartInstance
export default chartInstance
