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

function route2aboutPage() {
  const appInfo = require('@system.app').getInfo()
  router.push({
    uri: '/pages/About',
    params: {
      name: appInfo.name,
      icon: appInfo.icon
    }
  })
}

function route2aboutAuthor() {
  router.push({
    uri: 'https://about.me/nicejade/?utm_source=quickapp'
  })
}

function route2mainPage() {
  router.push({
    uri: '/pages/Main'
  })
}

export default {
  route2aboutPage,
  createShortcut,
  call3thPartyShare,
  showMenu() {
    const itemFuncMapping = [route2mainPage, route2aboutPage, route2aboutAuthor, createShortcut, null]
    prompt.showContextMenu({
      itemList: ['倾城主页', '关于倾城', '关于作者', '保存桌面', '取消'],
      success: ret => {
        if (itemFuncMapping[ret.index]) {
          itemFuncMapping[ret.index]()
        } else {
          // do nothing (取消)
        }
      }
    })
  },

  promptMessage(message = '') {
    if (!message) return
    prompt.showToast({
      message: message
    })
  },

  route2theUrl(url, params) {
    router.push({
      uri: url,
      params: params
    })
  },

  route2nicelinks() {
    router.push({
      uri: 'https://nicelinks.site/explore/all?utm_source=quickapp'
    })
  }
}
