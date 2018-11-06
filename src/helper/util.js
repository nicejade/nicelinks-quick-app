const prompt = require('@system.prompt')
const router = require('@system.router')
const share = require('@service.share')

/**
 * @desc 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function(ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function() {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function(errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

/**
 * @desc 调起第三方分享
 */
function call3thPartyShare() {
  share.share({
    shareType: 0,
    title: '快应用分享',
    summary:
      '倾城之链，作为一个开放平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。',
    imagePath: '/assets/images/logo.png',
    targetUrl: 'https://nicelinks.site',
    platforms: ['SYSTEM'],
    success: function(data) {
      prompt.showToast({
        message: `已成功完成分享`
      })
    },
    fail: function(data, code) {
      prompt.showToast({
        message: `handling fail, code = ${code}, message: ${JSON.stringify(data)}`
      })
      console.log(`handling fail, code = ${code}`)
    }
  })
}

function jump2AboutPage() {
  const appInfo = require('@system.app').getInfo()
  router.push({
    uri: '/pages/About',
    params: {
      name: appInfo.name,
      icon: appInfo.icon
    }
  })
}

export default {
  createShortcut,
  showMenu() {
    const itemFuncMapping = [createShortcut, call3thPartyShare, jump2AboutPage, null]
    prompt.showContextMenu({
      itemList: ['保存桌面', '分享', '关于', '取消'],
      success: ret => {
        if (itemFuncMapping[ret.index]) {
          itemFuncMapping[ret.index]()
        } else {
          // do nothing (取消)
        }
      }
    })
  },

  jump2theUrl(url, params) {
    router.push({
      uri: url,
      params: params
    })
  },

  jump2nicelinks() {
    router.push({
      uri: 'https://nicelinks.site/explore/all?utm_source=quickapp'
    })
  },

  /* -----------------Common Function----------------- */

  setCurrentDate(date) {
    // set current Date
  },

  serverUrl(apiName) {
    return `https://nicelinks.site/api/${apiName}`
  },

  queryString(url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },

  promptMessage(message = '') {
    if (!message) return
    prompt.showToast({
      message: message
    })
  },

  // 获取字符串实际长度(包含汉字,汉字统一按照 2 字节算;)
  getByteLength(str = '') {
    if (typeof str !== 'string') return str.length
    return str.replace(/[^\x00-\xff]/g, 'aa').length
  },

  interceptString(string = '', length = 140) {
    if (this.getByteLength(string) > 140) {
      return string.substring(0, length) + '...'
    } else {
      return string
    }
  },

  dateOffset(thatTime, nowTime) {
    if (!arguments.length) return ''
    var arg = arguments
    var now = arg[1] ? arg[1] : new Date().getTime()
    var offsetValue = now - new Date(arg[0]).getTime()
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var week = day * 7
    var month = day * 30
    var year = month * 12

    let unitArr = ['年前', '月前', '周前', '天前', '小时前', '分钟前', '刚刚']
    let offsetArr = [year, month, week, day, hour, minute].map((item, index) => {
      return {
        value: offsetValue / item,
        unit: unitArr[index]
      }
    })

    for (let key in offsetArr) {
      if (offsetArr[key].value >= 1) {
        return parseInt(offsetArr[key].value) + ' ' + offsetArr[key].unit
      }
    }
    return unitArr[6]
  }
}
