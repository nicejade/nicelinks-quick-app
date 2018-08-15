import $ajax from '../ajax'
import $util from '../util'

export default {
  getAllLinksCount (data) {
    return $ajax.get($util.serverUrl('getAllLinksCount'), data)
  }
}