const INVALID_DATE = 'Invalid Date'
function commonDeal(matchedTime, matched) {
  matchedTime = matchedTime < 10 ? `0${matchedTime}` : matchedTime
  let l = matchedTime.length
  let startIndex = matched.length >= matchedTime.length ? l : matched.length
  return matchedTime.slice(l - startIndex, l)
}

let dateStrategies = {
  // 年
  Y(time, matched) {
    let matchedTime = String(time.getFullYear())
    return commonDeal(matchedTime, matched)
  },
  // 月
  M(time, matched) {
    let matchedTime = String(time.getMonth() + 1)
    return commonDeal(matchedTime, matched)
  },
  // 日
  D(time, matched) {
    let matchedTime = String(time.getDate())

    return commonDeal(matchedTime, matched)
  },
  // 时
  H(time, matched) {
    let matchedTime = String(time.getHours())
    return commonDeal(matchedTime, matched)
  },
  // 分
  m(time, matched) {
    let matchedTime = String(time.getMinutes())
    return commonDeal(matchedTime, matched)
  },
  // 秒
  s(time, matched) {
    let matchedTime = String(time.getSeconds())
    return commonDeal(matchedTime, matched)
  },
}

class TimeFormater {
  format(time, format) {
    let input = time
    if (!(time instanceof Date)) {
      input = new Date(time)
      if (String(input) === INVALID_DATE) {
        throw new Error('Invalid Date')
      }
    }
    const reg = /Y{1,}|M{1,}|D{1,}|H{1,}|m{1,}|s{1,}/g
    let formatTime = format.replace(reg, matched => {
      return dateStrategies[matched[0]](input, matched)
    })
    return formatTime
  }
}

export default new TimeFormater()
