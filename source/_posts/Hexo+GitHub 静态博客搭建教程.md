---
title: Hexo+GitHub 静态博客搭建教程
tags: [Hexo, 教程]
mathjax: false
abbrlink: d5003dee
date: 2020-02-12 12:16:55
index_img: https://i.loli.net/2020/02/12/kPWqXHzFxO7Tgvh.jpg
---
![](https://i.loli.net/2020/02/12/kPWqXHzFxO7Tgvh.jpg)

# 前言

2019 年 11 月 CSP Day1 当晚，发现身边大佬都在写游记，我也因此心血来潮，咕咕咕，几天之后我才开始写。同时又碰巧学长退役，看见了巨佬的博客，我的天哪，这完善程度，这流畅度，这内容的深度 emmm 不愧是巨佬，厚着脸皮求教程，要来一个链接，在教程的帮助下，折腾了好久终于有了自己的博客。现在距离建站已经过去了差不多 3,4 个月，博客越来越完善了 ~~(就差内容了)~~<!--more-->

故写下此教程，记录搭建过程和自己踩过的坑

# 介绍
[Hexo](https://hexo.io/zh-cn/)是一款基于 Node.js 的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在 GitHub 或 Coding 上，是搭建博客的首选框架。这里我们选用的是 [GitHub](https://github.com/)，你没看错，~~全球最大的同性恋交友网站~~。Hexo 同时也是 GitHub 上的开源项目，参见： [hexojs/hexo](https://github.com/hexojs/hexo) 如果想要更加全面的了解 Hexo，可以到其官网 [Hexo](https://hexo.io/zh-cn/) 了解更多的细节，因为 Hexo 的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。

前面说过 Hexo 是一个静态博客框架，基于 Node.js，它将 Markdown 文章通过渲染引擎，在几秒内，即可利用靓丽的主题生成静态网页，再结合 Git 命令进行部署。这使其成为一个快速、简洁且高效的博客框架。

 ~~(前面都在扯淡)~~

这是我的个人博客效果: [Royce](https://royce2003.github.io)

# 搭建

## 在Github创建仓库
登录 [GitHub](https://github.com/)，如果没有 GitHub 帐号，使用你的邮箱注册注册

点击 GitHub 中的右上角的 + 创建新仓库（new repository），仓库名应该为：yourname.github.io 这里的 yourname 使用你的 GitHub 帐号名称代替，这是固定写法 __（文章接下来出现的yourname皆为你的GitHub账号名）__
![Snipaste_2020-02-12_13-31-25.png](https://i.loli.net/2020/02/12/d9Ua8O1yk2AfelX.png)

## 安装所需软件并连接 GitHub
### 安装 Git
![Git](https://www.runoob.com/wp-content/uploads/2015/02/f7246b600c338744a9591cd7530fd9f9d62aa0f8.png)

Git 是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

在 [官网](https://git-scm.com/)下载安装，安装时一路继续就好了。

安装完成后在命令行内输入 `git` 查看是否成功
若提示 `‘git’是内部或外部命令，也不是可运行的程序或批处理文件。` 就说明失败了。

### 安装Node.js
Hexo 基于 Node.js，Node 官网地址：[Download](https://nodejs.org/zh-cn/) 在官网下载安装包，注意安装 Node.js 会包含环境变量及 npm 的安装  
安装后检测 Node.js 和 npm 是否安装成功，在命令行中输入 `node -v` 和 `npm -v`:
（显示版本号即安装成功）  
![Snipaste_02-12_14-19-06.png](https://i.loli.net/2020/02/12/DPsrECaUHhL6elb.png)

## 连接GitHub
成功安装后在桌面右键点击 `Git Bash Here`  
![Snipaste_2020-02-12_14-09-11.png](https://i.loli.net/2020/02/12/E5D8AtoN7FYVTkm.png)

设置user.name和user.email配置信息，
在弹出界面中输入以下内容
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"
```
然后创建 `SSH`
```bash
ssh-keygen -t rsa -C "你的GitHub注册邮箱"
```
然后直接三个回车即可，即不设置密码

然后在 `C:\Users\Username\.ssh` 路径下找到名为 `id_rsa.pub` 的文件，就是你刚刚创建的密钥，右键用记事本打开然后复制全部内容

然后进入 GitHub 添加密钥
![Snipaste_2020-02-12_14-30-04.png](https://i.loli.net/2020/02/12/vF19hOiTDaEGdWL.png)
将复制的内容粘贴至 Key 中，title 随便填然后点击 `Add SSH key`
![Snipaste_02-12_14-31-56.png](https://i.loli.net/2020/02/12/lFQmqtGL51CzrT6.png)
在 Git Bash 中检测 GitHub 公钥设置是否成功
```bash
ssh -T git@github.com
```
当出现 `Hi,yourname! You've successfully......` 则已经成功
这里之所以设置 GitHub 密钥原因是，通过非对称加密的公钥与私钥来完成加密，公钥放置在 GitHub 上，私钥放置在自己的电脑里。GitHub 要求每次推送代码都是合法用户，所以每次推送都需要输入账号密码验证推送用户是否是合法用户，为了 __省去每次输入密码的步骤__ ，采用了 ssh，当你推送的时候，git 就会匹配你的私钥跟 GitHub 上面的公钥是否是配对的，若是匹配就认为你是合法用户，则允许推送。这样可以保证每次的推送都是正确合法的。

## 安装Hexo
Hexo 就是我们的个人博客网站的框架，我们需要在电脑里创建一个文件夹（称之为博客根目录），用来存放 Hexo 的相关文件以及博客文章，文件夹名字随意（建议不要出现中文），我文件夹名字为 `Hexo-Blog`。创建好后，__进入文件夹中__，右键进入 `Git Bash Here`

（注意，之后有关操作都需要在博客根目录进入 `Git Bash Here`）

输入以下内容
```
npm install -g hexo-cli
```

## 初始化博客：
```
hexo init
```

文件夹中大致如下
```
Hexo-Bolg
|----node_modules
|----public
|----scaffolds
|---- source
    |---- _post
|---- themes
|---- _config.yaml
```
1. `node_modules` 是 `node.js` 各种库的目录，
2. `public` 是生成的网页文件目录（一开始可能没有）
3. `scaffolds` 里面就三个文件，存储着新文章和新页面的初始设置
4. `source` 是我们最常用到的一个目录，里面存放着文章、各类页面、图像等文件
5. `themes` 存放着主题文件
6. `_config.yaml` 站点配置文件

## 本地预览
按顺序输入以下命令：
```
hexo generate
hexo server
```
Hexo命令后面会作介绍，完成后，会看到
```
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```
Hexo 正在 http://localhost:4000 运行，按 Ctrl+C 可停止

可以按住 Ctrl 用鼠标直接点链接，也可以在浏览器输入 http://localhost:4000 就可以看到你生成的博客了
![Snipaste_02-12_15-27-32.png](https://i.loli.net/2020/02/12/rZVgGTtFyXUEs43.png)
但是目前只能本地预览，所以还需部署到 GitHub

## 将hexo部署到GitHub
我们需要将 hexo 和 GitHub 关联起来，也就是将 hexo 生成的文章部署到 GitHub 上，打开站点配置文件 _config.yml（博客根目录中），划到最后,将 deploy 中的内容修改成下面的样子（yourname改成你GitHub的用户名）
```
deploy:
  type: git
  repo: git@github.com:Royce2019/Royce2019.github.io.git
  branch: master
```
然后我们还需要安装部署所需插件 `deploy-git`
```
npm install hexo-deployer-git --save
```
然后按顺序输入以下命令
```
hexo clean
hexo generate
hexo deploy
```
全部完成后访问，恭喜，你的博客已经搭建完成，当然，只是一个雏形

博客地址： http://yourname.github.io

## Hexo命令
下面会介绍常用的Hexo命令（若有`==>`则右边为简写）
1. npm install hexo -g # 安装 Hexo
2. npm update hexo -g  # 升级
3. hexo init # 初始化博客
4. hexo new "mypost" ==> hexo n "mypost"   # 新建文章（在 `/source/_posts` 文件夹中创建 `mypost.md` 文件）
5. hexo generate ==> hexo g # 生成页面(页面在 public 文件夹中)
6. hexo server ==> hexo s # 本地预览
7. hexo deploy ==> hexo d # 部署
8. hexo clean # 清除缓存
9. hexo server # Hexo 会监视文件变动并自动更新，无须重启服务器
10. hexo server -s # 静态模式
11. hexo server -p 5000 # 更改端口
12. hexo server -i 192.168.1.1 # 自定义 IP

配置修改后需 `hexo g` 重新生成界面，`hexo s` 本地预览过程中若对某些配置文件（好像主题配置文件可以）修改，可直接刷新本地预览页面，按 Ctrl+C 可停止本地预览

命令之间可用 `&&` 相连接
如 `hexo g && hexo s` 和 `hexo g && hexo d` 等等
当然 对于上面两种常用的命令，hexo提供了简写 `hexo s -g`（生成界面并本地预览） 和 `hexo g -d`（生成界面并部署）

对博客修改之后只有进行了部署才会发布到网上

## 完善配置文件 `_config.yaml`
只提供主要配置的中文
按 `Ctrl+F` 可进行搜索
(#后为注释)

首先修改网站基本信息
```yaml
# Site
title:          # 网站标题
subtitle: ''
description:    # 网站描述
keywords:       # 网站关键词
author:         # 博客作者名字
language: zh-CN # 语言
timezone: ''
```
将链接改为你博客域名（yourname.github.io）
```yaml
url: http://yoursite.com
```
你博客文章的地址，默认为 yourname.github.io/year/mouth/day/title
，可自行修改  
例如你的一篇文章叫 post，如果按照默认设置则文章地址是 xxxxxxx/2020/02/10/post  
如果是我图片上的设置则地址是 xxxxxxx/2020/post
```yaml
permalink: :year/:month/:day/:title/
```
每页的文章数量
```yaml
per_page: 10
```
你选择的主题，默认即为`landscape`，接下来会介绍
```yaml
theme: landscape
```

## 文章编写
### 初识Markdown
Hexo 文章使用 markdown 语法
> Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。
>
> Markdown具有一系列衍生版本，用于扩展Markdown的功能（如表格、脚注、内嵌HTML等等），这些功能原初的Markdown尚不具备，它们能让Markdown转换成更多的格式，例如LaTeX，Docbook。Markdown增强版中比较有名的有Markdown Extra、MultiMarkdown、 Maruku等。这些衍生版本要么基于工具，如Pandoc；要么基于网站，如GitHub和Wikipedia，在语法上基本兼容，但在一些语法和渲染效果上有改动。
>
> Markdown的语法简洁明了、学习容易，而且功能比纯文本更强，因此有很多人用它写博客。世界上最流行的博客平台WordPress和大型CMS如Joomla、Drupal都能很好的支持Markdown。

推荐一个Markdown教程：[教程](https://segmentfault.com/markdown)

初始化的时候，已经自动帮我们创建了一个名为 `hello-world.md` 的文件 `.md` 即为markdown文章的后缀名
```markdown
---
title: Hello World
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).
............
............
```
两个 `---` 中间的部分我们称之为 `Front-matter` ，即文章的属性，该部分来自 `\scaffolds\post.md` ,这个md文件中放着一份模板，之后用 `hexo n “xxx”` 命令新建的文件的 `Front-matter` 都来自这，我们可以自己修改该文件。  

title 标题，date 建立日期，updated 更新日期，tags 标签，categories 分类 

除了使用命令新建文章还可以自己在 `_post` 文件夹中创建 `.md` 文件，需要注意的是，使用命令创建的文章会自动帮我们写好 `Front-matter`，而手动创建的需要我们自己写。

### 图床
图床一般是指储存图片的服务器，就是专门用来存放图片，同时允许你把图片对外连接的网上空间，不少图床都是免费的。
就是将图片传到网站上，然后在写文章时通过该网站提供的图片链接插入图片，markdown 教程中应该会提到

## 主题
可访问 [hexo主题商店](https://hexo.io/themes/)挑选喜欢的主题
，接下来的演示采用 [NexT主题](https://github.com/theme-next/hexo-theme-next)

### 安装主题
不同主题不同方式，可以查看对应主题网站
```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```
此时 `/themes` 下多了一个 `next` 文件夹，该文件夹内存放该主题文件
你会发现文件夹中也有一个 `_config.yaml` ，我们称之为 `主题配置文件` 。另一个是 `站点配置文件` 。这个 `主题配置文件` 以后再讲  
安装完成之后在 `站点配置文件` 中更改主题即可


# 结束
至此博客已经基本搭建完成，关于主题配置的详细内容下篇文章再写。  
接下来还会写 绑定自已域名，Github+Coding 国内外双线部署，主题美化，网站SEO，搭建自己的图床等内容，虽然很多我自己带还没搞，不过已经在计划之中了，希望不要咕咕咕咕咕咕咕

---
[参考文章](https://zhuanlan.zhihu.com/p/80140564)