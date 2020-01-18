import Vcomment from '../src/index'
import $ from 'jquery'

const vcomment = new Vcomment({
  id: 'comments',
  postId: '1353745196751',
  url: 'http://localhost:8080',
  userName: '88250',
  currentPage: 1,
  vditor: {
    hljsEnable: false,
    hljsStyle: 'github',
  },
  error () {
    $('#comments').remove()
  },
})

vcomment.render()
