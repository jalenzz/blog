---
title: Hexo Fluid 瞎折腾
date: 2020-04-01 12:20:51
tags: [Fluid, Hexo, CSS]
index_img: 
abbrlink: 60394
---

动态背景、滚挡条、动画... 各类折腾

<!--more-->
首先，按照 Fluid 配置文件中的方法，在 `source/css` 下新建 `custom.css` 文件，在其中写入自定义 CSS
```yml
custom_js:   # 指定自定义 js 文件路径，路径是相对 source 目录，如 /js/custom.js
custom_css: /css/custom.css # 指定自定义 css 文件路径，路径是相对 source 目录，如 /css/custom.css
custom_html: ''  # 自定义底部 HTML 内容（位于 footer 上方），也可用于外部引入 js css 这些操作，注意不要和 post.custom 配置冲突
```

### 动态背景
主题本身采用的是头图滚动视差，非常 nice，但我可能更喜欢花里胡哨吧
现在自定义 CSS 中加入如下代码
```css
.slideshow-image {
	position: fixed;
	background-size: cover;
	width: 100%;
	height: 100%;
	background: repeat 50% 50%;
	animation-name: kenburns;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-duration: 24s;
	opacity: 1;
	transform: scale(1.2);
}
.slideshow {
	position: absolute;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.slideshow-image:nth-child(1) {
	-webkit-animation-name: kenburns-1;
	animation-name: kenburns-1;
	z-index: -2;
}
.slideshow-image:nth-child(2) {
	-webkit-animation-name: kenburns-2;
	animation-name: kenburns-2;
	z-index: -3;
}
.slideshow-image:nth-child(3) {
	-webkit-animation-name: kenburns-3;
	animation-name: kenburns-3;
	z-index: -4;
}
.slideshow-image:nth-child(4) {
	-webkit-animation-name: kenburns-4;
	animation-name: kenburns-4;
	z-index: -5;
}
@keyframes kenburns-1 {
	0% {
		opacity: 1;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
	1.5625% {
		opacity: 1;
	}

	23.4375% {
		opacity: 1;
	}
	26.5625% {
		opacity: 0;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
	98.4375% {
		opacity: 0;
		-webkit-transform: scale(1.21176);
		transform: scale(1.21176);
	}
	100% {
		opacity: 1;
	}
}
@keyframes kenburns-2 {
	23.4375% {
		opacity: 1;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
	26.5625% {
		opacity: 1;
	}
	48.4375% {
		opacity: 1;
	}
	51.5625% {
		opacity: 0;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
}
@keyframes kenburns-3 {
	48.4375% {
		opacity: 1;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
	51.5625% {
		opacity: 1;
	}
	73.4375% {
		opacity: 1;
	}
	76.5625% {
		opacity: 0;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
}
@keyframes kenburns-4 {
	73.4375% {
		opacity: 1;
		-webkit-transform: scale(1.2);
		transform: scale(1.2);
	}
	76.5625% {
		opacity: 1;
	}
	98.4375% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

.view .mask {
	background-color: rgba(0,0,0,0); /* 去除头图遮罩 */
}
.view .mask:after {
	z-index: -1;
	content: "";
	position: fixed;
	top: 0;	left: 0;
    width: 100%; height: 100%;
	background-color: rgba(0,0,0,.3); /* 添加全屏背景遮罩 */
}
```
接着在 `themes\fluid\layout\layout.ejs` 中 `<body>` 后加入如下代码
`background-image: url` 中填入图片链接
```html
<div class="slideshow">
    <div class="slideshow-image" style="background-image: url('1')"></div>
    <div class="slideshow-image" style="background-image: url('2')"></div>
    <div class="slideshow-image" style="background-image: url('3')"></div>
    <div class="slideshow-image" style="background-image: url('4')"></div>
</div>
```

然后取消原本头图的获取
用最简单的方法，直接删去获取头图的代码，保留标签(代码前面的减号是吧这行删掉的意思，加号同理)
```diff
  <header style="height: <%- banner_img_height %>vh;">
    <%- partial('_partial/nav') %> 
-    <div class="view intro-2" id="background" <%- theme.banner_parallax && 'parallax=true' %>
-      style="background: url('<%- url_for(banner_img) %>') no-repeat center center;
-        background-size: cover;">
+    <div class="view intro-2" id="background">
      <div class="full-bg-img">
        <div class="mask flex-center">
```

