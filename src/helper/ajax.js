import $util from './util'
import $fetch from '@system.fetch'

function requestHandle (params) {
  return new Promise((resolve, reject) => {
    $fetch.fetch({
      url: params.url,
      method: params.method,
      data: params.data,
      success: (data) => {
        const serverResponse = JSON.parse(data.data)
        if (serverResponse.success) {
          resolve(serverResponse.value)
        } else {
          resolve(serverResponse.message)
        }
      },
      fail: (data, code) => {
        console.log(`request fail, code = ${code}`)
        reject(data)
      },
      complete: (data) => {
        reject(data)
      }
    })
  })
  // let defer = $q.defer()
  // axios(params)
  //   .then(res => {
  //     if (res && (res.unauthorized || res.statusCode === 401)) {
  //       window.location.href = '/login'
  //     }
  //     if (res.type === 'application/x-msdownload') {
  //       redirectToIframe(res.request.responseURL)
  //     } else if (res.data) {
  //       // update current date according backend @18-08-15
  //       $util.setCurrentDate(res.headers && res.headers.date)
  //       if (res.data.success) {
  //         defer.resolve(res.data.value)
  //       } else {
  //         defer.reject(res.data.message)
  //       }
  //     } else {
  //       defer.reject()
  //     }
  //   }).catch(err => {
  //     defer.reject(err)
  //   })

  // return defer.promise
}

function redirectToIframe (url) {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

export default {
  post: function (url, params, op) {
    return requestHandle({
      method: 'post',
      url: url,
      data: params
    })
  },
  get: function (url, params, op) {
    return requestHandle({
      method: 'get',
      url: $util.queryString(url, params)
    })
  }
}
