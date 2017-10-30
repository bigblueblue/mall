import starPic from '../assets/star.png'
import unstarPic from '../assets/star-h.png'
import halfstar from '../assets/star-half.png'
const api = 'http://www.zhijiaoyuan.com.cn/test/getServiceData?url='
export default{
  api,
  commentStar: function (a) {
    a = Math.floor(a)
    switch (a) {
      case 0:
        return [unstarPic, unstarPic, unstarPic, unstarPic, unstarPic]
      case 0.5:
        return [halfstar, unstarPic, unstarPic, unstarPic, unstarPic]
      case 1:
        return [starPic, unstarPic, unstarPic, unstarPic, unstarPic]
      case 1.5:
        return [starPic, halfstar, unstarPic, unstarPic, unstarPic]
      case 2:
        return [starPic, starPic, unstarPic, unstarPic, unstarPic]
      case 2.5:
        return [starPic, starPic, halfstar, unstarPic, unstarPic]
      case 3:
        return [starPic, starPic, starPic, unstarPic, unstarPic]
      case 3.5:
        return [starPic, starPic, halfstar, unstarPic, unstarPic]
      case 4:
        return [starPic, starPic, starPic, starPic, unstarPic]
      case 4.5:
        return [starPic, starPic, starPic, starPic, halfstar]
      case 5:
        return [starPic, starPic, starPic, starPic, starPic]
    }
  }
}
