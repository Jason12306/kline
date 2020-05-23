/**
 * @name MaskCanvas
 * @description 主体 k 线 遮罩层
 */
import DrawView from './DrawView'
import CONSTANTS from './config/CONSTANTS'

class KlineMaskCanvas extends DrawView {
  constructor() {
    super()
    this.mousemoveThrottleTimer = null // 定时器
    this.mousewheelThrottleTimer = null // 定时器
    this.c = this.$Od.$createElement('canvas')
    this.c.style.position = 'absolute'
    this.c.style.zIndex = 100
    this.c.style.top = 0
    this.c.style.left = 0
    this.c.style.cursor = 'crosshair'
    this.c.width = this._handleDevicePixelRatio({ value: this.$decimal('-', this.$store.state.el.offsetWidth, this.$store.state.y_axis_width) })
    this.c.height = this._handleDevicePixelRatio({ value: this.$decimal('-', this.$store.state.el.offsetHeight, this.$store.state.x_axis_height) })
    this.c.style.width = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.width })}px`
    this.c.style.height = `${this._handleDevicePixelRatio({ symbol: '/', value: this.c.height })}px`
    this._ctx = this.c.getContext("2d");

    this.c.addEventListener('mousedown', this.mousedown.bind(this))
    this.c.addEventListener('mouseup', this.mouseup.bind(this))
    this.c.addEventListener('mousemove', this.mousemove.bind(this))
    this.c.addEventListener('mouseleave', this.mouseleave.bind(this))
    this.c.addEventListener('mouseenter', this.mouseenter.bind(this))
    this.c.addEventListener('mousewheel', this.mousewheel.bind(this))
    this.c.addEventListener('DOMMouseScroll', this.mousewheel.bind(this)) // Firefox
    this.c.addEventListener('contextmenu', this.contextmenu.bind(this))

    this.$watcher.on(CONSTANTS.WATCHER_EVENT.ONE_DATA_UPDATED, this.onOneDataUpdated.bind(this))

    this.tagY = null // y tag
    this.tagX = null // x tag
    this.realTimeTagY = null // realTimeYTag
    this.createXTag()
    this.createYTag()
    this.createRealTimeYTag()

    this.INIT_OFFSET_X = this.$store.state.init_offset_x // 初始的偏移量
    // 限制图表缩放位置
    this.limitOffsetX = this.$decimal('*', this.c.width, (1 - this.$store.state.limit_offset_x))
  }

  // 绘制十字虚线 并设置 tagX tagY 的内容 
  // x , y 已经手动扩大了 devicePixelRatio 倍 以 canvas 为标准
  drawCrossDottedLine(e, { x, y }) {
    this.$store.commit('current_cross_dash_line', { x, y })
    let { max, min, kline_data, column_width, volume_height } = this.$store.state
    let newestKlineDataX = kline_data[0].x
    let inNewestData = newestKlineDataX <= x && x <= this.$decimal('+', newestKlineDataX, column_width)  // Boolean
    this.$store.commit('cross_is_in_newest_data', inNewestData)
    let { time } = this.$store.state.current_data

    let volume_height_dpr = this._handleDevicePixelRatio({ value: volume_height })

    let dataGap = this.$decimal('-', max, min)
    let everyPXData = this.$decimal('/', dataGap, (this.c.height - volume_height_dpr))
    let px = this.$decimal('-', this.c.height, volume_height_dpr, y) // 与高度互补
    let currentY = this.$decimal('+', this.$decimal('*', everyPXData, px), min)

    if (y > (this.c.height - volume_height_dpr)) {
      this.tagY.style.display = 'none'
    } else {
      this.tagY.style.display = 'block'
    }
    this.tagY.innerText = currentY.toFixed(2)
    this.tagY.style.top = `${this._handleDevicePixelRatio({ symbol: '/', value: y }) - 8}px` //  为tag 元素高度一半
    this.tagX.innerText = this.$time.format(time, 'YYYY-MM-DD HH:mm')

    this.tagX.style.left = `${x / this.$devicePixelRatio}px` // dom 像素 非 canvas 像素 
    this._ctx.setLineDash([5]) // 虚线间隔
    this._ctx.strokeStyle = '#758696' // 虚线颜色

    // 横虚线
    this._ctx.beginPath();
    this._ctx.moveTo(0, y - 0.5);
    this._ctx.lineTo(this.c.width, y - 0.5);
    this._ctx.stroke();

    // 竖虚线
    this._ctx.beginPath();
    let middleX = this.$decimal('+', x, Math.ceil(this.$store.state.column_width / 2)) - 0.5
    this._ctx.moveTo(middleX, 0);
    this._ctx.lineTo(middleX, this.c.height);
    this._ctx.stroke();
  }

  // 鼠标拖拽移动
  dragMousemove(e) {
    let { all_kline_data, current_scale, init_offset_x } = this.$store.state
    this.$store.commit('no_scale_offset_x', this.$decimal('/', init_offset_x, current_scale))
    let currentXMove = this.$decimal('*', this.$devicePixelRatio, this.$decimal('-', this.startDragX, e.layerX))
    let cOffset = this.$decimal('+', this.INIT_OFFSET_X, currentXMove)
    if (cOffset > this.limitOffsetX) cOffset = this.limitOffsetX
    this.$store.commit('init_offset_x', cOffset)
    this.dealCanDrawViewData(all_kline_data)
    this.$watcher.emit(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING)
  }

  // 清空画布
  clearScreen() {
    this._clearScreen(this._ctx, this.c.width, this.c.height)
  }

  // 常规鼠标移动 和 拖拽鼠标移动
  mousemove(e) { // 十字光标鼠标移动
    if (this.mousemoveThrottleTimer === null) {
      this.mousemoveThrottleTimer = window.requestAnimationFrame(() => {
        this.$store.commit('current_mouse_coordinates', { x: e.layerX * this.$devicePixelRatio, y: e.layerY * this.$devicePixelRatio })
        if (this.canDragable) { // 拖拽移动
          this.dragMousemove(e)
        } else { // 常规鼠标移动
          this.$store.state.kline_data.every(item => {
            let perDataRange = this.$decimal('+', item.x, this.$store.state.column_width)
            if (item.x <= (e.layerX * this.$devicePixelRatio) && item.x <= perDataRange) {
              this.$store.commit('current_data', item)
              /* 设置当前数据对象 */
              this.clearScreen()
              this.drawCrossDottedLine(e, { x: item.x, y: e.layerY * this.$devicePixelRatio })
              return false
            }
            return true
          })
        }
        this.$watcher.emit(CONSTANTS.WATCHER_EVENT.MOUSE_MOVING)
        window.cancelAnimationFrame(this.mousemoveThrottleTimer)
        this.mousemoveThrottleTimer = null
      })
    }
  }

  // 鼠标缩放
  mousewheel(e) {
    if (this.mousewheelThrottleTimer === null) {
      console.log('%c mousewheel', 'color: brown');
      this.mousewheelThrottleTimer = window.requestAnimationFrame(() => {
        let { scale_step, max_scale, min_scale, current_scale, all_kline_data, DEFAULT_COLUMN_WIDTH, DEFAULT_COLUMN_SPACE, no_scale_offset_x } = this.$store.state
        let cScale = current_scale
        // 兼容Firefox
        if (e.deltaY < 0 || e.detail < 0) { // 小于 0 向前滚动 即放大
          // 限制继续放大
          if (this.$decimal('*', no_scale_offset_x, cScale) <= this.limitOffsetX) {
            if (current_scale < max_scale) cScale = this.$decimal('+', current_scale, scale_step)
          }
        } else {
          if (current_scale > min_scale) cScale = this.$decimal('-', current_scale, scale_step)
        }

        this.$store.commit('current_scale', cScale)
        let scaledNum = this.$store.state.current_scale // 缩放后的值
        this.$store.commit('init_offset_x', this.$decimal('*', no_scale_offset_x, scaledNum))
        this.INIT_OFFSET_X = this.$store.state.init_offset_x
        this.$store.commit('column_width', this.$decimal('*', DEFAULT_COLUMN_WIDTH, scaledNum))
        this.$store.commit('column_space', this.$decimal('*', DEFAULT_COLUMN_SPACE, scaledNum))
        /* 缩放结果 */
        this.dealCanDrawViewData(all_kline_data)
        this.$watcher.emit(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING)
        window.cancelAnimationFrame(this.mousewheelThrottleTimer)
        this.mousewheelThrottleTimer = null
      })
    }
  }

  // 鼠标进入遮罩canvas
  mouseenter() {
    console.log('%c mouseenter', 'color: #fff; background-color: green');
    let clearScreenTimer = setTimeout(() => {
      this.tagX.style.display = 'block'
      this.tagY.style.display = 'block'
      clearTimeout(clearScreenTimer)
    }, 50)
    clearScreenTimer = null
  }

  // 鼠标离开遮罩canvas
  mouseleave() {
    console.log('%c mouseleave', 'color: #fff; background-color: red');
    this.canDragable = false
    this.INIT_OFFSET_X = this.$store.state.init_offset_x // 初始的偏移量
    let clearScreenTimer = setTimeout(() => {
      this.tagX.style.display = 'none'
      this.tagY.style.display = 'none'
      this.$store.commit('cross_is_in_newest_data', null)
      this.clearScreen()
      clearTimeout(clearScreenTimer)
    }, 50)
    clearScreenTimer = null

  }

  // 鼠标按下
  mousedown(e) {
    if (!e.button) {
      console.log('%c mousedown', 'color: green');
      this.startDragX = e.layerX
      this.canDragable = true
      this.$Od.$setElementAttribute(this.c, 'class', 'is-grabbing')
    }
  }

  // 鼠标弹起
  mouseup(e) {
    if (!e.button) {
      console.log('%c mouseup', 'color: red');
      this.canDragable = false
      this.INIT_OFFSET_X = this.$store.state.init_offset_x // 初始的偏移量
      this.$Od.$removeElementAttribute(this.c, 'class', 'is-grabbing')
    }
  }

  contextmenu(e) {
    e.preventDefault()
    console.log('%c contextmenu', 'color: brown');
    console.log('右键菜单');
  }

  // 创建 实时显示价格 de Y 标签 
  createRealTimeYTag() {
    this.realTimeTagY = this.$Od.$createElement('div')
    this.$Od.$setElementAttribute(this.realTimeTagY, 'id', 'real_time_volume')
    this.$Od.$setElementAttribute(this.realTimeTagY, 'style', {
      position: 'absolute',
      zIndex: '80',
      right: 0,
      width: `${this.$store.state.y_axis_width}px`,
      fontSize: '12px',
      textAlign: 'center',
      color: '#fff',
      userSelect: 'none'
    })
    this.$store.state.vy_chart.appendChild(this.realTimeTagY)
    this.$store.commit('realtime_tagY', this.realTimeTagY)
  }

  // 创建 显示价格 de Y 标签 
  createYTag() {
    this.tagY = this.$Od.$createElement('div')
    this.$Od.$setElementAttribute(this.tagY, 'id', 'volume')
    this.$Od.$setElementAttribute(this.tagY, 'style', {
      position: 'absolute',
      zIndex: '100',
      right: 0,
      width: `${this.$store.state.y_axis_width}px`,
      fontSize: '12px',
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#585858',
      userSelect: 'none'
    })
    this.$store.state.vy_chart.appendChild(this.tagY)
    this.$store.commit('YTag', this.tagY)
  }

  // 创建 日期 de X 标签 
  createXTag() {
    this.tagX = this.$Od.$createElement('div')
    this.$Od.$setElementAttribute(this.tagX, 'id', 'date-time')
    this.$Od.$setElementAttribute(this.tagX, 'style', {
      position: 'absolute',
      zIndex: '100',
      bottom: `${this.$store.state.x_axis_height - 44}px`, // - 24,
      fontSize: '12px',
      color: '#fff',
      backgroundColor: '#585858',
      transform: 'translate(-50%, 0)',
      whiteSpace: 'noWrap',
      userSelect: 'none'
    })
    this.$store.state.vy_chart.appendChild(this.tagX)
  }

  // 更新一条数据事件
  onOneDataUpdated(nowData) {
    let { cross_is_in_newest_data } = this.$store.state
    if (cross_is_in_newest_data) {
      this.tagX.innerText = this.$time.format(nowData.time, 'YYYY-MM-DD HH:mm')
    }
  }
}

export default KlineMaskCanvas
