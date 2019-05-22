import {getAccountNumber, getToken, getUserId, setAccountNumber, setToken, setUserId} from '@/common/utils/auth'
import router from '../../router'
let obj = {
  'appVersion': '3.5.1',
  'deviceId': '0B4AB0FF-573E-431F-BFE2-EA0200BFB905',
  'phoneOs': 'ios',
  'appName': 'ymt',
  'accountNumber': '',
  'userId': '11190221300001',
  'token': 'b9325eaa55a3127494ac139faba2c09',
  'firstOpen': false,
  'remainAgain': ''
}

export class WebHandler {
  constructor (props) {
  }

  setItem (objs, {success, error}) {
    Object.keys(objs).forEach((item) => {
      if (item === 'token' || item === 'userId' || item === 'accountNumber') {
        if (item === 'token') {
          setToken(objs.token)
        }
        if (item === 'userId') {
          setUserId(objs.userId)
        }
        if (item === 'accountNumber') {
          setAccountNumber(objs.accountNumber)
        }
      } else {
        obj[item] = objs[item]
      }
    })
    let res = {
      msg: '成功',
      status: 1
    }
    success && success(res)
  }

  getItem (keys, {success, error}) {
    let res = {}
    keys.forEach((item) => {
      // res[item] = true
      if (item === 'token' || item === 'userId' || item === 'accountNumber') {
        if (item === 'token') {
          res[item] = getToken()
        }
        if (item === 'userId') {
          res[item] = getUserId()
        }
        if (item === 'accountNumber') {
          res[item] = getAccountNumber()
        }
      } else {
        res[item] = obj[item]
      }
    })
    success && success(res)
  }
  // 模拟原生协议跳转
  navigate (params, {success, error}) {
    console.log(JSON.stringify(params))
  }
  callWebHandler (handlerName, params, {success, error}) {
    let funcName = handlerName.split('.')
    if (funcName.length === 2) {
      this[funcName[1]](params, {success, error})
    } else {
      this[handlerName](params, {success, error})
    }
  }
}
