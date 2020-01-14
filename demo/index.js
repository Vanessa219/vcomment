import Vcomment from '../src/index'

const vcomment = new Vcomment({
  id: 'comments',
  postId: '1353745196751',
  url: 'http://192.168.0.107:8080',
  userName: '88250',
  currentPage: 1,
  vditor: {
    hljsEnable: false,
    hljsStyle: 'github',
  },
})

vcomment.render()
