import {WebHandler} from './WebHandler'
import md5 from 'js-md5'
const isIos = navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') > 0
const isAndroid = navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') > 0

let webHandler = new WebHandler()

/** nativeApi调用 */
window.cacheQueue = []

function callHandler (handlerName, params, callback) {
  if (window.ZYNativeApi && (window.ZYNativeApi.isReady || isIos)) {
    window.ZYNativeApi.callHandler(handlerName, params, callback)
  } else {
    window.cacheQueue.push({
      handlerName,
      params,
      callback
    })
  }
}

window.document.addEventListener('ZYNativeApiReady', function () {
  window.ZYNativeApi.isReady = true
  if (window.cacheQueue && window.cacheQueue.length) {
    window.cacheQueue.forEach(({handlerName, params, callback}) => {
      window.ZYNativeApi.callHandler(handlerName, params, callback)
    })
    window.cacheQueue = []
  }
}, false)

function call (handlerName, params, {success, error}) {
  if (!isIos && !isAndroid) {
    webHandler.callWebHandler(handlerName, params, {success, error})
  } else {
    try {
      callHandler(handlerName, params, (result) => {
        if (Number(result.status) === 0) {
          success && success(result.data)
        } else {
          error && error(result.msg)
        }
      })
    } catch (e) {
      error && error(e)
    }
  }
}

const AppStorage = {
  getItem: (keys, {success, error}) => {
    call('AppStorage.getItem', keys, {success, error})
  },
  setItem: (obj, {success, error}) => {
    call('AppStorage.setItem', obj, {success, error})
  }
}

const getLoginInfo = ({success, error}) => {
  AppStorage.getItem(['accountNumber', 'userId', 'token'], {success, error})
}

const eeLogUBT = (action, event, properties) => {
  console.log(JSON.stringify(action))
}

const idCardFrontInfo = ({success, error}) => {
  call('faceId.IDCardQuality', {side: 0}, {success, error})
}

const idCardBackInfo = ({success, error}) => {
  call('faceId.IDCardQuality', {side: 1}, {success, error})
}

const faceRecognition = ({success, error}) => {
  call('faceId.faceDetect', null, {success, error})
}

const sesameCertification = ({success, error}) => {
  console.log(JSON.stringify(success))
}

const certification = (params, {success, error}) => {
  call('certification.OperatorAuth', params, {success, error})
}

const downLoadApp = (params) => {
  call('downLoadApp.downLoadApp', params, {success: null, error: null})
}

const getVersion = ({success, error}) => {
  AppStorage.getItem(['appVersion'], {success, error})
}

const getDeviceInfo = ({success, error}) => {
  call('ymtSystem.deviceInfo', {}, {success, error})
}

const uploadImg = ({success, error}) => {
  console.log(JSON.stringify(success))
}

const goToChat = (accountNumber) => {
  call('online.customer', {userName: accountNumber, userId: md5(accountNumber)}, {})
}

const getUnreadMsg = ({success, error}) => {
  call('online.unReadMsg', {success, error})
}

const chooseContact = ({success, error}) => {
  call('contact.GetContacts', {}, {success, error})
}

const getAppInfo = ({success, error}) => {
  console.log(JSON.stringify(success))
}

const navigate = (params, {success, error}) => {
  call('navigate.navigate', params, {success, error})
}

const handleBack = (param, {success, error}) => {
  call('handleBack', param, {success, error})
}

const handIDCard = ({success, error}) => {
  call('faceId.handIDCard', {}, {success, error})
}

const dialing = (str) => {
  if (isAndroid) {
    call('ymtSystem.dial', {tel: str}, {success: () => {}, error: () => {}})
  } else {
    window.location.href = `tel://${str}`
  }
}

const popPage = (str) => {
  call('ymtSystem.popPage', {injectJs: str}, {success: () => {}, error: () => {}})
}

export {
  AppStorage,
  getLoginInfo,
  getAppInfo,
  eeLogUBT,
  idCardFrontInfo,
  idCardBackInfo,
  faceRecognition,
  sesameCertification,
  certification,
  downLoadApp,
  getVersion,
  getDeviceInfo,
  uploadImg,
  goToChat,
  getUnreadMsg,
  chooseContact,
  navigate,
  handleBack,
  handIDCard,
  dialing,
  popPage
}
