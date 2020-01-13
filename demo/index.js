import Vcomment from '../src/index'

const vcomment = new Vcomment({
  id: 'comments',
  postId: '1353745196751',
  url: 'http://localhost:8080',
  currentPage: 1,
  vditor: {
    hljsEnable: false,
    hljsStyle: "github"
  }
})

vcomment.render()
