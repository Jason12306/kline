import CONSTANTS from './CONSTANTS'

let devicePixelRatio = window.devicePixelRatio || 1

// 可自定配置的选项
let CAN_CUSTOM_CONFIG = {
  scale_step: 0.2, // 缩放step
  max_scale: 6, // 放大最大值
  min_scale: 1, // 缩小最小值
  x_axis_height: 54, // x轴高度
  y_axis_width: 54, // y 轴宽度
  axis_segment: 3, // 坐标轴线段宽度
  default_rise_color: '#53b987', // 涨 绿
  default_fall_color: '#eb4d5c', // 跌 红
  column_style: 'solid', //  实心 solid || 空心 hollow
  init_offset_x: 100, // 初始图表偏移量
  volume_height: 100, // 交易量 canvas 高度
  interval_tool_bar: '30px', // 时间粒度 默认高度
  theme: {
    background_color: null, // 背景颜色
    axis_text_color: null, // 坐标轴文本颜色
    axis_color: null, // 坐标轴及其线段颜色
    background_line_color: null, // 背景线颜色
    realtime_line_color: null, //分时图线条颜色
    realtime_area_color: null, //分时图区域颜色
  },
  precision: 2, // 数据精度
  chart_type: CONSTANTS.CHART_TYPE.KLINE, // 自定义图表类型
}

// 默认配置
let DEFAULT_CONFIG = {
  user_config: null, // 用户传入的配置
  el: null, // 挂载节点 真实节点
  loadingNode: null,// loading节点
  chart_instance: null, // 图表实例
  vy_chart: null, // push x , y Axis
  DEFAULT_COLUMN_WIDTH: CONSTANTS.DEFAULT_COLUMN_WIDTH * devicePixelRatio,
  DEFAULT_COLUMN_SPACE: CONSTANTS.DEFAULT_COLUMN_SPACE * devicePixelRatio,
  column_width: CONSTANTS.DEFAULT_COLUMN_WIDTH * devicePixelRatio, // 柱宽
  column_space: CONSTANTS.DEFAULT_COLUMN_SPACE * devicePixelRatio, // 柱间隔
  current_interval: null, // 当前时间粒度
  kline_data: [], // 绘制的 kline 数据 important
  all_kline_data: [], // 所有的 kline 数据： 0 -> n 时间： 现在 -> 过去
  current_data: null, // 鼠标移动时的当前数据
  min: null, // 视图数据中的最小值
  max: null, // 视图数据中的最大值
  kline_canvas: null, // k线图的实例
  current_mouse_coordinates: { x: null, y: null }, // 当前 鼠标坐标
  current_cross_dash_line: { x: null, y: null }, // 当前 十字虚线 坐标
  cross_is_in_newest_data: null, // Boolean 十字光标是否在最新的数据上 初始给个 null
  deedfeeds: null, // 数据反馈对象
  y_axis_scale_list: [], //  y 轴刻度集合list
  YTag: null, //  y 标签
  realtime_tagY: null, // 实时数据 y 标签
  axis_font: `${12 * devicePixelRatio}px Arial`, // 坐标轴文字样式
  current_scale: 1, // 当前缩放比例
  no_scale_offset_x: CAN_CUSTOM_CONFIG.init_offset_x, // 不缩放时的偏移量 单位偏移量
  limit_offset_x: 1 / 4,  // 限制偏移量 位于图表 n / 3 处 (0 , 1),
  every_data_px: null, // 单位数据 所占像素
  overflow_data_num: 0, // 超出视图的数据数目
  ma_Lines: [
    {
      range: 5,
      lineColor: '#583d7a'
    },
    {
      range: 10,
      lineColor: '#95a4c7'
    }
  ],
  chart_type: CONSTANTS.CHART_TYPE.KLINE // 图表类型 default: kline
}

export { CAN_CUSTOM_CONFIG, DEFAULT_CONFIG }
