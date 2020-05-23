export default {
  DEFAULT_COLUMN_WIDTH: 5,
  DEFAULT_COLUMN_SPACE: 1, // 奇数
  VIEW_CHANGE_TRIGGER_WAY: { // 视图柱发生变化时的触发方式 
    SCALE: 'SCALE' // 缩放触发
  },
  // --- 图表类型 ---
  CHART_TYPE: {
    // 美国线
    KLINE: 'KLINE', // K线图 
    REAL_TIME: 'REAL_TIME', // 分时图
    EMPTY_KLINE: 'EMPTY_KLINE', // 空心K线图 
    // 平均K线图
    // 线形图
    // 面积图
    // 基准线
    // 砖形图
    // 新价线
    // 卡吉图
    // 点数图
    // Range图 
  },
  // --- 观察者事件 --- 
  WATCHER_EVENT: {
    DRAG_MOUSE_MOVING: 'dragMouseMoving',
    MOUSE_SCALING: 'mouseScaling',
    ONE_DATA_UPDATED: 'onOneDataUpdated',
    MOUSE_MOVING: 'mouseMoving',
    REAL_TIME_DATA: 'onRealTimeData',
    HISTORY_DATA_CHANGE: 'historyDataChange',
    SWITCHED_INTERVAL: 'switchedInterval',
    THEME_SWITCHED: 'themeSwitched'
  }
}