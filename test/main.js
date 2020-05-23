/* 业务逻辑部分 */
import VyKline from '../src'
// import deedfeeds from './http-deedfeeds'
import deedfeeds from './ws-deedfeeds'

window.VyKline = VyKline

const customLoading = document.createElement('div')
customLoading.innerHTML = '<h1>loading</h1> '
customLoading.style.position = 'absolute'
customLoading.style.display = 'block'
customLoading.style.zIndex = '9527'
customLoading.style.top = 0
customLoading.style.left = 0
customLoading.style.width = '100%'
customLoading.style.height = '100%'
customLoading.style.background = 'pink'

async function initOnReady() {
  VyKline.bootstrap({
    container: document.getElementById('chart_container'), // 容器
    deedfeeds, // 数据反馈对象
    showIntervalToolbar: true,
    defaultInterval: 'm1',
    interval: ['m1', 'm5', 'm15', 'm30'],
    // theme: 'dark',
    customChart: {
      init_offset_x: 250,
      default_rise_color: '#26a69a',
      default_fall_color: '#ef5350'
    },
    chartType: 'EMPTY_KLINE',
    // customLoadingEl: customLoading,
    onTimeIntervalChanged: interval => {
      console.log("interval", interval);
    }
  })
  /* let select = document.getElementById('currency')
  select.onchange = function (e) {
    deedfeeds.switchCurrency(e.target.value)
  } */
}

window.addEventListener('DOMContentLoaded', initOnReady, false);
