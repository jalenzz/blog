---
title: 解决 Edge Flash 插件不可用的问题
date: 2020-04-02 12:16:49
tags: [教程]
abbrlink: 34979
index_img: https://cos.royce2003.top/34979/index_img.webp
---

虽说 flash 被淘汰是毋庸置疑的趋势，但是还就是有些网站在用
最近学校网课用 ava 直播，这东西还强制电脑端用 flash，手机端 HTML5
我寻思着电脑端也 HTML5 不好吗？
<!--more-->
没办法，然鹅 Edge 却出现了无法使用的问题
要我装 flash 的软件是不可能的，刚装上就开幕雷击
网上搜了很多其他方法，总结下两个方案

### 替换文件

浏览器地址栏输入 `edge://version/` ，chrome 等方法类似，找到 flash 的位置
![](https://cos.royce2003.top/34979/01.webp)
将 `pepflashplayer.dll` 替换下方提供的文件

<a class="BoxButton" href="https://www.lanzous.com/iawvd9a">点我下载</a>
密码: b0fx

### 采用浏览器自带插件

（这个方法我这没用，但有人可以，有点奇怪，推荐方法 1）
同样在浏览器地址栏输入 `edge://version/` ，chrome 等方法类，找到 flash 的位置
将浏览器关闭，删除 `C:\Users\Royce\AppData\Local\Microsoft\Edge Dev\User Data\PepperFlash\` 文件夹
之后据说会调用浏览器自己的

---

文件源自 [吾爱破解](https://www.52pojie.cn/thread-1133261-1-1.html)