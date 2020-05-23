/* 时间粒度条  1min 3min 5min 2019年11月29日18:36:37 */

import ChartBaseConfig from './ChartBaseConfig'
import IntervalText from './config/IntervalText'
import CONSTANTS from './config/CONSTANTS'

class IntervalToolBar extends ChartBaseConfig {
  constructor() {
    super()
    this.c = this.$Od.$createElement('div')
    this.throttleTimer = null
    this.cacheChartType = this.$store.state.chart_type
    this.$Od.$setElementAttribute(this.c, 'id', 'interval_tool_bar')
    this.$Od.$setElementAttribute(this.c, 'style', {
      height: this.$store.state.interval_tool_bar,
      lineHeight: this.$store.state.interval_tool_bar,
      backgroundColor: this.$store.state.background_color,
    })

    if (this.$store.state.user_config.theme) {
      this.$Od.$setElementAttribute(this.c, 'class', this.$store.state.user_config.theme)
    }

    this.createTimeShareBtn()
    this.createIntervalBtn()
    // 主题切换
    this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, theme => {
      this.$Od.$setElementAttribute(this.c, 'style', {
        backgroundColor: this.$store.state.theme.background_color,
      })
      this.$Od.$setElementAttribute(this.c, 'class', theme)
    })

  }
  /* 创建时间粒度按钮 */
  createIntervalBtn() {
    let { user_config, chart_instance } = this.$store.state
    let { interval, deedfeeds, onTimeIntervalChanged } = user_config
    interval.forEach(item => {
      let button = this.$Od.$createElement('button')
      let num = item.slice(1)
      button.innerText = `${num} ${IntervalText[item[0]].text}`
      this.$Od.$setElementAttribute(button, 'class', 'interval-item')
      this.$Od.$setElementAttribute(button, 'data-interval-item', item)
      let { current_interval, loadingNode } = this.$store.state
      if (current_interval === item) {
        this.$Od.$setElementAttribute(button, 'class', 'interval-item active')
      }

      button.onclick = () => {
        if (!this.throttleTimer) {
          let { current_interval, chart_type } = this.$store.state
          if (current_interval === item && chart_type !== this.CONSTANTS.CHART_TYPE.REAL_TIME) return
          this.throttleTimer = setTimeout(() => {
            if (typeof onTimeIntervalChanged === "function") {
              onTimeIntervalChanged(item);
            }
            loadingNode.style.display = 'block'
            this.$store.commit('chart_type', this.cacheChartType)
            this.$store.commit('all_kline_data', [])
            this.$store.commit('kline_data', [])
            this.$store.commit('current_interval', item)
            this.$Od.$setElementAttribute(document.getElementsByClassName('interval-item active')[0], 'class', 'interval-item')
            this.$Od.$setElementAttribute(button, 'class', 'interval-item active')
            deedfeeds.intervalChanged({ interval: item, setHistoryData: chart_instance.initHistoryData, subscribeData: chart_instance.getRealTimeData })
            this.throttleTimer = null
          }, 200)
        }
      }
      this.c.appendChild(button)
    })
  }

  /* 创建分时按钮 */
  createTimeShareBtn() {
    let { user_config, chart_instance, loadingNode } = this.$store.state
    let { deedfeeds } = user_config
    let button = this.$Od.$createElement('button')
    button.innerText = '分时'
    this.$Od.$setElementAttribute(button, 'class', 'interval-item')
    this.$Od.$setElementAttribute(button, 'data-interval-item', 'time-sharing')

    button.onclick = () => {
      loadingNode.style.display = 'block'
      this.cacheChartType = this.$store.state.chart_type
      this.$store.commit('chart_type', this.CONSTANTS.CHART_TYPE.REAL_TIME)
      this.$store.commit('all_kline_data', [])
      this.$store.commit('current_interval', 'm1')
      this.$Od.$setElementAttribute(document.getElementsByClassName('interval-item active')[0], 'class', 'interval-item')
      this.$Od.$setElementAttribute(button, 'class', 'interval-item active')
      deedfeeds.intervalChanged({ interval: 'm1', setHistoryData: chart_instance.initHistoryData, subscribeData: chart_instance.getRealTimeData })
    }

    this.c.appendChild(button)
  }
}

export default IntervalToolBar
