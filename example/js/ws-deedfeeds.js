
const wssUrl = "wss://api.hadax.com/ws"
const pako = window.pako
// 'm1','h1', 'd1', 'w1', 'M1'
// 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year 

// 取消订阅
// { "unsub": "topic to unsub", "id": "id generate by client" }

// 单位映射
const unitMap = {
  m: 'min',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'mon',
}

// 格式化时间粒度
function formatPeriod(str) {
  const reg = /([A-z]+)([0-9]+)/
  const matchedArr = str.match(reg)
  if (matchedArr) {
    return matchedArr[2] + unitMap[matchedArr[1]]
  } else {
    console.error("格式化时间粒度出错！");
  }
}

const SYMBOL = 'bchusdt';

// 固定为 300 条数据

const dataNum = 300 // 数据条数
const historyK = (interval) => {
  const reg = /[0-9]+/

  return {
    req: `market.${SYMBOL}.kline.${formatPeriod(interval)}`,
    id: SYMBOL,
    from: Math.trunc(Date.now() / 1000) - 60 * dataNum * interval.match(reg)[0], // 1min 对应一条数据 最小粒度为 1 min
    to: Math.trunc(Date.now() / 1000)
  }
}

const subK = (interval) => ({ // 订阅数据
  sub: `market.${SYMBOL}.kline.${formatPeriod(interval)}`,
  id: SYMBOL
})

const unsubK = (interval) => ({ // 取消订阅数据
  unsub: `market.${SYMBOL}.kline.${formatPeriod(interval)}`,
  id: SYMBOL
})

class Deedfeeds {

  constructor() {
    this.ws = new WebSocket(wssUrl)
    this.currentInterval = null
    this.subscribeDataParam = {
      interval: null,
      setHistoryData: null,
      subscribeData: null
    } // 再次订阅时需要的数据
  }

  handleData(msg) { // 处理数据

    if (!this.subscribeDataParam.interval) {
      console.error("订阅数据参数错误！");
      return
    }

    let data = JSON.parse(msg)
    if (data.ping) {
      // console.log(JSON.stringify({ pong: data.ping }));
      this.ws.send(JSON.stringify({ pong: data.ping }));
    } else if (data.status === "ok") { // 响应数据 历史数据 | 常规回调
      // this.getResData(data)
      // console.log("响应数据", data);
      // 注意倒序
      if (data.data) {
        const historyData = []
        data.data && data.data.forEach(item => {
          historyData.unshift({
            time: item.id * 1000, // 时间
            open: item.open, // 开
            high: item.high, // 高
            low: item.low, // 低
            close: item.close, // 收
            volume: item.vol // 交易量
          })
        })
        this.subscribeDataParam.setHistoryData(historyData)
      } else if (data.unsubbed) { // 取消订阅成功
        this.ws.send(JSON.stringify(historyK(this.subscribeDataParam.interval)));
        this.ws.send(JSON.stringify(subK(this.subscribeDataParam.interval)));
      }
    } else { // 实时数据
      // this.getResData(data)
      // console.log(data);
      if (data.tick) {
        const perData = data.tick
        this.subscribeDataParam.subscribeData({
          time: perData.id * 1000, // 时间
          open: perData.open, // 开
          high: perData.high, // 高
          low: perData.low, // 低
          close: perData.close, // 收
          volume: perData.vol // 交易量
        })
      }
    }
  }

  setHistoryData({ interval, setHistoryData, subscribeData }) {
    this.currentInterval = interval
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(historyK(interval)));
      this.ws.send(JSON.stringify(subK(interval)));
    }

    this.subscribeDataParam = {
      interval,
      setHistoryData,
      subscribeData
    }

    this.ws.onmessage = event => {
      let blob = event.data;
      const fileReader = new FileReader();

      fileReader.onload = e => {
        let ploydata = new Uint8Array(e.target.result);
        let msg = pako.inflate(ploydata, { to: 'string' });
        this.handleData(msg);
      };
      fileReader.readAsArrayBuffer(blob, "utf-8")
    }
  }

  intervalChanged({ interval, setHistoryData, subscribeData }) {
    this.subscribeDataParam = {
      interval,
      setHistoryData,
      subscribeData
    }
    this.ws.send(JSON.stringify(unsubK(this.currentInterval)))
    this.currentInterval = interval
  }
}

window.deedfeeds = new Deedfeeds();