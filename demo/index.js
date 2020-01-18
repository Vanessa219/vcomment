import Vcomment from '../src/index'
import $ from 'jquery'

const vcomment = new Vcomment({
  id: 'comments',
  postId: '1578760925288',
  url: 'https://hacpai.com',
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
