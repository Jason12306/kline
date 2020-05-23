/**
 * @description 简单的四则运算 处理精度损失了较大性能 不再处理
*/

let strategies = {
  // 加
  '+': function (arg1, arg2) {
    return arg1 + arg2
  },
  // 减
  '-': function (arg1, arg2) {
    return arg1 - arg2
  },
  // 乘
  '*': function (arg1, arg2) {
    return arg1 * arg2
  },
  // 除
  '/': function (arg1, arg2) {
    return arg1 / arg2
  }
}

export default function (type) {
  let argLen = arguments.length
  // 第一个参数 为类型
  let result
  for (let i = 1; i < argLen; i++) {
    if (i === 1) {
      result = arguments[i]
    } else {
      result = strategies[type](result, arguments[i])
    }
  }
  return result
}
