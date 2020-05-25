/**
 * @description 基础图表配置类
*/
import Od from './utils/operate-dom'
import time from './utils/time-formater'
import decimal from './utils/decimals'
import Watcher from './utils/watcher'
import Store from './utils/store'
import CONSTANTS from './config/CONSTANTS'
import themes from './config/theme'
import { CAN_CUSTOM_CONFIG, DEFAULT_CONFIG } from './config/ChartConfig'

const THEME = themes

function copyObjectUnsafe(o) {
  return JSON.parse(JSON.stringify(o))
}

class ChartBaseConfig {
  constructor() {
    this.CONSTANTS = CONSTANTS
    this.THEME = THEME
    this.$Od = Od
    this.$time = time
    this.$decimal = decimal
    this.$copyObjectUnsafe = copyObjectUnsafe
    this.$watcher = new Watcher()
    this.$store = new Store({
      state: Object.assign(DEFAULT_CONFIG, CAN_CUSTOM_CONFIG)
    })
    this.$handleCanvasDrawValue = val => {
      return Math.round(val) + 0.5
    }
    this.$devicePixelRatio = window.devicePixelRatio || 1
  }
}

let baseChartConfigInstcance = new ChartBaseConfig()

export default class {
  constructor() {
    for (let k in baseChartConfigInstcance) {
      this[k] = baseChartConfigInstcance[k]
    }
  }

  _customChart(conf) {
    let keys = Object.keys(CAN_CUSTOM_CONFIG)
    let { theme } = this.$store.state.user_config
    let mergedConfig = conf
    if (!mergedConfig.chartType) mergedConfig.chartType = CAN_CUSTOM_CONFIG.chart_type
    if (!THEME[theme]) theme = mergedConfig.theme || 'light'

    mergedConfig = Object.assign({}, { theme: THEME[theme] }, mergedConfig)
    for (let c in mergedConfig) {
      if (keys.includes(c)) {
        this.$store.commit(c, mergedConfig[c])
      }
    }
    /* 当存在于默认配置，则需要同步配置 */
    mergedConfig.init_offset_x && this.$store.commit('no_scale_offset_x', mergedConfig.init_offset_x)
    this.$store.commit('chart_type', mergedConfig.chartType)
  }

  _clearScreen(ctx, w, h) {
    ctx.clearRect(0, 0, w, h)
  }

  _drawBackground(ctx, w, h) {
    ctx.beginPath()
    ctx.globalAlpha = 1
    ctx.fillStyle = this.$store.state.theme.background_color
    ctx.fillRect(0, 0, w, h)
  }

  // 处理不同dpr设备 
  _handleDevicePixelRatio({ symbol = '*', value }) {
    return this.$decimal(symbol, value, this.$devicePixelRatio)
  }
}
