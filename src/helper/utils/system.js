const prompt = require('@system.prompt')
const router = require('@system.router')
const share = require('@service.share')
const clipboard = require('@system.clipboard')

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
function call3thPartyShare(params = {}) {
  share.share({
    shareType: 0,
    title: params.title || '倾城之链「快应用」',
    summary: params.summary || $constant.SITE_DESC,
    imagePath: params.imagePath || '/assets/images/logo.png',
    targetUrl: params.targetUrl || 'https://nicelinks.site?utm_source=ux-share',
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
    uri: 'https://nicelinks.site/member/admin?utm_source=quickapp'
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

  copy2clipboard(str, promptStr = '👏 已成功拷贝至剪切板') {
    clipboard.set({
      text: str,
      success: function(data) {
        $utils.promptMessage(promptStr)
      },
      fail: function(data, code) {
        $utils.promptMessage('😅 拷贝至剪切板失败')
      }
    })
  },

  routerBack() {
    router.back()
  },

  reute2WebPage(params = {}) {
    router.push({
      uri: 'pages/WebPage',
      params: params
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
