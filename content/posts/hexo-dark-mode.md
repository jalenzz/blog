---
title: "Hexo Fluid 暗黑模式"
date: 2020-04-02
published: true
license: true
slug: hexo-dark-mode
tags: ['DarkMode', 'Hexo']
cate: tech
cover_image: "./images/hexo-dark-mode.png"
canonical_url: false
description: "适用于 Hexo 的暗黑模式，推荐在主题没有暗色模式的情况下使用"
---


大概花了一个晚上搞暗黑模式，之后几天陆续优化了下
目前博客已经基本上适配完成了
目前是三种方案（优先级递减）

1. 媒体查询
2. 定时开启
3. localStorage/sessionStorage 查询
<!--more-->
`媒体查询`，判断系统是否处于暗黑模式，支持大部分系统
Win10 需要浏览器开启深色模式
Android 同理，需要浏览器支持手机开启夜间模式的时候将自身切换到神色模式，目前 Chrome 支持，Edge 不支持，其他没测
iOS、MacOS 上的 Safari 也支持

`定时开启`，在规定时间自动开启，如果在该时间段内取消了暗黑模式，能一直保持

`localStorage/sessionStorage 查询`，能一直保持某一个模式的依赖

### HTML

在 `\themes\fluid\layout\layout.ejs` 中找到 `<body>`，在其之后加入如下代码

```html
<div id="dark" onclick="switchDarkMode()"></div>
<script>
  var isNight = new Date().getHours() >= 22 || new Date().getHours() < 7;
  if( matchMedia('(prefers-color-scheme: dark)').matches || isNight || localStorage.getItem('dark') === '1') {
    if(!(isNight&&localStorage.getItem('noDark') === '1')) {
      document.body.classList.add('dark');
    }
  }
  document.getElementById('dark').innerHTML = document.querySelector("body").classList.contains("dark")?"🌙":"🌞";
</script>
```

:::warning 注意
一定紧跟在 `body` 标签之后，否则会出现闪烁
:::

### JS

然后随便找个 JS 把下面代码加进去，直接加到 `</body>` 之前也行

```js
//点击事件
function switchDarkMode() {
  if ($('body').hasClass('dark')) {
    $("#dark").html("🌞");
    document.body.classList.remove('dark');
    localStorage.setItem('noDark', '1');
    localStorage.setItem('dark', '0');
  } else {
    $("#dark").html("🌙");
    document.body.classList.add('dark');
    localStorage.setItem('dark', '1');
    localStorage.setItem('noDark', '0');
  }
}
```

### CSS

在自定义 CSS 中加入代码

:::tip
可以用 `stylus`，能少些写
但是引入时记得后缀还是 `.css` 不要变
:::

下面是我的样式代码，基本覆盖所有内容，根据自身情况修改

```stylus
/* 切换按钮 */
#dark
  cursor pointer
  position fixed
  right 40px
  bottom 98px
  width 16px
  height 14px
  z-index 100
  font-size 20px

/*暗黑模式*/
.dark

  /* 主体 */
  #board
    background-color #282c34
    color #a09c9c
  
  img  
    filter brightness(50%)

  p
  .index-info a  
    color #a09c9c !important

  .markdown-body
    h1,h2,h3,h4,h5,h6,s,li  
      color:#a09c9c !important

  /* 顶栏 */
  .navbar-col-show
  .top-nav-collapse  
    background-color #282c34

  .navbar a
    color #a09c9c !important

  .animated-icon span   /* 手机端 */
    background-color #a09c9c


  /* page-number */
  .pagination a:hover
  .pagination .current  
    background-color #6b6b6b73;


  /* 打字机 */
  #subtitle
  .dark.typed-cursor--blink
  .scroll-down-arrow
    color #dfdfdf


  /* back to top */
  #scroll-top-button
    background-color #282c34

    i
      color #a09c9c


  /* Toc */
  .tocbot-list a
    color #a09c9c

  .tocbot-active-link
  footer a:hover
    color #1abc9c !important


  /* footer */
  footer
  footer a
    color #a09c9c


  /* 归档页 */
  .list-group-item
    color #a09c9c
    background-color #282c34

  .list-group-item:hover
  .tagcloud a:hover
    background-color #46484d


  /* 友链页 */
  .links
    .card  
      background-color #282c34

    .card-body:hover  
      background-color #46484d

    .link-title
    .link-intro  
      color #a09c9c


  /* note标签 可能这配色有点丑 */
  .note-info
    background-color #3b5359
    border-color #006d80

  .note-danger
    background-color #783f42
    border-color #670009

  .note-success
    background-color #2a3e2e
    border-color #005915

  .note-warning
    background-color #5b543e
    border-color #846500

  .note-primary
    background-color #455a6f
    border-color #004188
```

### localStorage 还是 sessionStorage

仔细观察刚刚的 js 代码，在其中用的是 localStorage
除了 localStorage，你还可以用 sessionStorage
两者的区别也非常简单

> localStorage：除非被手动清除，否则将会永久保存。
> sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

举个简单例子，如果现在是白天（即没有触发夜间自动开启暗黑模式）
你手动点击切换成了暗黑模式，当你关闭当前网页再次进入时
如果你用的是 localStorage，那么此时就还是暗黑模式
而如果你用的是 sessionStorage，此时就不是暗黑模式了

两者的使用方法相同
直接替换就可以了

:::caution [track13](https://crosschannel.cc) 指出
sessionStorage 在手机浏览器上问题很多，不推荐使用
:::

下面是支持该特性的最低版本
![支持情况](https://rmt.dogedoge.com/fetch/royce/storage/hexo-dark-mode/01.png?fmt=webp)

可以在浏览器控制台中查看他们的值
![查看](https://rmt.dogedoge.com/fetch/royce/storage/hexo-dark-mode/02.png?fmt=webp)

---

### 参考

1. [面向小白的Hexo添加暗色模式教程 | 宅日记](https://crosschannel.cc/daily/hexo%E6%B7%BB%E5%8A%A0%E6%9A%97%E8%89%B2%E6%A8%A1%E5%BC%8F.html)
