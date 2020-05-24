(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VyKline = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  /**
   * 节点操作 js
   * 
   */
  var Od = {
    // @param tagName 标签名
    $createElement: function $createElement(tagName) {
      return document.createElement(tagName);
    },
    $setElementAttribute: function $setElementAttribute(el, attr, value) {
      if (_typeof_1(value) === 'object') {
        for (var k in value) {
          el[attr][k] = value[k];
        }
      } else {
        // string | number
        el.setAttribute(attr, value);
      }
    },
    $removeElementAttribute: function $removeElementAttribute(el, attr, value) {
      el.removeAttribute(attr, value);
    },
    $getElementAttribute: function $getElementAttribute(el, attr) {
      return el.getAttribute(attr);
    }
  };

  var INVALID_DATE = 'Invalid Date';

  function commonDeal(matchedTime, matched) {
    matchedTime = matchedTime < 10 ? "0".concat(matchedTime) : matchedTime;
    var l = matchedTime.length;
    var startIndex = matched.length >= matchedTime.length ? l : matched.length;
    return matchedTime.slice(l - startIndex, l);
  }

  var dateStrategies = {
    // 年
    Y: function Y(time, matched) {
      var matchedTime = String(time.getFullYear());
      return commonDeal(matchedTime, matched);
    },
    // 月
    M: function M(time, matched) {
      var matchedTime = String(time.getMonth() + 1);
      return commonDeal(matchedTime, matched);
    },
    // 日
    D: function D(time, matched) {
      var matchedTime = String(time.getDate());
      return commonDeal(matchedTime, matched);
    },
    // 时
    H: function H(time, matched) {
      var matchedTime = String(time.getHours());
      return commonDeal(matchedTime, matched);
    },
    // 分
    m: function m(time, matched) {
      var matchedTime = String(time.getMinutes());
      return commonDeal(matchedTime, matched);
    },
    // 秒
    s: function s(time, matched) {
      var matchedTime = String(time.getSeconds());
      return commonDeal(matchedTime, matched);
    }
  };

  var TimeFormater = /*#__PURE__*/function () {
    function TimeFormater() {
      classCallCheck(this, TimeFormater);
    }

    createClass(TimeFormater, [{
      key: "format",
      value: function format(time, _format) {
        var input = time;

        if (!(time instanceof Date)) {
          input = new Date(time);

          if (String(input) === INVALID_DATE) {
            throw new Error('Invalid Date');
          }
        }

        var reg = /Y{1,}|M{1,}|D{1,}|H{1,}|m{1,}|s{1,}/g;

        var formatTime = _format.replace(reg, function (matched) {
          return dateStrategies[matched[0]](input, matched);
        });

        return formatTime;
      }
    }]);

    return TimeFormater;
  }();

  var time = new TimeFormater();

  /**
   * @description 简单的四则运算 处理精度损失了较大性能 不再处理
  */
  var strategies = {
    // 加
    '+': function _(arg1, arg2) {
      return arg1 + arg2;
    },
    // 减
    '-': function _(arg1, arg2) {
      return arg1 - arg2;
    },
    // 乘
    '*': function _(arg1, arg2) {
      return arg1 * arg2;
    },
    // 除
    '/': function _(arg1, arg2) {
      return arg1 / arg2;
    }
  };
  function decimal (type) {
    var argLen = arguments.length; // 第一个参数 为类型

    var result;

    for (var i = 1; i < argLen; i++) {
      if (i === 1) {
        result = arguments[i];
      } else {
        result = strategies[type](result, arguments[i]);
      }
    }

    return result;
  }

  var tank = {};

  var Watcher = /*#__PURE__*/function () {
    function Watcher() {
      classCallCheck(this, Watcher);
    }

    createClass(Watcher, [{
      key: "emit",
      value: function emit(name) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (!tank[name]) return;
        tank[name].forEach(function (cb) {
          cb(payload);
        });
      }
    }, {
      key: "on",
      value: function on(name, cb) {
        if (!tank[name]) {
          tank[name] = [];
        }

        tank[name].push(cb);
      }
    }]);

    return Watcher;
  }();

  /* 
    简单的数据管理 store
  */
  var Store = /*#__PURE__*/function () {
    function Store(_ref) {
      var _this2 = this;

      var state = _ref.state;

      classCallCheck(this, Store);

      this.state = {};

      var _this = this;

      var _loop = function _loop(k) {
        Object.defineProperty(_this2.state, k, {
          configurable: false,
          enumerable: true,
          get: function get() {
            return state[k];
          },
          set: function set(val) {
            if (_this[k] !== undefined) {
              state[k] = val;
            }
          }
        });
      };

      for (var k in state) {
        _loop(k);
      }
    }

    createClass(Store, [{
      key: "commit",
      value: function commit(k, payload) {
        this[k] = k;
        this.state[k] = payload;
      }
    }]);

    return Store;
  }();

  var CONSTANTS = {
    DEFAULT_COLUMN_WIDTH: 5,
    DEFAULT_COLUMN_SPACE: 1,
    // 奇数
    VIEW_CHANGE_TRIGGER_WAY: {
      // 视图柱发生变化时的触发方式 
      SCALE: 'SCALE' // 缩放触发

    },
    // --- 图表类型 ---
    CHART_TYPE: {
      // 美国线
      KLINE: 'KLINE',
      // K线图 
      REAL_TIME: 'REAL_TIME',
      // 分时图
      EMPTY_KLINE: 'EMPTY_KLINE' // 空心K线图 
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
  };

  var themes = {
    dark: {
      background_color: '#131722',
      // 背景颜色
      axis_text_color: '#ccc',
      // 坐标轴文本颜色
      axis_color: '#ccc',
      // 坐标轴及其线段颜色
      background_line_color: '#363c4e',
      // 背景线颜色
      realtime_line_color: '#9397a4',
      // 分时图线条颜色
      realtime_area_color: 'rgba(70, 80, 120, 0.6)' // 分时图区域颜色

    },
    light: {
      background_color: '#fff',
      // 背景颜色
      axis_text_color: '#50535e',
      // 坐标轴文本颜色
      axis_color: '#50535e',
      // 坐标轴及其线段颜色
      background_line_color: '#e1ecf2',
      // 背景线颜色
      realtime_line_color: '#2196f3',
      // 分时图线条颜色
      realtime_area_color: 'rgba(30, 150, 240, 0.2)' // 分时图区域颜色

    }
  };

  var devicePixelRatio = window.devicePixelRatio || 1; // 可自定配置的选项

  var CAN_CUSTOM_CONFIG = {
    scale_step: 0.2,
    // 缩放step
    max_scale: 6,
    // 放大最大值
    min_scale: 1,
    // 缩小最小值
    x_axis_height: 54,
    // x轴高度
    y_axis_width: 54,
    // y 轴宽度
    axis_segment: 3,
    // 坐标轴线段宽度
    default_rise_color: '#53b987',
    // 涨 绿
    default_fall_color: '#eb4d5c',
    // 跌 红
    column_style: 'solid',
    //  实心 solid || 空心 hollow
    init_offset_x: 100,
    // 初始图表偏移量
    volume_height: 100,
    // 交易量 canvas 高度
    interval_tool_bar: '30px',
    // 时间粒度 默认高度
    theme: {
      background_color: null,
      // 背景颜色
      axis_text_color: null,
      // 坐标轴文本颜色
      axis_color: null,
      // 坐标轴及其线段颜色
      background_line_color: null,
      // 背景线颜色
      realtime_line_color: null,
      //分时图线条颜色
      realtime_area_color: null //分时图区域颜色

    },
    precision: 2,
    // 数据精度
    chart_type: CONSTANTS.CHART_TYPE.KLINE // 自定义图表类型

  }; // 默认配置

  var DEFAULT_CONFIG = {
    user_config: null,
    // 用户传入的配置
    el: null,
    // 挂载节点 真实节点
    loadingNode: null,
    // loading节点
    chart_instance: null,
    // 图表实例
    vy_chart: null,
    // push x , y Axis
    DEFAULT_COLUMN_WIDTH: CONSTANTS.DEFAULT_COLUMN_WIDTH * devicePixelRatio,
    DEFAULT_COLUMN_SPACE: CONSTANTS.DEFAULT_COLUMN_SPACE * devicePixelRatio,
    column_width: CONSTANTS.DEFAULT_COLUMN_WIDTH * devicePixelRatio,
    // 柱宽
    column_space: CONSTANTS.DEFAULT_COLUMN_SPACE * devicePixelRatio,
    // 柱间隔
    current_interval: null,
    // 当前时间粒度
    kline_data: [],
    // 绘制的 kline 数据 important
    all_kline_data: [],
    // 所有的 kline 数据： 0 -> n 时间： 现在 -> 过去
    current_data: null,
    // 鼠标移动时的当前数据
    min: null,
    // 视图数据中的最小值
    max: null,
    // 视图数据中的最大值
    kline_canvas: null,
    // k线图的实例
    current_mouse_coordinates: {
      x: null,
      y: null
    },
    // 当前 鼠标坐标
    current_cross_dash_line: {
      x: null,
      y: null
    },
    // 当前 十字虚线 坐标
    cross_is_in_newest_data: null,
    // Boolean 十字光标是否在最新的数据上 初始给个 null
    deedfeeds: null,
    // 数据反馈对象
    y_axis_scale_list: [],
    //  y 轴刻度集合list
    YTag: null,
    //  y 标签
    realtime_tagY: null,
    // 实时数据 y 标签
    axis_font: "".concat(12 * devicePixelRatio, "px Arial"),
    // 坐标轴文字样式
    current_scale: 1,
    // 当前缩放比例
    no_scale_offset_x: CAN_CUSTOM_CONFIG.init_offset_x,
    // 不缩放时的偏移量 单位偏移量
    limit_offset_x: 1 / 4,
    // 限制偏移量 位于图表 n / 3 处 (0 , 1),
    every_data_px: null,
    // 单位数据 所占像素
    overflow_data_num: 0,
    // 超出视图的数据数目
    ma_Lines: [{
      range: 5,
      lineColor: '#583d7a'
    }, {
      range: 10,
      lineColor: '#95a4c7'
    }],
    chart_type: CONSTANTS.CHART_TYPE.KLINE // 图表类型 default: kline

  };

  var THEME = themes;

  function copyObjectUnsafe(o) {
    return JSON.parse(JSON.stringify(o));
  }

  var ChartBaseConfig = function ChartBaseConfig() {
    classCallCheck(this, ChartBaseConfig);

    this.CONSTANTS = CONSTANTS;
    this.THEME = THEME;
    this.$Od = Od;
    this.$time = time;
    this.$decimal = decimal;
    this.$copyObjectUnsafe = copyObjectUnsafe;
    this.$watcher = new Watcher();
    this.$store = new Store({
      state: Object.assign(DEFAULT_CONFIG, CAN_CUSTOM_CONFIG)
    });

    this.$handleCanvasDrawValue = function (val) {
      return Math.round(val) + 0.5;
    };

    this.$devicePixelRatio = window.devicePixelRatio || 1;
  };

  var baseChartConfigInstcance = new ChartBaseConfig();

  var _default = /*#__PURE__*/function () {
    function _default() {
      classCallCheck(this, _default);

      for (var k in baseChartConfigInstcance) {
        this[k] = baseChartConfigInstcance[k];
      }
    }

    createClass(_default, [{
      key: "_customChart",
      value: function _customChart(conf) {
        var keys = Object.keys(CAN_CUSTOM_CONFIG);
        var theme = this.$store.state.user_config.theme;
        var mergedConfig = conf;
        if (!mergedConfig.chartType) mergedConfig.chartType = CAN_CUSTOM_CONFIG.chart_type;
        if (!THEME[theme]) theme = mergedConfig.theme || 'light';
        mergedConfig = Object.assign({}, {
          theme: THEME[theme]
        }, mergedConfig);

        for (var c in mergedConfig) {
          if (keys.includes(c)) {
            this.$store.commit(c, mergedConfig[c]);
          }
        }
        /* 当存在于默认配置，则需要同步配置 */


        mergedConfig.init_offset_x && this.$store.commit('no_scale_offset_x', mergedConfig.init_offset_x);
        this.$store.commit('chart_type', mergedConfig.chartType);
      }
    }, {
      key: "_clearScreen",
      value: function _clearScreen(ctx, w, h) {
        ctx.clearRect(0, 0, w, h);
      }
    }, {
      key: "_drawBackground",
      value: function _drawBackground(ctx, w, h) {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.$store.state.theme.background_color;
        ctx.fillRect(0, 0, w, h);
      } // 处理不同dpr设备 

    }, {
      key: "_handleDevicePixelRatio",
      value: function _handleDevicePixelRatio(_ref) {
        var _ref$symbol = _ref.symbol,
            symbol = _ref$symbol === void 0 ? '*' : _ref$symbol,
            value = _ref.value;
        return this.$decimal(symbol, value, this.$devicePixelRatio);
      }
    }]);

    return _default;
  }();

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var Kline = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(Kline, _ChartBaseConfig);

    var _super = _createSuper(Kline);

    function Kline() {
      classCallCheck(this, Kline);

      return _super.apply(this, arguments);
    }

    createClass(Kline, [{
      key: "draw",
      value: function draw(_ref) {
        var _this = this;

        var ctx = _ref.ctx;
        this._ctx = ctx;
        this.$store.state.kline_data.forEach(function (data) {
          var x = data.x,
              columnStartY = data.columnStartY,
              columnHeight = data.columnHeight,
              close = data.close,
              open = data.open,
              candleLineStartY = data.candleLineStartY,
              candleLineHeight = data.candleLineHeight;
          var _this$$store$state = _this.$store.state,
              column_width = _this$$store$state.column_width,
              default_rise_color = _this$$store$state.default_rise_color,
              default_fall_color = _this$$store$state.default_fall_color;
          _this._ctx.strokeStyle = _this._ctx.fillStyle = close >= open ? default_rise_color : default_fall_color;
          _this._ctx.lineWidth = 1;

          var lineX = _this.$handleCanvasDrawValue(_this.$decimal('+', x, Math.floor(column_width / 2))); // 线


          _this._ctx.beginPath();

          _this._ctx.moveTo(lineX, candleLineStartY);

          _this._ctx.lineTo(lineX, candleLineStartY + candleLineHeight);

          _this._ctx.lineWidth = 1;

          _this._ctx.stroke(); // 柱


          _this._ctx.fillRect(Math.round(x), columnStartY, column_width, columnHeight);
        });
      }
    }]);

    return Kline;
  }(_default);

  var Kline$1 = new Kline();

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var RealTime = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(RealTime, _ChartBaseConfig);

    var _super = _createSuper$1(RealTime);

    function RealTime() {
      classCallCheck(this, RealTime);

      return _super.apply(this, arguments);
    }

    createClass(RealTime, [{
      key: "draw",
      value: function draw(_ref) {
        var _this = this;

        var ctx = _ref.ctx,
            c = _ref.c;
        this._ctx = ctx;
        this.c = c;

        this._ctx.beginPath();

        var _this$$store$state = this.$store.state,
            kline_data = _this$$store$state.kline_data,
            column_width = _this$$store$state.column_width,
            theme = _this$$store$state.theme;
        var realtime_line_color = theme.realtime_line_color,
            realtime_area_color = theme.realtime_area_color;
        kline_data.forEach(function (data, index) {
          var x = data.x,
              columnStartY = data.columnStartY,
              columnHeight = data.columnHeight,
              isRise = data.isRise;

          var lineX = _this.$handleCanvasDrawValue(_this.$decimal('+', x, Math.floor(column_width / 2)));

          var startY = isRise ? columnStartY : _this.$decimal('+', columnStartY, columnHeight);

          if (!index) {
            _this._ctx.moveTo(lineX, startY);
          } else {
            _this._ctx.lineTo(lineX, startY);
          }
        });
        var firstData = kline_data[0];
        var lastData = kline_data[kline_data.length - 1];
        var lastDataX = this.$handleCanvasDrawValue(this.$decimal('+', lastData.x, Math.floor(column_width / 2)));
        var firstDataX = this.$handleCanvasDrawValue(this.$decimal('+', firstData.x, Math.floor(column_width / 2)));

        this._ctx.lineTo(lastDataX, this.c.height + 1);

        this._ctx.lineTo(firstDataX, this.c.height + 1);

        this._ctx.lineWidth = 1;
        this._ctx.strokeStyle = realtime_line_color;
        this._ctx.fillStyle = realtime_area_color;

        this._ctx.stroke();

        this._ctx.fill();
      }
    }]);

    return RealTime;
  }(_default);

  var RealTime$1 = new RealTime();

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var EmptyKline = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(EmptyKline, _ChartBaseConfig);

    var _super = _createSuper$2(EmptyKline);

    function EmptyKline() {
      classCallCheck(this, EmptyKline);

      return _super.apply(this, arguments);
    }

    createClass(EmptyKline, [{
      key: "draw",
      value: function draw(_ref) {
        var _this = this;

        var ctx = _ref.ctx;
        this._ctx = ctx;
        this.$store.state.kline_data.forEach(function (data, index, arr) {
          var x = data.x,
              columnStartY = data.columnStartY,
              columnHeight = data.columnHeight,
              close = data.close,
              open = data.open,
              candleLineStartY = data.candleLineStartY,
              candleLineHeight = data.candleLineHeight;
          var _this$$store$state = _this.$store.state,
              column_width = _this$$store$state.column_width,
              default_rise_color = _this$$store$state.default_rise_color,
              default_fall_color = _this$$store$state.default_fall_color;
          var isRise = arr[index + 1] ? close - arr[index + 1].close >= 0 : true;
          _this._ctx.strokeStyle = _this._ctx.fillStyle = isRise ? default_rise_color : default_fall_color;
          _this._ctx.lineWidth = 1;
          var profileFillX = _this.$devicePixelRatio % 2 === 0 ? 0.5 : 0;
          var strokeStartX = Math.round(x) + 0.5;
          var fillStartX = Math.round(x) + profileFillX;

          var lineX = _this.$handleCanvasDrawValue(_this.$decimal('+', fillStartX, Math.floor(column_width / 2))); // 线


          _this._ctx.beginPath();

          _this._ctx.moveTo(lineX, candleLineStartY);

          _this._ctx.lineTo(lineX, columnStartY);

          _this._ctx.moveTo(lineX, _this.$decimal('+', columnStartY, columnHeight));

          _this._ctx.lineTo(lineX, _this.$decimal('+', candleLineStartY, candleLineHeight));

          _this._ctx.lineWidth = 1;

          _this._ctx.stroke(); // 柱


          if (data.isRise) {
            // 空心
            _this._ctx.strokeRect(strokeStartX, columnStartY, column_width, columnHeight);
          } else {
            // 实心
            _this._ctx.fillRect(fillStartX, columnStartY, column_width, columnHeight);
          }
        });
      }
    }]);

    return EmptyKline;
  }(_default);

  var EmptyKline$1 = new EmptyKline();

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var MALine = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(MALine, _ChartBaseConfig);

    var _super = _createSuper$3(MALine);

    function MALine(_ref) {
      var _this;

      var _ctx = _ref._ctx,
          range = _ref.range;

      classCallCheck(this, MALine);

      _this = _super.call(this);
      _this._ctx = _ctx;
      _this.range = range;
      return _this;
    }

    createClass(MALine, [{
      key: "draw",
      value: function draw() {
        var data = this._handleMALineData();

        this._drawMALine(data);
      }
    }, {
      key: "_handleMALineData",
      value: function _handleMALineData() {
        var _this2 = this;

        var mAResultData = [];
        var rangData = []; // MA 曲线只关心收盘价即可

        var ma_kline_data = this.$store.state.all_kline_data.slice(this.$store.state.overflow_data_num, this.$store.state.kline_data.length * 2 + this.$store.state.overflow_data_num);
        ma_kline_data.forEach(function (item, index, arr) {
          if (arr.length - _this2.range - index < 0) return;
          rangData = arr.slice(index, index + _this2.range);

          var o = _objectSpread(_objectSpread({}, item), {}, {
            avgClose: 0
          });

          var sum = 0;
          rangData.forEach(function (item) {
            sum = _this2.$decimal('+', sum, item.close);
          });
          o.avgClose = _this2.$decimal('/', sum, _this2.range);
          mAResultData.push(o);

          if (_this2.$store.state.kline_data[index]) {
            _this2.$store.state.kline_data[index]["MAClose".concat(_this2.range)] = o.avgClose;
          }

          rangData = [];
        }); // this.$store.commit('kline_data', mAResultData)
        // 处理一下当前视图内的 kline_data 即可

        mAResultData = mAResultData.slice(0, this.$store.state.kline_data.length);
        mAResultData.forEach(function (item, index) {
          Object.assign(item, _this2.$store.state.kline_data[index]);
        });
        return mAResultData;
      } // 绘制 MA(moving average) 移动平均线

    }, {
      key: "_drawMALine",
      value: function _drawMALine(mAData) {
        var _this3 = this;

        this._ctx.beginPath();

        var _this$$store$state = this.$store.state,
            el = _this$$store$state.el,
            x_axis_height = _this$$store$state.x_axis_height,
            volume_height = _this$$store$state.volume_height,
            min = _this$$store$state.min,
            every_data_px = _this$$store$state.every_data_px,
            column_width = _this$$store$state.column_width;
        var offsetHeight = el.offsetHeight;
        var chartHeight = this.$decimal('-', offsetHeight, x_axis_height, volume_height) * this.$devicePixelRatio;
        mAData.forEach(function (item, index, arr) {
          var x = _this3.$decimal('+', item.x, column_width / 2);

          var y = _this3.$decimal('-', chartHeight, (item.avgClose - min) * every_data_px);

          if (!index) {
            _this3._ctx.beginPath();

            _this3._ctx.moveTo(x, y);
          } else {
            _this3._ctx.lineTo(x, y);
          }
        });

        this._ctx.stroke();
      }
    }]);

    return MALine;
  }(_default);

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var KlineCanvas = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(KlineCanvas, _ChartBaseConfig);

    var _super = _createSuper$4(KlineCanvas);

    function KlineCanvas() {
      var _this;

      classCallCheck(this, KlineCanvas);

      _this = _super.call(this);
      _this.c = _this.$Od.$createElement('canvas');
      _this.c.width = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', _this.$store.state.el.offsetWidth, _this.$store.state.y_axis_width)
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', _this.$store.state.el.offsetHeight, _this.$store.state.x_axis_height, _this.$store.state.volume_height)
      });
      _this.c.style.position = 'absolute';
      _this.c.style.top = 0;
      _this.c.style.left = 0;
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this._ctx = _this.c.getContext("2d");

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, _this.dragMouseMoving.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, _this.mouseScaling.bind(assertThisInitialized(_this)));

      _this.mALineInstanceList = [];

      _this.$store.state.ma_Lines.forEach(function (item) {
        var mALineInstance = new MALine({
          _ctx: _this._ctx,
          range: item.range
        });

        _this.mALineInstanceList.push(mALineInstance);
      });

      return _this;
    }
    /* 绘制历史数据图表 */


    createClass(KlineCanvas, [{
      key: "drawHistory",
      value: function drawHistory() {
        var _this2 = this;

        var _this$$store$state = this.$store.state,
            y_axis_scale_list = _this$$store$state.y_axis_scale_list,
            chart_type = _this$$store$state.chart_type,
            theme = _this$$store$state.theme;
        var background_line_color = theme.background_line_color;

        this._clearScreen(this._ctx, this.c.width, this.c.height);

        this._drawBackground(this._ctx, this.c.width, this.c.height);

        this._ctx.setLineDash([0]); // 虚线间隔


        y_axis_scale_list.forEach(function (item) {
          _this2._ctx.beginPath();

          _this2._ctx.strokeStyle = background_line_color;
          _this2._ctx.lineWidth = 1;
          var y = Math.round(item) - 0.5;

          _this2._ctx.moveTo(0, y);

          _this2._ctx.lineTo(_this2.c.width, y);

          _this2._ctx.stroke();
        }); // 绘制MA线

        this._ctx.strokeStyle = this.$store.state.ma_Lines[0].lineColor;
        this.mALineInstanceList[0].draw(); // 5

        this._ctx.strokeStyle = this.$store.state.ma_Lines[1].lineColor;
        this.mALineInstanceList[1].draw(); // 10

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
            Kline$1.draw({
              ctx: this._ctx
            });
            break;

          case this.CONSTANTS.CHART_TYPE.REAL_TIME:
            RealTime$1.draw({
              ctx: this._ctx,
              c: this.c
            });
            break;

          case this.CONSTANTS.CHART_TYPE.EMPTY_KLINE:
            EmptyKline$1.draw({
              ctx: this._ctx
            });
            break;

          default:
            Kline$1.draw({
              ctx: this._ctx
            });
        } // 绘制实时数据线


        this.drawRealTimeLine();
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

    }, {
      key: "drawRealTimeLine",
      value: function drawRealTimeLine() {
        var _this$$store$state2 = this.$store.state,
            max = _this$$store$state2.max,
            min = _this$$store$state2.min,
            all_kline_data = _this$$store$state2.all_kline_data,
            default_rise_color = _this$$store$state2.default_rise_color,
            default_fall_color = _this$$store$state2.default_fall_color,
            realtime_tagY = _this$$store$state2.realtime_tagY,
            precision = _this$$store$state2.precision;
        var _all_kline_data$ = all_kline_data[0],
            close = _all_kline_data$.close,
            open = _all_kline_data$.open,
            low = _all_kline_data$.low,
            high = _all_kline_data$.high;
        var dataGap = this.$decimal('-', max, min); // 最大/小值间距

        var everyDataPX = this.$decimal('/', this.c.height, dataGap);
        var columnHeight = this.$decimal('*', everyDataPX, Math.abs(this.$decimal('-', open, close)));
        var colMin = Math.min(open, close); // 较小的柱值

        var columnStartY = this.$decimal('-', this.c.height, (colMin - min) * everyDataPX, columnHeight);
        var isRise = close >= open;
        var color = isRise ? default_rise_color : default_fall_color;
        var y = isRise ? columnStartY : this.$decimal('+', columnStartY, columnHeight);
        this._ctx.strokeStyle = color;

        this._ctx.beginPath();

        this._ctx.lineWidth = 1;

        this._ctx.setLineDash([2]); // 虚线间隔


        this._ctx.moveTo(0, y);

        this._ctx.lineTo(this.c.width, y);

        this._ctx.stroke();

        realtime_tagY.innerText = close.toFixed(precision);
        this.$Od.$setElementAttribute(realtime_tagY, 'style', {
          top: "".concat(this._handleDevicePixelRatio({
            symbol: '/',
            value: y
          }) - 8, "px"),
          backgroundColor: color
        });
      } // 拖拽时鼠标移动

    }, {
      key: "dragMouseMoving",
      value: function dragMouseMoving() {
        this.drawHistory();
      }
    }, {
      key: "mouseScaling",
      value: function mouseScaling() {
        this.drawHistory();
      }
    }]);

    return KlineCanvas;
  }(_default);

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var DrawView = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(DrawView, _ChartBaseConfig);

    var _super = _createSuper$5(DrawView);

    function DrawView() {
      classCallCheck(this, DrawView);

      return _super.apply(this, arguments);
    }

    createClass(DrawView, [{
      key: "dealCanDrawViewData",
      value: function dealCanDrawViewData(data) {
        var _this = this;

        // data 为 获取的历史数据
        var _this$$store$state = this.$store.state,
            el = _this$$store$state.el,
            x_axis_height = _this$$store$state.x_axis_height,
            y_axis_width = _this$$store$state.y_axis_width,
            column_space = _this$$store$state.column_space,
            column_width = _this$$store$state.column_width,
            init_offset_x = _this$$store$state.init_offset_x,
            volume_height = _this$$store$state.volume_height;
        var offsetWidth = el.offsetWidth,
            offsetHeight = el.offsetHeight;
        var chartWidth = this.$decimal('-', offsetWidth, y_axis_width) * this.$devicePixelRatio;
        var chartHeight = this.$decimal('-', offsetHeight, x_axis_height, volume_height) * this.$devicePixelRatio;
        var range = this.$decimal('+', column_space, column_width); // 视图中最多可绘制的数据条数 进一法      * 2 获取两倍的视图数据

        var dataNumInView = Math.ceil(chartWidth / range) + 1;
        var rawData;
        var startX = 0;
        var overflowNum = 0;

        if (init_offset_x >= 0) {
          // 偏移量大于0
          rawData = this.$copyObjectUnsafe(data.slice(0, dataNumInView)); // 视图中原始数据 
        } else {
          // 偏移量小于0 视图超出了 容器
          var offsetX = Math.abs(init_offset_x); // 超出的柱 不包括在边线上的  缩放时同等扩大

          overflowNum = Math.floor(this.$decimal('/', offsetX, range)); // 缩放触发

          startX = this.$decimal('-', chartWidth, -offsetX, this.$decimal('*', overflowNum, range), column_width); // 第一条数据 x 起始点
          // 视图中原始数据 

          rawData = this.$copyObjectUnsafe(data.slice(overflowNum, overflowNum + dataNumInView)); // 表宽 + 当前偏移量 - 超出的柱数 * 每柱宽   
          // 第一条数据起始点
        }

        this.$store.commit('overflow_data_num', overflowNum);
        var highArray = rawData.map(function (item) {
          return item.high;
        });
        var lowArray = rawData.map(function (item) {
          return item.low;
        });
        var max = Math.max.apply(Math, toConsumableArray(highArray)); //  最大值

        var min = Math.min.apply(Math, toConsumableArray(lowArray)); //  最小值

        var dataGap = this.$decimal('-', max, min); // 最大/小值间距

        var everyDataPX = this.$decimal('/', chartHeight, dataGap);
        this.$store.commit('every_data_px', everyDataPX);
        var canDrawData = rawData.map(function (item, index) {
          var perOffset = _this.$decimal('*', range, index);

          if (init_offset_x >= 0) {
            item.x = _this.$decimal('-', chartWidth, init_offset_x, perOffset, column_width);
          } else {
            item.x = _this.$decimal('-', startX, perOffset);
          }
          /* 烛线 高 始 终  */
          //  线 数据 类似


          item.candleLineHeight = Math.round(_this.$decimal('*', everyDataPX, _this.$decimal('-', item.high, item.low)));
          item.candleLineStartY = Math.round(_this.$decimal('-', chartHeight, (item.low - min) * everyDataPX, item.candleLineHeight)); //  柱 数据 类似

          var colMin = Math.min(item.open, item.close); // 较小的柱值

          item.columnHeight = Math.round(_this.$decimal('*', everyDataPX, Math.abs(_this.$decimal('-', item.open, item.close))));
          item.columnStartY = Math.round(_this.$decimal('-', chartHeight, (colMin - min) * everyDataPX, item.columnHeight));
          item.isRise = item.close >= item.open;
          return item;
        });
        this.$store.commit('kline_data', canDrawData);
        this.$store.commit('max', max);
        this.$store.commit('min', min);
      }
    }]);

    return DrawView;
  }(_default);

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var KlineMaskCanvas = /*#__PURE__*/function (_DrawView) {
    inherits(KlineMaskCanvas, _DrawView);

    var _super = _createSuper$6(KlineMaskCanvas);

    function KlineMaskCanvas() {
      var _this;

      classCallCheck(this, KlineMaskCanvas);

      _this = _super.call(this);
      _this.mousemoveThrottleTimer = null; // 定时器

      _this.mousewheelThrottleTimer = null; // 定时器

      _this.c = _this.$Od.$createElement('canvas');
      _this.c.style.position = 'absolute';
      _this.c.style.zIndex = 100;
      _this.c.style.top = 0;
      _this.c.style.left = 0;
      _this.c.style.cursor = 'crosshair';
      _this.c.width = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', _this.$store.state.el.offsetWidth, _this.$store.state.y_axis_width)
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', _this.$store.state.el.offsetHeight, _this.$store.state.x_axis_height)
      });
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this._ctx = _this.c.getContext("2d");

      _this.c.addEventListener('mousedown', _this.mousedown.bind(assertThisInitialized(_this)));

      _this.c.addEventListener('mouseup', _this.mouseup.bind(assertThisInitialized(_this)));

      _this.c.addEventListener('mousemove', _this.mousemove.bind(assertThisInitialized(_this)));

      _this.c.addEventListener('mouseleave', _this.mouseleave.bind(assertThisInitialized(_this)));

      _this.c.addEventListener('mouseenter', _this.mouseenter.bind(assertThisInitialized(_this)));

      _this.c.addEventListener('mousewheel', _this.mousewheel.bind(assertThisInitialized(_this)));

      _this.c.addEventListener('DOMMouseScroll', _this.mousewheel.bind(assertThisInitialized(_this))); // Firefox


      _this.c.addEventListener('contextmenu', _this.contextmenu.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.ONE_DATA_UPDATED, _this.onOneDataUpdated.bind(assertThisInitialized(_this)));

      _this.tagY = null; // y tag

      _this.tagX = null; // x tag

      _this.realTimeTagY = null; // realTimeYTag

      _this.createXTag();

      _this.createYTag();

      _this.createRealTimeYTag();

      _this.INIT_OFFSET_X = _this.$store.state.init_offset_x; // 初始的偏移量
      // 限制图表缩放位置

      _this.limitOffsetX = _this.$decimal('*', _this.c.width, 1 - _this.$store.state.limit_offset_x);
      return _this;
    } // 绘制十字虚线 并设置 tagX tagY 的内容 
    // x , y 已经手动扩大了 devicePixelRatio 倍 以 canvas 为标准


    createClass(KlineMaskCanvas, [{
      key: "drawCrossDottedLine",
      value: function drawCrossDottedLine(e, _ref) {
        var x = _ref.x,
            y = _ref.y;
        this.$store.commit('current_cross_dash_line', {
          x: x,
          y: y
        });
        var _this$$store$state = this.$store.state,
            max = _this$$store$state.max,
            min = _this$$store$state.min,
            kline_data = _this$$store$state.kline_data,
            column_width = _this$$store$state.column_width,
            volume_height = _this$$store$state.volume_height;
        var newestKlineDataX = kline_data[0].x;
        var inNewestData = newestKlineDataX <= x && x <= this.$decimal('+', newestKlineDataX, column_width); // Boolean

        this.$store.commit('cross_is_in_newest_data', inNewestData);
        var time = this.$store.state.current_data.time;

        var volume_height_dpr = this._handleDevicePixelRatio({
          value: volume_height
        });

        var dataGap = this.$decimal('-', max, min);
        var everyPXData = this.$decimal('/', dataGap, this.c.height - volume_height_dpr);
        var px = this.$decimal('-', this.c.height, volume_height_dpr, y); // 与高度互补

        var currentY = this.$decimal('+', this.$decimal('*', everyPXData, px), min);

        if (y > this.c.height - volume_height_dpr) {
          this.tagY.style.display = 'none';
        } else {
          this.tagY.style.display = 'block';
        }

        this.tagY.innerText = currentY.toFixed(2);
        this.tagY.style.top = "".concat(this._handleDevicePixelRatio({
          symbol: '/',
          value: y
        }) - 8, "px"); //  为tag 元素高度一半

        this.tagX.innerText = this.$time.format(time, 'YYYY-MM-DD HH:mm');
        this.tagX.style.left = "".concat(x / this.$devicePixelRatio, "px"); // dom 像素 非 canvas 像素 

        this._ctx.setLineDash([5]); // 虚线间隔


        this._ctx.strokeStyle = '#758696'; // 虚线颜色
        // 横虚线

        this._ctx.beginPath();

        this._ctx.moveTo(0, y - 0.5);

        this._ctx.lineTo(this.c.width, y - 0.5);

        this._ctx.stroke(); // 竖虚线


        this._ctx.beginPath();

        var middleX = this.$decimal('+', x, Math.ceil(this.$store.state.column_width / 2)) - 0.5;

        this._ctx.moveTo(middleX, 0);

        this._ctx.lineTo(middleX, this.c.height);

        this._ctx.stroke();
      } // 鼠标拖拽移动

    }, {
      key: "dragMousemove",
      value: function dragMousemove(e) {
        var _this$$store$state2 = this.$store.state,
            all_kline_data = _this$$store$state2.all_kline_data,
            current_scale = _this$$store$state2.current_scale,
            init_offset_x = _this$$store$state2.init_offset_x;
        this.$store.commit('no_scale_offset_x', this.$decimal('/', init_offset_x, current_scale));
        var currentXMove = this.$decimal('*', this.$devicePixelRatio, this.$decimal('-', this.startDragX, e.layerX));
        var cOffset = this.$decimal('+', this.INIT_OFFSET_X, currentXMove);
        if (cOffset > this.limitOffsetX) cOffset = this.limitOffsetX;
        this.$store.commit('init_offset_x', cOffset);
        this.dealCanDrawViewData(all_kline_data);
        this.$watcher.emit(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING);
      } // 清空画布

    }, {
      key: "clearScreen",
      value: function clearScreen() {
        this._clearScreen(this._ctx, this.c.width, this.c.height);
      } // 常规鼠标移动 和 拖拽鼠标移动

    }, {
      key: "mousemove",
      value: function mousemove(e) {
        var _this2 = this;

        // 十字光标鼠标移动
        if (this.mousemoveThrottleTimer === null) {
          this.mousemoveThrottleTimer = window.requestAnimationFrame(function () {
            _this2.$store.commit('current_mouse_coordinates', {
              x: e.layerX * _this2.$devicePixelRatio,
              y: e.layerY * _this2.$devicePixelRatio
            });

            if (_this2.canDragable) {
              // 拖拽移动
              _this2.dragMousemove(e);
            } else {
              // 常规鼠标移动
              _this2.$store.state.kline_data.every(function (item) {
                var perDataRange = _this2.$decimal('+', item.x, _this2.$store.state.column_width);

                if (item.x <= e.layerX * _this2.$devicePixelRatio && item.x <= perDataRange) {
                  _this2.$store.commit('current_data', item);
                  /* 设置当前数据对象 */


                  _this2.clearScreen();

                  _this2.drawCrossDottedLine(e, {
                    x: item.x,
                    y: e.layerY * _this2.$devicePixelRatio
                  });

                  return false;
                }

                return true;
              });
            }

            _this2.$watcher.emit(CONSTANTS.WATCHER_EVENT.MOUSE_MOVING);

            window.cancelAnimationFrame(_this2.mousemoveThrottleTimer);
            _this2.mousemoveThrottleTimer = null;
          });
        }
      } // 鼠标缩放

    }, {
      key: "mousewheel",
      value: function mousewheel(e) {
        var _this3 = this;

        if (this.mousewheelThrottleTimer === null) {
          console.log('%c mousewheel', 'color: brown');
          this.mousewheelThrottleTimer = window.requestAnimationFrame(function () {
            var _this3$$store$state = _this3.$store.state,
                scale_step = _this3$$store$state.scale_step,
                max_scale = _this3$$store$state.max_scale,
                min_scale = _this3$$store$state.min_scale,
                current_scale = _this3$$store$state.current_scale,
                all_kline_data = _this3$$store$state.all_kline_data,
                DEFAULT_COLUMN_WIDTH = _this3$$store$state.DEFAULT_COLUMN_WIDTH,
                DEFAULT_COLUMN_SPACE = _this3$$store$state.DEFAULT_COLUMN_SPACE,
                no_scale_offset_x = _this3$$store$state.no_scale_offset_x;
            var cScale = current_scale; // 兼容Firefox

            if (e.deltaY < 0 || e.detail < 0) {
              // 小于 0 向前滚动 即放大
              // 限制继续放大
              if (_this3.$decimal('*', no_scale_offset_x, cScale) <= _this3.limitOffsetX) {
                if (current_scale < max_scale) cScale = _this3.$decimal('+', current_scale, scale_step);
              }
            } else {
              if (current_scale > min_scale) cScale = _this3.$decimal('-', current_scale, scale_step);
            }

            _this3.$store.commit('current_scale', cScale);

            var scaledNum = _this3.$store.state.current_scale; // 缩放后的值

            _this3.$store.commit('init_offset_x', _this3.$decimal('*', no_scale_offset_x, scaledNum));

            _this3.INIT_OFFSET_X = _this3.$store.state.init_offset_x;

            _this3.$store.commit('column_width', _this3.$decimal('*', DEFAULT_COLUMN_WIDTH, scaledNum));

            _this3.$store.commit('column_space', _this3.$decimal('*', DEFAULT_COLUMN_SPACE, scaledNum));
            /* 缩放结果 */


            _this3.dealCanDrawViewData(all_kline_data);

            _this3.$watcher.emit(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING);

            window.cancelAnimationFrame(_this3.mousewheelThrottleTimer);
            _this3.mousewheelThrottleTimer = null;
          });
        }
      } // 鼠标进入遮罩canvas

    }, {
      key: "mouseenter",
      value: function mouseenter() {
        var _this4 = this;

        console.log('%c mouseenter', 'color: #fff; background-color: green');
        var clearScreenTimer = setTimeout(function () {
          _this4.tagX.style.display = 'block';
          _this4.tagY.style.display = 'block';
          clearTimeout(clearScreenTimer);
        }, 50);
        clearScreenTimer = null;
      } // 鼠标离开遮罩canvas

    }, {
      key: "mouseleave",
      value: function mouseleave() {
        var _this5 = this;

        console.log('%c mouseleave', 'color: #fff; background-color: red');
        this.canDragable = false;
        this.INIT_OFFSET_X = this.$store.state.init_offset_x; // 初始的偏移量

        var clearScreenTimer = setTimeout(function () {
          _this5.tagX.style.display = 'none';
          _this5.tagY.style.display = 'none';

          _this5.$store.commit('cross_is_in_newest_data', null);

          _this5.clearScreen();

          clearTimeout(clearScreenTimer);
        }, 50);
        clearScreenTimer = null;
      } // 鼠标按下

    }, {
      key: "mousedown",
      value: function mousedown(e) {
        if (!e.button) {
          console.log('%c mousedown', 'color: green');
          this.startDragX = e.layerX;
          this.canDragable = true;
          this.$Od.$setElementAttribute(this.c, 'class', 'is-grabbing');
        }
      } // 鼠标弹起

    }, {
      key: "mouseup",
      value: function mouseup(e) {
        if (!e.button) {
          console.log('%c mouseup', 'color: red');
          this.canDragable = false;
          this.INIT_OFFSET_X = this.$store.state.init_offset_x; // 初始的偏移量

          this.$Od.$removeElementAttribute(this.c, 'class', 'is-grabbing');
        }
      }
    }, {
      key: "contextmenu",
      value: function contextmenu(e) {
        e.preventDefault();
        console.log('%c contextmenu', 'color: brown');
        console.log('右键菜单');
      } // 创建 实时显示价格 de Y 标签 

    }, {
      key: "createRealTimeYTag",
      value: function createRealTimeYTag() {
        this.realTimeTagY = this.$Od.$createElement('div');
        this.$Od.$setElementAttribute(this.realTimeTagY, 'id', 'real_time_volume');
        this.$Od.$setElementAttribute(this.realTimeTagY, 'style', {
          position: 'absolute',
          zIndex: '80',
          right: 0,
          width: "".concat(this.$store.state.y_axis_width, "px"),
          fontSize: '12px',
          textAlign: 'center',
          color: '#fff',
          userSelect: 'none'
        });
        this.$store.state.vy_chart.appendChild(this.realTimeTagY);
        this.$store.commit('realtime_tagY', this.realTimeTagY);
      } // 创建 显示价格 de Y 标签 

    }, {
      key: "createYTag",
      value: function createYTag() {
        this.tagY = this.$Od.$createElement('div');
        this.$Od.$setElementAttribute(this.tagY, 'id', 'volume');
        this.$Od.$setElementAttribute(this.tagY, 'style', {
          position: 'absolute',
          zIndex: '100',
          right: 0,
          width: "".concat(this.$store.state.y_axis_width, "px"),
          fontSize: '12px',
          textAlign: 'center',
          color: '#fff',
          backgroundColor: '#585858',
          userSelect: 'none'
        });
        this.$store.state.vy_chart.appendChild(this.tagY);
        this.$store.commit('YTag', this.tagY);
      } // 创建 日期 de X 标签 

    }, {
      key: "createXTag",
      value: function createXTag() {
        this.tagX = this.$Od.$createElement('div');
        this.$Od.$setElementAttribute(this.tagX, 'id', 'date-time');
        this.$Od.$setElementAttribute(this.tagX, 'style', {
          position: 'absolute',
          zIndex: '100',
          bottom: "".concat(this.$store.state.x_axis_height - 44, "px"),
          // - 24,
          fontSize: '12px',
          color: '#fff',
          backgroundColor: '#585858',
          transform: 'translate(-50%, 0)',
          whiteSpace: 'noWrap',
          userSelect: 'none'
        });
        this.$store.state.vy_chart.appendChild(this.tagX);
      } // 更新一条数据事件

    }, {
      key: "onOneDataUpdated",
      value: function onOneDataUpdated(nowData) {
        var cross_is_in_newest_data = this.$store.state.cross_is_in_newest_data;

        if (cross_is_in_newest_data) {
          this.tagX.innerText = this.$time.format(nowData.time, 'YYYY-MM-DD HH:mm');
        }
      }
    }]);

    return KlineMaskCanvas;
  }(DrawView);

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var YAxisCanvas = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(YAxisCanvas, _ChartBaseConfig);

    var _super = _createSuper$7(YAxisCanvas);

    function YAxisCanvas() {
      var _this;

      classCallCheck(this, YAxisCanvas);

      _this = _super.call(this);
      var _this$$store$state = _this.$store.state,
          el = _this$$store$state.el,
          x_axis_height = _this$$store$state.x_axis_height,
          y_axis_width = _this$$store$state.y_axis_width,
          volume_height = _this$$store$state.volume_height;
      _this.c = _this.$Od.$createElement('canvas');
      _this.c.width = _this._handleDevicePixelRatio({
        value: y_axis_width
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', el.offsetHeight, x_axis_height, volume_height)
      });
      _this.c.style.position = 'absolute';
      _this.c.style.top = 0;
      _this.c.style.right = 0;
      _this.c.style.background = _this.$store.state.background_color;
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this._ctx = _this.c.getContext("2d");

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, _this.reDraw.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, _this.reDraw.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, _this.reDraw.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.HISTORY_DATA_CHANGE, _this.reDraw.bind(assertThisInitialized(_this)));

      return _this;
    }

    createClass(YAxisCanvas, [{
      key: "draw",
      value: function draw() {
        // 当数据区间不变时 可以进行一些性能优化
        this._drawBackground(this._ctx, this.c.width, this.c.height);

        var _this$$store$state2 = this.$store.state,
            theme = _this$$store$state2.theme,
            min = _this$$store$state2.min,
            max = _this$$store$state2.max,
            axis_segment = _this$$store$state2.axis_segment,
            axis_font = _this$$store$state2.axis_font;
        var axis_color = theme.axis_color,
            axis_text_color = theme.axis_text_color;

        this._ctx.moveTo(0 + 0.5, 0);

        this._ctx.lineTo(0 + 0.5, this.c.height);

        this._ctx.lineWidth = 1;
        this._ctx.strokeStyle = axis_color;

        this._ctx.stroke();

        var everyDataPX = decimal('/', this.c.height, decimal('-', max, min)); // 每个数据所占像素px

        var count = 0; // 计数

        var power = Math.trunc(Math.log10(min)) - 1; // 幂

        var start = Math.trunc(min / Math.pow(10, power)) * Math.pow(10, power); // 初始值
        // everyDataPX * scale 即为 y 间隔像素 [30 - 50] 合适 取 40

        var scalePower = Math.ceil(Math.log10(max - min)) - 2; // 度量 幂

        var scale = 5 * Math.pow(10, scalePower); // 缩放比

        var perScale = 5 * Math.pow(10, scalePower);

        while (scale * everyDataPX < 40) {
          scale = this.$decimal('+', scale, perScale);
        }

        this._ctx.strokeStyle = axis_color;
        this._ctx.fillStyle = axis_text_color;
        this._ctx.font = axis_font; // 绘制刻度

        var yAxisScaleList = [];

        while (start + scale * count < max) {
          var yText = start + scale * count;
          yText = yText.toFixed(2);
          var y = this.c.height - everyDataPX * (yText - min); // y 起点

          var startY = y - 0.5;
          yAxisScaleList.push(startY);

          this._ctx.beginPath();

          this._ctx.moveTo(0, startY);

          this._ctx.lineTo(axis_segment, startY);

          this._ctx.lineWidth = 1;

          this._ctx.stroke();

          this._ctx.fillText(yText, 5, y + 4);

          count++;
        }

        this.$store.commit('y_axis_scale_list', yAxisScaleList);
      }
    }, {
      key: "reDraw",
      value: function reDraw() {
        this._ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.draw();
      }
    }]);

    return YAxisCanvas;
  }(_default);

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var timeStrategies = {
    // 分钟 每隔 10 柱
    m: function m(item) {
      return {
        time: Math.trunc(item.time / 60000),
        // 1000 * 60
        format: 'HH:mm'
      };
    },
    h: function h(item) {
      return {
        time: Math.trunc(item.time / 3600000),
        // 1000 * 60 * 60
        format: 'DD HH:mm'
      };
    },
    d: function d(item) {
      return {
        time: Math.trunc(item.time / 86400000),
        //  1000 * 60 * 60 * 24
        format: 'MM-DD'
      };
    },
    w: function w(item) {
      return {
        time: Math.trunc(item.time / 604800000),
        //  1000 * 60 * 60 * 24 * 7
        format: 'MM-DD'
      };
    },
    M: function M(item) {
      return {
        time: Math.trunc(item.time / 2592000000),
        //  1000 * 60 * 60 * 24 * 30
        format: 'YYYY-MM'
      };
    }
  };

  var XAxisCanvas = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(XAxisCanvas, _ChartBaseConfig);

    var _super = _createSuper$8(XAxisCanvas);

    function XAxisCanvas() {
      var _this;

      classCallCheck(this, XAxisCanvas);

      _this = _super.call(this);
      var _this$$store$state = _this.$store.state,
          el = _this$$store$state.el,
          x_axis_height = _this$$store$state.x_axis_height,
          y_axis_width = _this$$store$state.y_axis_width;
      _this.c = _this.$Od.$createElement('canvas');
      _this.c.width = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', el.offsetWidth, y_axis_width)
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: x_axis_height
      });
      _this.c.style.position = 'absolute';
      _this.c.style.bottom = 0;
      _this.c.style.left = 0;
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this.c.style.background = _this.$store.state.background_color;
      _this._ctx = _this.c.getContext('2d');

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, _this.reDraw.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, _this.reDraw.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, _this.reDraw.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.HISTORY_DATA_CHANGE, _this.reDraw.bind(assertThisInitialized(_this))); // 主题切换


      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, function (theme) {
        _this.draw();
      });

      return _this;
    }

    createClass(XAxisCanvas, [{
      key: "draw",
      value: function draw() {
        var _this2 = this;

        this._drawBackground(this._ctx, this.c.width, this.c.height);

        var _this$$store$state2 = this.$store.state,
            theme = _this$$store$state2.theme,
            axis_font = _this$$store$state2.axis_font,
            kline_data = _this$$store$state2.kline_data,
            current_scale = _this$$store$state2.current_scale,
            current_interval = _this$$store$state2.current_interval,
            column_width = _this$$store$state2.column_width,
            axis_segment = _this$$store$state2.axis_segment;
        var axis_text_color = theme.axis_text_color,
            axis_color = theme.axis_color;
        if (!kline_data) return; // x 轴

        this._ctx.moveTo(0, 0.5); // 0 + 0.5


        this._ctx.lineTo(this.c.width, 0.5);

        this._ctx.lineWidth = 1;
        this._ctx.strokeStyle = axis_color;

        this._ctx.stroke();

        this._ctx.textAlign = 'center'; // s m h d w M 

        var interval_num = current_interval.match(/[0-9]*$/);
        var interval_type = current_interval[0];
        this._ctx.strokeStyle = axis_color;
        this._ctx.fillStyle = axis_text_color;
        this._ctx.font = axis_font;
        kline_data.forEach(function (item, i) {
          var _timeStrategies$inter = timeStrategies[interval_type](item),
              time = _timeStrategies$inter.time,
              format = _timeStrategies$inter.format; // 最小度量  分钟


          var timeRange = Math.trunc(interval_num * 10 / current_scale);
          timeRange = Math.ceil(timeRange / 5) * 5;

          if (!(time % timeRange)) {
            var startX = _this2.$decimal('+', item.x, Math.ceil(column_width / 2));

            _this2._ctx.beginPath();

            _this2._ctx.moveTo(startX - 0.5, 0);

            _this2._ctx.lineTo(startX - 0.5, axis_segment * _this2.$devicePixelRatio);

            _this2._ctx.stroke();

            var t = _this2.$time.format(item.time, format);

            _this2._ctx.fillText(t, startX, 15 * _this2.$devicePixelRatio);
          }
        });
      }
    }, {
      key: "reDraw",
      value: function reDraw() {
        this._ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.draw();
      }
    }]);

    return XAxisCanvas;
  }(_default);

  function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var Volume = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(Volume, _ChartBaseConfig);

    var _super = _createSuper$9(Volume);

    function Volume() {
      var _this;

      classCallCheck(this, Volume);

      _this = _super.call(this);
      var _this$$store$state = _this.$store.state,
          el = _this$$store$state.el,
          x_axis_height = _this$$store$state.x_axis_height,
          y_axis_width = _this$$store$state.y_axis_width,
          volume_height = _this$$store$state.volume_height;
      _this.c = _this.$Od.$createElement('canvas');
      _this.c.width = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', el.offsetWidth, y_axis_width)
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: volume_height
      });
      _this.c.style.position = 'absolute';
      _this.c.style.bottom = "".concat(x_axis_height, "px");
      _this.c.style.left = 0;
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this._ctx = _this.c.getContext('2d');
      _this.maxVolume = null; // 最大值

      _this.minVolume = null; // 最小值

      _this.dataGap = null;
      _this.everyDataPX = null; // 每个数据所占像素px 

      _this.YAxisStartX = _this.$decimal('-', _this._handleDevicePixelRatio({
        value: _this.c.width
      }), y_axis_width); // Y 的X轴起点

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, _this.dragMouseMoving.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, _this.mouseScaling.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, _this.onRealTimeData.bind(assertThisInitialized(_this)));

      return _this;
    } // 绘制 X上边界线


    createClass(Volume, [{
      key: "drawTopLine",
      value: function drawTopLine() {
        // X上边界线
        var axis_color = this.$store.state.theme.axis_color;
        this._ctx.strokeStyle = axis_color;

        this._ctx.beginPath();

        this._ctx.moveTo(0, 0 + 0.5);

        this._ctx.lineTo(this.c.width, 0 + 0.5);

        this._ctx.lineWidth = 1;

        this._ctx.stroke();
      }
    }, {
      key: "draw",
      value: function draw() {
        var _this2 = this;

        this._clearScreen(this._ctx, this.c.width, this.c.height);

        this._drawBackground(this._ctx, this.c.width, this.c.height);

        this.drawTopLine(); // 由于每次都清空了画布 所以需要重绘 绘制 X上边界线

        var _this$$store$state2 = this.$store.state,
            kline_data = _this$$store$state2.kline_data,
            volume_height = _this$$store$state2.volume_height,
            current_scale = _this$$store$state2.current_scale,
            y_axis_width = _this$$store$state2.y_axis_width,
            column_width = _this$$store$state2.column_width,
            default_rise_color = _this$$store$state2.default_rise_color,
            default_fall_color = _this$$store$state2.default_fall_color;
        var volumeArray = kline_data.map(function (item) {
          return item.volume;
        });
        this.maxVolume = Math.max.apply(Math, toConsumableArray(volumeArray)); //  最大值

        this.minVolume = Math.min.apply(Math, toConsumableArray(volumeArray)); //  最小值

        this.dataGap = this.$decimal('-', this.maxVolume, this.minVolume); // 最大/小值间距

        this.everyDataPX = this.$decimal('/', this.c.height, this.dataGap);
        kline_data.forEach(function (item) {
          _this2._ctx.beginPath();

          _this2._ctx.strokeStyle = _this2._ctx.fillStyle = item.close >= item.open ? default_rise_color : default_fall_color;

          var range = _this2.$decimal('-', item.volume, _this2.minVolume);

          var volHeight = _this2.$decimal('*', _this2.everyDataPX, range);

          var startY = _this2.$decimal('-', _this2.c.height, volHeight);

          var itemX = item.x - 0.5;

          _this2._ctx.strokeRect(itemX, startY, column_width, volHeight);

          _this2._ctx.globalAlpha = 0.6;

          _this2._ctx.fillRect(itemX, startY, column_width, volHeight);
        });
      }
    }, {
      key: "dragMouseMoving",
      value: function dragMouseMoving() {
        this._clearScreen(this._ctx, this.c.width, this.c.height);

        this.draw();
      }
    }, {
      key: "mouseScaling",
      value: function mouseScaling() {
        this._clearScreen(this._ctx, this.c.width, this.c.height);

        this.draw();
      }
    }, {
      key: "onRealTimeData",
      value: function onRealTimeData() {
        this._clearScreen(this._ctx, this.c.width, this.c.height);

        this.draw();
      }
    }]);

    return Volume;
  }(_default);

  function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var GenerateSpan = /*#__PURE__*/function () {
    function GenerateSpan($Od, _ref) {
      var _ref$data = _ref.data,
          data = _ref$data === void 0 ? 0 : _ref$data,
          html = _ref.html;

      classCallCheck(this, GenerateSpan);

      this.span = $Od.$createElement('span');
      this.html = html;
      this.data = data;
      this.span.innerHTML = "".concat(html, "=<i style=\"color: ").concat(this.color, ";\">").concat(this.data, "</i>");
    }

    createClass(GenerateSpan, [{
      key: "setData",
      value: function setData(data, color, spanColor) {
        this.data = data;
        this.span.innerHTML = "".concat(this.html, "=<i style=\"color: ").concat(color, ";\">").concat(this.data, "</i>");
        this.span.style.color = spanColor;
      }
    }]);

    return GenerateSpan;
  }();

  var Dashboard = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(Dashboard, _ChartBaseConfig);

    var _super = _createSuper$a(Dashboard);

    function Dashboard() {
      var _this;

      classCallCheck(this, Dashboard);

      _this = _super.call(this);
      _this.dashboardWrapper = _this.$Od.$createElement('div');

      _this.$Od.$setElementAttribute(_this.dashboardWrapper, 'id', 'dashboard-wrapper');

      _this.$Od.$setElementAttribute(_this.dashboardWrapper, 'style', {
        position: 'absolute',
        zIndex: '50',
        left: 0,
        top: 0
      });

      _this.spanWrapper = _this.$Od.$createElement('div');

      _this.$Od.$setElementAttribute(_this.spanWrapper, 'id', 'span-wrapper');

      _this.dashboardWrapper.appendChild(_this.spanWrapper);

      _this.openSpan = new GenerateSpan(_this.$Od, {
        html: '开'
      });
      _this.highSpan = new GenerateSpan(_this.$Od, {
        html: '高'
      });
      _this.lowSpan = new GenerateSpan(_this.$Od, {
        html: '低'
      });
      _this.closeSpan = new GenerateSpan(_this.$Od, {
        html: '收'
      });
      _this.volSpan = new GenerateSpan(_this.$Od, {
        html: 'Vol'
      });
      _this.MA5Span = new GenerateSpan(_this.$Od, {
        html: 'MA5'
      });
      _this.MA10Span = new GenerateSpan(_this.$Od, {
        html: 'MA10'
      });

      _this.spanWrapper.appendChild(_this.openSpan.span);

      _this.spanWrapper.appendChild(_this.highSpan.span);

      _this.spanWrapper.appendChild(_this.lowSpan.span);

      _this.spanWrapper.appendChild(_this.closeSpan.span);

      _this.spanWrapper.appendChild(_this.volSpan.span);

      _this.spanWrapper.appendChild(_this.MA5Span.span);

      _this.spanWrapper.appendChild(_this.MA10Span.span);

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_MOVING, _this.mouseMoving.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, _this.onRealTimeData.bind(assertThisInitialized(_this)));

      return _this;
    }

    createClass(Dashboard, [{
      key: "setSpanInnerText",
      value: function setSpanInnerText(_ref2) {
        var open = _ref2.open,
            high = _ref2.high,
            low = _ref2.low,
            close = _ref2.close,
            volume = _ref2.volume,
            _ref2$MAClose = _ref2.MAClose5,
            MAClose5 = _ref2$MAClose === void 0 ? 0 : _ref2$MAClose,
            _ref2$MAClose2 = _ref2.MAClose10,
            MAClose10 = _ref2$MAClose2 === void 0 ? 0 : _ref2$MAClose2;
        var _this$$store$state = this.$store.state,
            default_rise_color = _this$$store$state.default_rise_color,
            default_fall_color = _this$$store$state.default_fall_color,
            axis_text_color = _this$$store$state.axis_text_color,
            ma_Lines = _this$$store$state.ma_Lines,
            precision = _this$$store$state.precision;
        var color = close >= open ? default_rise_color : default_fall_color;
        this.openSpan.setData(open.toFixed(precision), color, axis_text_color);
        this.highSpan.setData(high.toFixed(precision), color, axis_text_color);
        this.lowSpan.setData(low.toFixed(precision), color, axis_text_color);
        this.closeSpan.setData(close.toFixed(precision), color, axis_text_color);
        this.volSpan.setData(volume, color, axis_text_color);
        this.MA5Span.setData(MAClose5.toFixed(precision), ma_Lines[0].lineColor, axis_text_color);
        this.MA10Span.setData(MAClose10.toFixed(precision), ma_Lines[1].lineColor, axis_text_color);
      }
    }, {
      key: "mouseMoving",
      value: function mouseMoving() {
        if (this.$store.state.current_data) {
          var _this$$store$state$cu = this.$store.state.current_data,
              open = _this$$store$state$cu.open,
              high = _this$$store$state$cu.high,
              low = _this$$store$state$cu.low,
              close = _this$$store$state$cu.close,
              volume = _this$$store$state$cu.volume,
              MAClose5 = _this$$store$state$cu.MAClose5,
              MAClose10 = _this$$store$state$cu.MAClose10;
          this.setSpanInnerText({
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
            MAClose5: MAClose5,
            MAClose10: MAClose10
          });
        }
      }
    }, {
      key: "onRealTimeData",
      value: function onRealTimeData() {
        var _this$$store$state2 = this.$store.state,
            cross_is_in_newest_data = _this$$store$state2.cross_is_in_newest_data,
            kline_data = _this$$store$state2.kline_data; // 十字虚线位置在 第一条 数据区域内 or null

        if (cross_is_in_newest_data || cross_is_in_newest_data === null) {
          var _kline_data$ = kline_data[0],
              open = _kline_data$.open,
              high = _kline_data$.high,
              low = _kline_data$.low,
              close = _kline_data$.close,
              volume = _kline_data$.volume,
              MAClose5 = _kline_data$.MAClose5,
              MAClose10 = _kline_data$.MAClose10;
          this.setSpanInnerText({
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
            MAClose5: MAClose5,
            MAClose10: MAClose10
          });
        }
      }
    }]);

    return Dashboard;
  }(_default);

  function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
  var regK = /0{3}$/;

  var VolYAxis = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(VolYAxis, _ChartBaseConfig);

    var _super = _createSuper$b(VolYAxis);

    function VolYAxis() {
      var _this;

      classCallCheck(this, VolYAxis);

      _this = _super.call(this);
      var _this$$store$state = _this.$store.state,
          el = _this$$store$state.el,
          x_axis_height = _this$$store$state.x_axis_height,
          y_axis_width = _this$$store$state.y_axis_width,
          volume_height = _this$$store$state.volume_height;
      _this.c = _this.$Od.$createElement('canvas');
      _this.c.width = _this._handleDevicePixelRatio({
        value: y_axis_width
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: _this.$decimal('-', volume_height)
      });
      _this.c.style.position = 'absolute';
      _this.c.style.bottom = "".concat(_this.$decimal('-', x_axis_height), "px");
      _this.c.style.right = 0;
      _this.c.style.background = _this.$store.state.background_color;
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this._ctx = _this.c.getContext("2d");

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.DRAG_MOUSE_MOVING, _this.dragMouseMoving.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.MOUSE_SCALING, _this.mouseScaling.bind(assertThisInitialized(_this)));

      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA, _this.onRealTimeData.bind(assertThisInitialized(_this))); // 主题切换


      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, function (theme) {
        _this.draw();
      });

      return _this;
    }

    createClass(VolYAxis, [{
      key: "draw",
      value: function draw() {
        // Y 轴
        this._drawBackground(this._ctx, this.c.width, this.c.height);

        var axis_color = this.$store.state.theme.axis_color;
        this._ctx.strokeStyle = axis_color;

        this._ctx.beginPath();

        this._ctx.moveTo(0 + 0.5, 0);

        this._ctx.lineTo(0 + 0.5, this.c.height);

        this._ctx.lineWidth = 1;

        this._ctx.stroke();

        this.drawVolYAxis();
      }
    }, {
      key: "drawVolYAxis",
      value: function drawVolYAxis() {
        // 绘制Y坐标 与绘制交易量逻辑重复
        var _this$$store$state2 = this.$store.state,
            theme = _this$$store$state2.theme,
            kline_data = _this$$store$state2.kline_data,
            volume_height = _this$$store$state2.volume_height,
            axis_segment = _this$$store$state2.axis_segment,
            axis_font = _this$$store$state2.axis_font;
        var axis_text_color = theme.axis_text_color;
        var volumeArray = kline_data.map(function (item) {
          return item.volume;
        });
        this.maxVolume = Math.max.apply(Math, toConsumableArray(volumeArray)); //  最大值

        this.minVolume = Math.min.apply(Math, toConsumableArray(volumeArray)); //  最小值

        this.dataGap = this.$decimal('-', this.maxVolume, this.minVolume); // 最大/小值间距

        var volume_height_dpr = this._handleDevicePixelRatio({
          value: volume_height
        });

        this.everyDataPX = this.$decimal('/', volume_height_dpr, this.dataGap);
        var power = Math.trunc(Math.log10(this.dataGap)) - 1; // 幂

        var start = Math.trunc(this.minVolume);
        var scale = 5 * Math.pow(10, power); // 刻度

        var perScale = scale; // 刻度

        while (scale * this.everyDataPX < 20) {
          scale = this.$decimal('+', scale, perScale);
        }

        this._ctx.fillStyle = axis_text_color;
        this._ctx.font = axis_font;
        var count = 1; // 计数

        while (start + scale * count < this.maxVolume) {
          var yText = String(scale * count);

          if (regK.test(yText)) {
            yText = yText.replace(regK, 'k');
          } // let yText = start + scale * count


          var y = this.c.height - this.everyDataPX * scale * count; // y 起点

          this._ctx.beginPath();

          this._ctx.moveTo(0, y - 0.5);

          this._ctx.lineTo(axis_segment, y - 0.5);

          this._ctx.lineWidth = 1;

          this._ctx.stroke();

          this._ctx.fillText(yText, 5, y + this._handleDevicePixelRatio({
            value: 4
          })); // 4 使其上下居中


          count++;
        }
      }
    }, {
      key: "dragMouseMoving",
      value: function dragMouseMoving() {
        this._ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.draw();
      }
    }, {
      key: "mouseScaling",
      value: function mouseScaling() {
        this._ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.draw();
      }
    }, {
      key: "onRealTimeData",
      value: function onRealTimeData() {
        this._ctx.clearRect(0, 0, this.c.width, this.c.height);

        this.draw();
      }
    }]);

    return VolYAxis;
  }(_default);

  /* 时间粒度文本 */
  var IntervalText = {
    m: {
      text: 'Min'
    },
    h: {
      text: 'Hour'
    },
    d: {
      text: 'Day'
    },
    w: {
      text: 'Week'
    },
    M: {
      text: 'Mon'
    }
  };

  function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var IntervalToolBar = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(IntervalToolBar, _ChartBaseConfig);

    var _super = _createSuper$c(IntervalToolBar);

    function IntervalToolBar() {
      var _this;

      classCallCheck(this, IntervalToolBar);

      _this = _super.call(this);
      _this.c = _this.$Od.$createElement('div');
      _this.throttleTimer = null;
      _this.cacheChartType = _this.$store.state.chart_type;

      _this.$Od.$setElementAttribute(_this.c, 'id', 'interval_tool_bar');

      _this.$Od.$setElementAttribute(_this.c, 'style', {
        height: _this.$store.state.interval_tool_bar,
        lineHeight: _this.$store.state.interval_tool_bar,
        backgroundColor: _this.$store.state.background_color
      });

      if (_this.$store.state.user_config.theme) {
        _this.$Od.$setElementAttribute(_this.c, 'class', _this.$store.state.user_config.theme);
      }

      _this.createTimeShareBtn();

      _this.createIntervalBtn(); // 主题切换


      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, function (theme) {
        _this.$Od.$setElementAttribute(_this.c, 'style', {
          backgroundColor: _this.$store.state.theme.background_color
        });

        _this.$Od.$setElementAttribute(_this.c, 'class', theme);
      });

      return _this;
    }
    /* 创建时间粒度按钮 */


    createClass(IntervalToolBar, [{
      key: "createIntervalBtn",
      value: function createIntervalBtn() {
        var _this2 = this;

        var _this$$store$state = this.$store.state,
            user_config = _this$$store$state.user_config,
            chart_instance = _this$$store$state.chart_instance;
        var interval = user_config.interval,
            deedfeeds = user_config.deedfeeds,
            onTimeIntervalChanged = user_config.onTimeIntervalChanged;
        interval.forEach(function (item) {
          var button = _this2.$Od.$createElement('button');

          var num = item.slice(1);
          button.innerText = "".concat(num, " ").concat(IntervalText[item[0]].text);

          _this2.$Od.$setElementAttribute(button, 'class', 'interval-item');

          _this2.$Od.$setElementAttribute(button, 'data-interval-item', item);

          var _this2$$store$state = _this2.$store.state,
              current_interval = _this2$$store$state.current_interval,
              loadingNode = _this2$$store$state.loadingNode;

          if (current_interval === item) {
            _this2.$Od.$setElementAttribute(button, 'class', 'interval-item active');
          }

          button.onclick = function () {
            if (!_this2.throttleTimer) {
              var _this2$$store$state2 = _this2.$store.state,
                  _current_interval = _this2$$store$state2.current_interval,
                  chart_type = _this2$$store$state2.chart_type;
              if (_current_interval === item && chart_type !== _this2.CONSTANTS.CHART_TYPE.REAL_TIME) return;
              _this2.throttleTimer = setTimeout(function () {
                if (typeof onTimeIntervalChanged === "function") {
                  onTimeIntervalChanged(item);
                }

                loadingNode.style.display = 'block';

                _this2.$store.commit('chart_type', _this2.cacheChartType);

                _this2.$store.commit('all_kline_data', []);

                _this2.$store.commit('kline_data', []);

                _this2.$store.commit('current_interval', item);

                _this2.$Od.$setElementAttribute(document.getElementsByClassName('interval-item active')[0], 'class', 'interval-item');

                _this2.$Od.$setElementAttribute(button, 'class', 'interval-item active');

                deedfeeds.intervalChanged({
                  interval: item,
                  setHistoryData: chart_instance.initHistoryData,
                  subscribeData: chart_instance.getRealTimeData
                });
                _this2.throttleTimer = null;
              }, 200);
            }
          };

          _this2.c.appendChild(button);
        });
      }
      /* 创建分时按钮 */

    }, {
      key: "createTimeShareBtn",
      value: function createTimeShareBtn() {
        var _this3 = this;

        var _this$$store$state2 = this.$store.state,
            user_config = _this$$store$state2.user_config,
            chart_instance = _this$$store$state2.chart_instance,
            loadingNode = _this$$store$state2.loadingNode;
        var deedfeeds = user_config.deedfeeds;
        var button = this.$Od.$createElement('button');
        button.innerText = '分时';
        this.$Od.$setElementAttribute(button, 'class', 'interval-item');
        this.$Od.$setElementAttribute(button, 'data-interval-item', 'time-sharing');

        button.onclick = function () {
          loadingNode.style.display = 'block';
          _this3.cacheChartType = _this3.$store.state.chart_type;

          _this3.$store.commit('chart_type', _this3.CONSTANTS.CHART_TYPE.REAL_TIME);

          _this3.$store.commit('all_kline_data', []);

          _this3.$store.commit('current_interval', 'm1');

          _this3.$Od.$setElementAttribute(document.getElementsByClassName('interval-item active')[0], 'class', 'interval-item');

          _this3.$Od.$setElementAttribute(button, 'class', 'interval-item active');

          deedfeeds.intervalChanged({
            interval: 'm1',
            setHistoryData: chart_instance.initHistoryData,
            subscribeData: chart_instance.getRealTimeData
          });
        };

        this.c.appendChild(button);
      }
    }]);

    return IntervalToolBar;
  }(_default);

  function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var BottomRightBlock = /*#__PURE__*/function (_ChartBaseConfig) {
    inherits(BottomRightBlock, _ChartBaseConfig);

    var _super = _createSuper$d(BottomRightBlock);

    function BottomRightBlock() {
      var _this;

      classCallCheck(this, BottomRightBlock);

      _this = _super.call(this);
      _this.c = _this.$Od.$createElement('canvas');
      _this.c.width = _this._handleDevicePixelRatio({
        value: _this.$store.state.y_axis_width
      });
      _this.c.height = _this._handleDevicePixelRatio({
        value: _this.$store.state.x_axis_height
      });
      _this.c.style.width = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.width
      }), "px");
      _this.c.style.height = "".concat(_this._handleDevicePixelRatio({
        symbol: '/',
        value: _this.c.height
      }), "px");
      _this._ctx = _this.c.getContext("2d");

      _this.$Od.$setElementAttribute(_this.c, 'style', {
        position: 'absolute',
        bottom: 0,
        right: 0,
        background: _this.$store.state.theme.background_color
      });

      _this.draw(); // 主题切换


      _this.$watcher.on(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, function () {
        _this.$Od.$setElementAttribute(_this.c, 'style', {
          background: _this.$store.state.theme.background_color
        });

        _this.draw();
      });

      return _this;
    }

    createClass(BottomRightBlock, [{
      key: "draw",
      value: function draw() {
        var axis_color = this.$store.state.theme.axis_color;

        this._ctx.moveTo(0, 0 + 0.5);

        this._ctx.lineTo(this.c.width, 0 + 0.5);

        this._ctx.moveTo(0 + 0.5, 0);

        this._ctx.lineTo(0 + 0.5, this.c.height);

        this._ctx.lineWidth = 1;
        this._ctx.strokeStyle = axis_color;

        this._ctx.stroke();
      }
    }]);

    return BottomRightBlock;
  }(_default);

  function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function () { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function VyChartNode($Od, container, state) {
    var vyChart = $Od.$createElement('div');
    $Od.$setElementAttribute(vyChart, 'id', 'vy-chart');
    $Od.$setElementAttribute(vyChart, 'style', {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: "calc(100% - ".concat(state.interval_tool_bar, ")")
    });
    container.appendChild(vyChart);
    return vyChart;
  } // default loading...


  function loadingNode($Od, container, state) {
    var loading = $Od.$createElement('div');
    var spin = $Od.$createElement('div');
    $Od.$setElementAttribute(loading, 'id', 'loading');
    $Od.$setElementAttribute(spin, 'class', 'spin');
    spin.innerText = 'loading...';
    $Od.$setElementAttribute(loading, 'style', {
      display: 'block',
      position: 'absolute',
      zIndex: '9527',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255,255,255, 0.6)'
    });
    loading.appendChild(spin);
    container.appendChild(loading);
    return loading;
  }
  /**
   * k线图 主类
   */


  var Chart = /*#__PURE__*/function (_DrawView) {
    inherits(Chart, _DrawView);

    var _super = _createSuper$e(Chart);

    /* chart_container */
    function Chart() {
      var _this;

      classCallCheck(this, Chart);

      _this = _super.call(this);
      _this.customChart = null;
      return _this;
    } // 启动图表


    createClass(Chart, [{
      key: "bootstrap",
      value: function bootstrap(userConfig) {
        var container = userConfig.container,
            deedfeeds = userConfig.deedfeeds,
            defaultInterval = userConfig.defaultInterval,
            customChart = userConfig.customChart,
            _userConfig$showInter = userConfig.showIntervalToolbar,
            showIntervalToolbar = _userConfig$showInter === void 0 ? true : _userConfig$showInter,
            customLoadingEl = userConfig.customLoadingEl;
        this.$store.commit('user_config', userConfig);
        this.customChart = customChart;

        this._customChart(customChart);

        this.$store.commit('deedfeeds', deedfeeds);
        this.$store.commit('current_interval', defaultInterval);
        /* init loading */

        if (customLoadingEl) {
          if (customLoadingEl instanceof HTMLElement) {
            this.loading = customLoadingEl;
            this.$store.commit('loadingNode', this.loading);
            container.appendChild(this.loading);
          } else {
            console.error('[vy-kline:ERROR] option "customLoadingEl" is not a HTMLElement;');
          }
        } else {
          // 加载默认loading
          this.loading = loadingNode(this.$Od, container, this.$store.state);
          this.$store.commit('loadingNode', this.loading);
        }
        /* ================ */

        /* init toolbar */


        this.intervalToolBarInstance = new IntervalToolBar();
        container.appendChild(this.intervalToolBarInstance.c);
        this.intervalToolBarInstance.c.style.display = !showIntervalToolbar ? 'none' : 'block';
        /* ================ */

        this.vyChart = VyChartNode(this.$Od, container, this.$store.state);
        this.$store.commit('el', this.vyChart);
        this.$store.commit('vy_chart', this.vyChart);
        container.style.position = 'relative';
        this.container = container;
        this.deedfeeds = deedfeeds;
        this.KlineCanvas = null; // 主体k线

        this.YAxis = null; // Y轴

        this.XAxis = null;
        this.Dashboard = null; // 左上数据信息

        this.VolumeCanvas = null; // 交易量

        this.BottomRightBlock = null; // 右下角块

        this.initHistoryData = this.initHistoryData.bind(this);
        this.getRealTimeData = this.getRealTimeData.bind(this); // 获取数据后 启动图表 + 获取 实时 k线数据

        deedfeeds.setHistoryData({
          interval: defaultInterval,
          setHistoryData: this.initHistoryData,
          subscribeData: this.getRealTimeData
        });
      } // 初始化历史数据 main logic 
      // getRealTimeData 会触发这里 避免重复 commit 数据不变时可以优化

    }, {
      key: "initHistoryData",
      value: function initHistoryData(allData) {
        // allData 初始化时得到所有数据 币种切换时也会触发
        this.$store.commit('all_kline_data', allData);
        this.dealCanDrawViewData(allData);

        if (!this.KlineCanvas) {
          this.initViewOnce(); // 保持单例
        }

        this.KlineCanvas.drawHistory();
        this.VolumeCanvas.draw();
        this.$watcher.emit(CONSTANTS.WATCHER_EVENT.HISTORY_DATA_CHANGE);
        this.loading.style.display = 'none';
      } // 获取 实时 k线数据

    }, {
      key: "getRealTimeData",
      value: function getRealTimeData(nowData) {
        // 排除 time 为undefined 情况 首次加载可能会出现
        if (!nowData.time) return;
        var all_kline_data = this.$store.state.all_kline_data; // 等于  替换数据 

        if (!all_kline_data[0]) return;

        if (all_kline_data[0].time === nowData.time) {
          all_kline_data[0] = nowData;
        } else {
          // 否则 unshift 数据  数据异常时存在各种情况 需要新增捕错机制
          all_kline_data.unshift(nowData);
          this.$watcher.emit(CONSTANTS.WATCHER_EVENT.ONE_DATA_UPDATED, nowData);
        }

        this.$store.commit('all_kline_data', all_kline_data);
        /* 处理完成后当成 完整的历史数据 绘制 */

        this.initHistoryData(this.$store.state.all_kline_data);
        this.$watcher.emit(CONSTANTS.WATCHER_EVENT.REAL_TIME_DATA);
      } // 初始化视图节点 once

    }, {
      key: "initViewOnce",
      value: function initViewOnce() {
        this.KlineCanvas = new KlineCanvas({
          backgroundColor: '#fff'
        });
        this.$store.commit('kline_canvas', this.KlineCanvas);
        this.KlineMaskCanvas = new KlineMaskCanvas();
        this.XAxis = new XAxisCanvas();
        this.YAxis = new YAxisCanvas();
        this.VolYAxis = new VolYAxis();
        this.VolumeCanvas = new Volume();
        this.Dashboard = new Dashboard();
        this.BottomRightBlock = new BottomRightBlock();
        this.intervalToolBarInstance.c.style.backgroundColor = this.$store.state.background_color;
        this.XAxis.draw();
        this.YAxis.draw();
        this.VolYAxis.draw();
        this.BottomRightBlock.draw();
        this.vyChart.appendChild(this.KlineCanvas.c);
        this.vyChart.appendChild(this.KlineMaskCanvas.c);
        this.vyChart.appendChild(this.VolumeCanvas.c);
        this.vyChart.appendChild(this.XAxis.c);
        this.vyChart.appendChild(this.YAxis.c);
        this.vyChart.appendChild(this.VolYAxis.c);
        this.vyChart.appendChild(this.Dashboard.dashboardWrapper);
        this.vyChart.appendChild(this.BottomRightBlock.c);
      } // 设置图表类型

    }, {
      key: "switchChartType",
      value: function switchChartType(type) {
        this.$store.commit('chart_type', type);
        this.initHistoryData(this.$store.state.all_kline_data);
      } // 主题切换

    }, {
      key: "switchTheme",
      value: function switchTheme(theme) {
        this.$store.commit('theme', this.THEME[theme]);
        this.$watcher.emit(CONSTANTS.WATCHER_EVENT.THEME_SWITCHED, theme);
        this.initHistoryData(this.$store.state.all_kline_data);
      }
    }]);

    return Chart;
  }(DrawView);

  var chartInstance = new Chart();
  chartInstance.$store.commit('chart_instance', chartInstance);
  window.vyChart = chartInstance;

  return chartInstance;

})));
