import $ajax from '../ajax'
import $utils from '../utils'

export default {
  getAllLinksCount(data) {
    return $ajax.get($utils.composeApiPath('getAllLinksCount'), data)
  },
  getNiceLinks(data) {
    return $ajax.get($utils.composeApiPath('getNiceLinks'), data)
  },
  searchNiceLinks(data) {
    return $ajax.get($utils.composeApiPath('searchNiceLinks'), data)
  },
  getRandomLinks(data) {
    return $ajax.get($utils.composeApiPath('getRandomLinks'), data)
  },
  getSysConf(data) {
    return $ajax.get($utils.composeApiPath('getSysConf'), data)
  },
  getRandomSentence() {
    return $ajax.post($utils.composeApiPath('getRandomSentence'))
  }
}
