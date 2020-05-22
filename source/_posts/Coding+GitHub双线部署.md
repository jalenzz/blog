---
title: Coding+GitHub 双线部署
date: 2020-02-27 16:32:48
tags: [Hexo, 教程]
abbrlink: 13128
index_img: https://cos.royce2003.top/13128/index_img.webp-cover
---

哪个孩子不想要一个流畅的博客
奈何 github 一直处于半墙状态，访问速度贼慢
所以我们可以选择境内访问走 coding（国内的平台），境外访问走 github
<!--more-->
网上关于博客双线部署的教程挺多的，但是今年 coding 更新了，界面改变比较大，并没有关于新版的教程，于是乎


你需要有自己的域名，挺便宜的，算下来一天好像一分钱不到
可以不备案，也就不需要买服务器的钱啦
如果没域名单纯部署到 coding 上不建议，因为coding改版之后，给的域名不想 github 那样是
`你的用户名.github.io`
变成的一堆乱七八糟的东西，就像这样

![](https://cos.royce2003.top/13128/01.webp-default)

那为什么选择 coding+github 而不是 gitee+github 呢
还不是因为没钱，gitee 如果想绑定自己域名，第一个月免费，之后就要收费了

### 部署到Coding

首先注册一个账号
注意，改版之后只能注册团队，不能单独注册个人，官网 [查看链接](https://coding.net/)

![](https://cos.royce2003.top/13128/02.webp-default)

注册

注册之后登录，在右上角创建项目

![](https://cos.royce2003.top/13128/03.webp-default)

创建项目

选择代码托管项目

![](https://cos.royce2003.top/13128/04.webp-default)

代码托管

然后按照下图填写，项目名称建议像 github 一样强制和用户名一样然后再加 `coding.me`，项目标识没什么关系

![](https://cos.royce2003.top/13128/05.webp-default)

创建

创建完成之后发现并没有静态网页，实际上是被 coding 默认关闭了，我们需要在左下角的设置中开启

![](https://cos.royce2003.top/13128/06.webp-default)

设置

![](https://cos.royce2003.top/13128/07.webp-default)

开启

这个时候再返回来就可以看到有个构建与部署，静态网页就在这里面，点击创建

![](https://cos.royce2003.top/13128/08.webp-default)

静态网页

按照下图填写，记得勾选自动部署，要不然隔壁 gitee 收费而 coding 免费给你用的被你浪费了

![](https://cos.royce2003.top/13128/09.webp-default)

建立

图中框起来的就是你的博客地址

![](https://cos.royce2003.top/13128/10.webp-default)

博客地址

接下来我们要添加 SSH公钥
在改目录下找到公钥，和你部署 github 的那个一样

![](https://cos.royce2003.top/13128/11.webp-default)

记事本打开，复制，添加到 oding 中
在个人设置里找到 ssh公钥

![](https://cos.royce2003.top/13128/12.webp-default)

公钥

添加
记得勾选永久有效

![](https://cos.royce2003.top/13128/13.webp-default)

添加

添加完成后可在 git bash 中输入如下代码，检查是否添加成功
`ssh -T git@e.coding.net`
如果添加成功会显示如下信息

![](https://cos.royce2003.top/13128/14.webp-default)

成功

### 修改解析记录

接着就要开始搞域名解析了，首先进入你买域名的平台，这里演示的是腾讯云
进入控制台-->域名管理
然后点击解析

![](https://cos.royce2003.top/13128/15.webp-default)

{% note danger %}
注意！先进行 coding 解析并申请证书开启强制 HTTPS，证书成功申请之后再进行 github 解析！
{% endnote %}

#### coding 的解析记录

首先我们添加 coding 的解析记录
主机记录选 www
记录类型选 CNAME
此时我们的线路类型应该选择境内，因为我们的初衷就是为了加快国内访问速度
国内肯定走 coding
记录值填写 coding 给你的域名
TTL 是每次修改记录生效的时间，时间越短当然生效越快，但是时间短了会影响解析速度，根据自己需求决定。
然后保存

![](https://cos.royce2003.top/13128/16.webp-default)

接下来在添加一条主机记录为 @ 的记录
记录类型选择 A
记录值填域名的 ipv4 地址
打开 cmd
输入
ping 你的域名
注意，你的域名不能加 `https://` 或者 `http://`
接着，方括号中就是我们需要的值

![](https://cos.royce2003.top/13128/17.webp-default)

![](https://cos.royce2003.top/13128/18.webp-default)

然后进入 coding 刚刚放博客的仓库，点击
右上角设置

![](https://cos.royce2003.top/13128/19.webp-default)

向下滑找到自定义域名，讲自己的域名填进去，可以开启强制 HTTPS，然后绑定

![](https://cos.royce2003.top/13128/20.webp-default)

绑定成功会显示在这里，可以选择再绑定一个 www 多跳转至首选

![](https://cos.royce2003.top/13128/21.webp-default)

#### GitHub的解析记录

接着我们添加 github 的解析
主机记录选 www
记录类型选 CNAME
线路选境外，也就是说，如果境外访问你的博客会走 github
记录值填写 github 给你的博客地址
`仓库名.github.io`

![](https://cos.royce2003.top/13128/22.webp-default)

添加第二条解析记录
主机记录选 @
记录类型 A
线路境外
记录值和之前相同方法通过 cmd 获取
然后保存

![](https://cos.royce2003.top/13128/23.webp-default)

解析记录填写完了，我们就需要到 github 上设置下
进入你存放博客的仓库，点击 settings

![](https://cos.royce2003.top/13128/24.webp-default)

settings

然后向下滑找到 GitHub Pages
填入自己的域名，点击 save，可以选择强制 HTTPS，当保存玩看到上面出现一栏绿绿的东西，然后还有你的域名就说明成功了

![](https://cos.royce2003.top/13128/25.webp-default)

此时 github 的域名绑定已经完成

如果coding证书申请失败，访问网站提示不安全

{% note info %}
方法1 暂停关于 github 的两条解析并关闭 github 上的强制 https 再申请
方法2 可能是你的解析记录填写错误，按照教程重新填写
{% endnote %}

接着进入站点根目录的配置文件
修改 deploy

![](https://cos.royce2003.top/13128/26.webp-default)

将 royce2003 改成你自己的用户名

然后三连
`hexo clean && hexo g && hexo d`
如果部署成功，在 coding上 是可以看到的

![](https://cos.royce2003.top/13128/27.webp-default)

### 坑

好啦
双线部署教程结束
接下来说几个坑,好像只有一个
填解析记录的时候那个 TTL 我个人建议千万千万不要选久的
时间长虽然解析快，但是我们用的是 coding，众所周知
coding 日常会宕机，那时候你的博客就访问不了了
此时你可以去把 coding 的两条解析暂停，github 的那两个解析的线路类型改成默认
这样你接下里访问就不会走 coding 而是从 github了，但是你 TTL 万一设个 3600 秒，你这一小时内博客就都不能访问了
不过我们这种小网站好像没啥太大影响