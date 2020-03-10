---
title: Coding+GitHub双线部署
date: 2020-02-27 16:32:48
tags: [Hexo, 教程]
abbrlink: 13128
index_img: https://gitee.com/Royce2003/blogimages/raw/master/img/v2-3c4c11c13be108a27febe713.jpg
top: 10
---

![](https://gitee.com/Royce2003/blogimages/raw/master/img/v2-3c4c11c13be108a27febe713.jpg)




哪个孩子不想要一个流畅的博客
奈何github一直处于半墙状态，访问速度贼慢
所以我们可以选择境内访问走coding（国内的平台），境外访问走github

网上关于博客双线部署的教程挺多的，但是今年coding更新了，界面改变比较大，并没有关于新版的教程，于是乎


你需要有自己的域名，挺便宜的，算下来一天好像一分钱不到
可以不备案，也就不需要买服务器的钱啦
如果没域名单纯部署到coding上不建议，因为coding改版之后，给的域名不想github那样是
你的用户名.github.io
变成的一堆乱七八糟的东西，就像这样

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_530cb420_5772_4084@304x30.jpeg.m.jpg)




那为什么选择coding+github而不是gitee+github呢
还不是因为没钱，gitee如果想绑定自己域名，第一个月免费，之后就要收费了


# 部署到Coding
首先注册一个账号
注意，改版之后只能注册团队，不能单独注册个人，官网 [查看链接](https://coding.net/)

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_35bbac80_5772_4085@1920x1077.jpeg.m.jpg)


注册

注册之后登录，在右上角创建项目

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_f1bdf18f_5772_4087@1920x1077.jpeg.m.jpg)


创建项目

选择代码托管项目

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_ec90b2aa_5772_4089@1920x1077.jpeg.m.jpg)


代码托管

然后按照下图填写，项目名称建议像github一样强制和用户名一样然后再加coding.me，项目标识没什么关系

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_6f8b3c74_5772_4091@1920x1077.jpeg.m.jpg)

创建

创建完成之后发现并没有静态网页，实际上是被coding默认关闭了，我们需要在左下角的设置中开启

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_ea65a646_5772_4093@1920x1077.jpeg.m.jpg)

设置

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_4b8585bf_5772_4095@1920x1077.jpeg.m.jpg)

开启

这个时候再返回来就可以看到有个构建与部署，静态网页就在这里面，点击创建

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_bcb3f43c_5772_4097@1920x1077.jpeg.m.jpg)

静态网页

按照下图填写，记得勾选自动部署，要不然隔壁gitee收费而coding免费给你用的被你浪费了

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_7f310dfc_5776_5669@1920x1077.jpeg.m.jpg)

建立

图中框起来的就是你的博客地址

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_edea9a87_5776_5671@1920x1077.jpeg.m.jpg)

博客地址

接下来我们要添加SSH公钥
在改目录下找到公钥，和你部署github的那个一样

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_0be50525_5776_5673@629x235.jpeg.m.jpg)

记事本打开，复制，添加到coding中
在个人设置里找到ssh公钥

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_d4b6c372_5776_5675@1920x1077.jpeg.m.jpg)

公钥

添加
记得勾选永久有效

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_4a323156_5776_5677@1920x1077.jpeg.m.jpg)

添加

添加完成后可在git bash中输入如下代码，检查是否添加成功
ssh -T git@e.coding.net
如果添加成功会显示如下信息

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_cfd8654c_5776_5679@723x111.jpeg.m.jpg)

成功

# 修改解析记录
接着就要开始搞域名解析了，首先进入你买域名的平台，这里演示的是腾讯云
进入控制台-->域名管理
然后点击解析

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_5e18ba18_5776_568@1920x1077.jpeg.m.jpg)


<strong class="note note-danger">注意！！！先进行coding解析并申请证书开启强制HTTPS，证书成功申请之后再进行github解析！！！！！</strong>

## coding的解析记录
首先我们添加coding的解析记录
主机记录选 www
记录类型选CNAME
此时我们的线路类型应该选择境内，因为我们的初衷就是为了加快国内访问速度
国内肯定走coding
记录值填写coding给你的域名
TTL是每次修改记录生效的时间，时间越短当然生效越快，但是时间短了会影响解析速度，根据自己需求决定。
然后保存
![](https://cdn.jsdelivr.net/gh/Royce2019/img/img/Snipaste_03-10_17-59-23.png)


接下来在添加一条主机记录为 @ 的记录
记录类型选择A
记录值填域名的ipv4地址
打开cmd
输入
ping 你的域名
注意，你的域名不能加 https:// 或者 http://
接着，方括号中就是我们需要的值
![](https://cdn.jsdelivr.net/gh/Royce2019/img/img/Snipaste_03-10_17-51-58.png)

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_7a0b5def_5779_3442@1606x198.jpeg.m.jpg)



然后进入coding刚刚放博客的仓库，点击
右上角设置

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_00ee012c_5779_3444@1920x1077.jpeg.m.jpg)

向下滑找到自定义域名，讲自己的域名填进去，可以开启强制HTTPS，然后绑定

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_315c4b71_5779_3445@1920x1077.jpeg.m.jpg)

绑定成功会显示在这里，可以选择再绑定一个www多跳转至首选

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_2e3aa0ed_5779_3447@1409x201.jpeg.m.jpg)

## GitHub的解析记录
接着我们添加github的解析
主机记录选 www
记录类型选CNAME
线路选境外，也就是说，如果境外访问你的博客会走github
记录值填写github给你的博客地址
仓库名.github.io

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_1c42ff40_5776_5682@1609x249.jpeg.m.jpg)


添加第二条解析记录
主机记录选 @
记录类型 A
线路境外
记录值和之前相同方法通过cmd获取
然后保存

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_89d396bf_5779_3436@1613x703.jpeg.m.jpg)

解析记录填写完了，我们就需要到github上设置下
进入你存放博客的仓库，点击settings

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_62c82d27_5779_3438@1920x1077.jpeg.m.jpg)

settings

然后向下滑找到GitHub Pages
填入自己的域名，点击save，可以选择强制HTTPS，当保存玩看到上面出现一栏绿绿的东西，然后还有你的域名就说明成功了
![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_da1da6ef_5779_344@1051x791.jpeg.m.jpg)

此时github的域名绑定已经完成

如果coding证书申请失败，访问网站提示不安全
<p class="note note-danger">方法1 暂停关于github的两条解析并关闭github上的强制https再申请</p>
<p class="note note-danger">方法2 可能是你的解析记录填写错误，按照教程重新填写</p>

接着进入站点根目录的配置文件
修改deploy

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_9b30b1a9_5779_3449@656x165.jpeg.m.jpg)

将royce2003改成你自己的用户名

然后三连
hexo clean && hexo g && hexo d
如果部署成功，在coding上是可以看到的

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_f584ac38_5779_3451@1920x1077.jpeg.m.jpg)

# 坑
好啦
双线部署教程结束
接下来说几个坑,好像只有一个
填解析记录的时候那个TTL我个人建议千万千万不要选久的
时间长虽然解析快，但是我们用的是coding，众所周知
coding日常会宕机，那时候你的博客就访问不了了
此时你可以去把coding的两条解析暂停，github的那两个解析的线路类型改成默认
这样你接下里访问就不会走coding而是从github了，但是你TTL万一设个3600秒，你这一小时内博客就都不能访问了
不过我们这种小网站好像没啥太大影响