如果出现背景跟随滚动，请在配置文件中关闭头图滚动视差
```yml
banner_parallax: false # 头图滚动视差
```

害，原来自己写的方法在第一张图片加载的时候 100% 闪烁，找不到解决办法
上面的 CSS 代码是从网上找来的，稍作修改，适配了下主题，但是这方法也有我没解决的问题
因为是依赖 `z-index` 实现的切换，所以如果当前图片未加载出来会直接显示下一张，不过这个问题不到
还有就是出现了 x 轴滚动条，搞了好久一直弄不好最终无奈只好直接暴力隐藏，将下方代码添加在自定义 CSS 中
```css
body {
	overflow-x: hidden;
}
```
图片尽量小一点，推荐用 webp 格式，同质量的图片体积小很多
可以试试又拍云的转换工具 [地址](https://www.upyun.com/webp)
效果非常明显，我原来的 4 张图加起来 1.6 MB（已经压缩过的了），现在转成 webp 之后 0.4 MB
直接减少了 75% 的体积，画质还不变

### 侧边滚动条
```css
/* 上下箭头按钮 */
::-webkit-scrollbar-button {
    display: none;
}

/* 整个滚动条 */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #2f415452;
}

/* 滚动条上的滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #2f4154;
    background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent);
}
/* 滑块触碰后 */
::-webkit-scrollbar-thumb:hover { 
    background-color: #2f4154b8;
}
```
<p class="note note-info">会同时对所有滚动条生效，包括代码块的横向滚动条</p>

### 返回顶部按钮
增加动画
```css
#scroll-top-button {
    border-radius: 100%;
    transition: all .6s ease;
    -moz-transition: all .6s ease;
    -webkit-transition: all .6s ease;
    -o-transition: all .6s ease;
}
#scroll-top-button:hover {
	transform: scale(1.2);
    border-radius: 20%;
}
```
之前的文章写了个另一种样式 [文章链接](./54321.html)


### 标题前 Emoji
```css
/* 想在手机端也显示请去除最外层的 @media */
@media (min-width:768px) {
    /*修改h1前面图标*/
    .post-content h1:before {
        content: "🌈";
        visibility: visible;
        display: inline;
    }
    /*修改h2前面图标*/
    .post-content h2:before {
        content: "🚀";
        visibility: visible;
        display: inline;
    }
    /*修改h3前面图标*/
    .post-content h3:before {
        content: "🔍";
        visibility: visible;
        display: inline;
    }
}
```

### 首页图片动画
鼠标触碰放大
```css
.index-img {
	transition: .4s;
}
.index-card:hover .index-img {
	transform: scale(1.1);
	box-shadow: 0 5px 11px 0 rgba(0,0,0,0.38), 0 4px 15px 0 rgba(0,0,0,0.35);
}
```

### 底部及 TOC 样式更改
因为之前的动态背景添加了遮罩导致底部链接等看不起
```css
footer, footer a,
#toc, .tocbot-list a {
    color: #ffffff;
}
.tocbot-active-link,
footer a:hover {
  color: #1abc9c !important;
}
```

### 友链界面底部的文字

[效果链接](../links)
文字触碰动画（源网）
```css
/* 注意避免类名相同造成样式冲突 */
.link {
	outline: none;
	text-decoration: none;
	position: relative;
	font-size: 2em;
	color: #9e9ba4;
	display: inline-block;
}
.link--kukuri {
	text-transform: uppercase;
	font-weight: 700;
	overflow: hidden;
	color: #2f4144;
}

.link--kukuri:hover {
	color: #2f4144;
}

.link--kukuri::after {
	content: '';
	position: absolute;
	height: 10px;
	width: 100%;
	top: 42%;
	margin: auto;
	right: 0;
	background: #F9F9F9;
	-webkit-transform: translate3d(-100%,0,0);
	transform: translate3d(-100%,0,0);
	-webkit-transition: -webkit-transform 0.4s;
	transition: transform 0.4s;
	-webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
	transition-timing-function: cubic-bezier(0.7,0,0.3,1);
}

.link--kukuri:hover::after {
	-webkit-transform: translate3d(100%,0,0);
	transform: translate3d(100%,0,0);
}

.link--kukuri::before {
  border:0px solid;
	content: attr(data-letters);
	position: absolute;
	z-index: 2;
	overflow: hidden;
	color: #ff779a;
	white-space: nowrap;
	width: 0%;
	-webkit-transition: width 0.4s 0.3s;
	transition: width 0.4s 0.3s;
}

.link--kukuri:hover::before {
	width: 100%;
}
```

然后在你想显示的地方插入如下 HTML
```html
<a class="link link--kukuri" href="test.test" data-letters="test">test</a>
```
<p class="note note-primary">data-letters 中需要和内容保持一致<br>不用 a 标签也可以，保证类名正确</p>


### 留言板
在 `themes\hexo-theme-fluid-master\layout\` 中新建 `messageboard.ejs` 文件
先写上头图之类的设定
```ejs
<%
page.layout = "messageboard"
page.title = theme.messageboard.title || __('messageboard.title')
page.subtitle = theme.messageboard.subtitle || __('messageboard.subtitle')
page.banner_img = theme.messageboard.banner_img
page.banner_img_height = theme.messageboard.banner_img_height
%>
```

然后在配置文件中加入相应内容，当然，你也可以直接在上面的代码中指定
```yml
#---------------------------
# 留言板页
# Messageboard Page
#---------------------------
messageboard:
  banner_img: 			# 头图
  banner_img_height:  	# available: 0 - 100
  subtitle:  			# 打字机内容
```
语言文件中也是一样的，这里就不写了

#### 引入评论
刚刚创建的 ejs 文件中
```ejs
<!-- Comments -->
<div class="container comments mx-auto" id="comments">
    <% if(theme.post.comments.enable) { %>
    <br><br>
    <% var type = '_partial/comments/' + theme.post.comments.type %>
    <%- partial(type) %>
    <% } %>
</div>
```
自定义内容写在评论代码之前就好了，支持 HTML

然后两种方法开启，二选一即可
#### 1
在根目录的 `source` 文件夹中创建 `messageboard.md` 
并在 `front-matter` 中加上 ``layout: messageboard`
和 about 界面的方法一样

#### 2
在 `themes\fluid\scripts\pages.js` 文件中加入如下代码
```js
// generate messageboard page
hexo.extend.generator.register('_messageboard', function (locals) {
  return {
    path: 'messageboard/index.html',
    data: locals.theme,
    layout: 'messageboard',
  };
});
```

### 最后
没啥可折腾的了，暗黑模式下篇文章再写吧 ~~（水文章数量）~~
作者已经把主题做的非常完美了，有什么问题都会立马修复，功能也出的很快，超 nice
博客刚搭建的时候用了一个 material 主题，觉得过于平淡，换到了一个 gal 主题，功能很多
慢慢的又看厌了，很多人推荐 Next，就又换到了 Next，的确很好用
就光针对 Next 的教程数量而言，应该能算是大部分用 Hexo 的人都用过的
经常逛博客也发现很多都是用的这个主题，用了几个月，改了很多东西，但也慢慢看厌了
就开始再次踏上寻找主题的路，经常看到一个好看的主题，但又想到自己在 Next 上大量的自定义内容，一直不忍心丢下
看到 Fluid 之后甚是喜欢，先用 Fluid 搭建了副站，放在 Gitee 上，慢慢完善
完善到一定程度，发现甚至比主站还好看了（个人认为）
下定决心开始换主题，前前后后花了一个多星期全部完成

Fluid 应该是会一直用下去了
不过仍有继续折腾的打算
可能会再用 Typecho 搭建一个玩玩...

放个折腾合集吧
[面向纯小白的 CSS 教程1](./25976.html)
[面向纯小白的 CSS 教程2](./17142.html)
[Hexo 球形标签云](./db44ecae.html)
[Valine 邮件+微信提醒](./22549.html)