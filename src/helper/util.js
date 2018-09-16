/**
 * @desc 显示菜单
 */
function showMenu () {
  const prompt = require('@system.prompt')
  const itemFuncMapping = [
    createShortcut, 
    call3thPartyShare,
    jump2AboutPage,
    null
  ]
  prompt.showContextMenu({
    itemList: ['保存桌面', '分享', '关于', '取消'],
    success: function (ret) {
      if (itemFuncMapping[ret.index]) {
        itemFuncMapping[ret.index]()
      } else {        
        prompt.showToast({
          message: 'error'
        })
      } 
    }
  })
}

/**
 * @desc 跳转至 About 页面
 */
function jump2AboutPage () {
  const router = require('@system.router')
  const appInfo = require('@system.app').getInfo()
  router.push({
    uri: '/pages/About',
    params: {
      name: appInfo.name,
      icon: appInfo.icon
    }
  })
}

/**
 * @desc 调起第三方分享
 */
function call3thPartyShare () {
  const share = require('@service.share')

  share.share({
    shareType: 0,
    title: '倾城之链',
    summary: '倾城之链，作为一个开放平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。',
    imagePath: '/assets/images/logo.png',
    targetUrl: 'http://nicelinks.site',
    platforms: ["WEIBO", "WEIXIN", "WEIXIN_CIRCLE"],
    success: function (data) {
      console.log('handling success')
    },
    fail: function (data, code) {
      console.log(`handling fail, code = ${code}`)
      console.log(data)
    }
  })
}

/**
 * @desc 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut () {
  const prompt = require('@system.prompt')
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function (ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function () {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function (errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

function setCurrentDate (date) {
  // set current Date
}

function serverUrl (apiName) {
  return `https://nicelinks.site/api/${apiName}`
}

function queryString (url, query) {
  let str = []
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  let paramStr = str.join('&')
  return paramStr ? `${url}?${paramStr}` : url
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min
}

export default {
  showMenu,
  createShortcut,
  serverUrl,
  queryString,
  setCurrentDate,
  getRandomInt
}
