import storage from '@system.storage'

export default {
  set: (key, value) => {
    return new Promise((resolve, reject) => {
      return storage.set({
        key,
        value,
        success: function(data) {
          resolve(data)
        },
        fail: function(data, code) {
          console.log(`Somthing Error[@storage set]: data = ${data}`)
          reject(data)
        }
      })
    })
  },
  get: key => {
    return new Promise((resolve, reject) => {
      return storage.get({
        key,
        success: function(data = '{}') {
          try {
            resolve(JSON.parse(data) || {})
          } catch (error) {
            resolve([])
            console.log(`Somthing Error[@storage get]: error = ${error}`)
          }
        },
        fail: function(data, code) {
          console.log(`Somthing Error[@storage get]: data = ${data}`)
          reject(data)
        }
      })
    })
  }
}
