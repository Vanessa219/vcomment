## 💡 简介

[vcomment](https://github.com/Vanessa219/vcomment) 🧵 B3log 分布式社区的评论组件，欢迎加入下一代社区网络。

## 🛠️ 使用文档

### CommonJS

* 安装依赖

```shell
npm install vcmt --save
```

* 在代码中引入并初始化对象，可参考 [index.js](https://github.com/Vanessa219/vcomment/blob/master/demo/index.js)

```ts
import Vcomment from '../src/index'

const vcomment = new Vcomment({
  id: 'comments',
  postId: '1353745196751',
  userName: 'vanessa',
  url: 'http://localhost:8080',
  currentPage: 3,
  vditor: {
    hljsEnable: false,
    hljsStyle: "github"
  }
})

vcomment.render()
```

### HTML script

* 在 HTML 中插入 js

```html
<!-- ⚠️生产环境请指定版本号，如 https://cdn.jsdelivr.net/npm/vcmt@x.x.x/dist... -->
<script src="https://cdn.jsdelivr.net/npm/vcmt/dist/index.min.js" defer></script>
```

### 示例代码

* [CommonJS](https://github.com/Vanessa219/vcomment/blob/master/demo/index.js)

### API

#### options

| |说明|	默认值|
|---|---|---|
| id| 渲染元素的 id |-|
| postId| 文章 id |-|
| userName| 用户名 |-|
| url| 评论 API 地址 |"https://hacpai.com"|
| currentPage| 评论页码|1|
|vditor|编辑器参数|-|
|vditor.hljsEnable|是否启用高亮|true|
|vditor.hljsStyle|高亮样式|"github"|
|vditor.emoji|自定义表情 { [key: string]: string }|{}|

#### methods

| |说明|
|---|---|
|render|渲染评论|

## 欢迎关注 B3log 开源社区微信公众号 `B3log开源`

![image-d3c00d78](https://user-images.githubusercontent.com/873584/71566370-0d312c00-2af2-11ea-8ea1-0d45d6f0db20.png)
