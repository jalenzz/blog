---
title: Hexo Valine评论之微信+邮件提醒
date: 2020-02-20 14:42:29
abbrlink: 22549
tag: [Hexo, 教程]
index_img: https://gitee.com/Royce2003/blogimages/raw/master/img/6MD8RFDM3WIAKOP.png
top: 8
---
![](https://i.loli.net/2020/02/26/CUA1Ve4gOPRW83v.png)
该功能基于 Leancloud 的云引擎与云函数。
可以提供邮件 通知站长 和 被@ 通知 的功能还支持自定义邮件模板哦!

项目来自 [查看链接](http://www.zhaojun.im/)
不过我个人觉得作者的教程有一点点难看懂（可能我个人的原因）

那就自己再写一篇呗

首先你需要一个可以正常使用Valine的博客

# 邮件提醒

[Valine官方文档](https://valine.js.org/)

首先进入LeanCloud

华东节点的从这里进 [查看链接](https://tab.leancloud.cn/applist.html#/apps)

华北节点从这里 [查看链接](https://leancloud.cn/dashboard/login.html#/apps)

## 修改代码库
然后进入放评论数据的那个应用，云引擎-->设置-->修改代码库为
` https://github.com/zhaojun1998/Valine-Admin`

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_9a4e1173_8875_288@1920x1077.jpeg.m.jpg)

进入部署界面，选择Git源码部署，

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_6d6882b2_8875_2882@1920x588.jpeg.m.jpg)

修改 分支或版本号为master

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_2fcac2c1_8875_2884@980x480.jpeg.m.jpg)

下载最新依赖是升级用的
然后点击部署
过程会比较漫长，耐心等待当看到完成之类的字眼就好啦图片我下了个最新依赖花了我4分钟.....

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_539f6cae_8875_2886@748x523.jpeg.m.jpg)

## 配置环境变量
接下来就需要配置环境变量了

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_f73f537d_8875_2888@1920x1077.jpeg.m.jpg)

`SITE_NAME` : 网站名称  
`SITE_URL` : 网站地址, 最后不要加 / SMTP_SERVICE : 邮件服务提供商，不如QQ，163...  
`SMTP_USER` : SMTP 服务用户名，邮箱地址  
`SMTP_PASS` : SMTP 密码，不是登录密码哦，是授权码，就是超级超级坑，需要你花钱发短信才能获得的授权码!  
`SENDER_NAME` : 寄件人名称  
`TEMPLATE_NAME`：邮件的样式，可以不写这行就按默认，除了默认还有另一个样式rainbow  
（我没提到但图片里有的环境变量先不管他）  
支持的邮件服务商：  "126""163""1und1""AOL""DebugMail""DynectEmail""FastMail""GandiMail""Gmail""Godaddy""GodaddyAsia""GodaddyEurope""hot.ee""Hotmail""iCloud""mail.ee""Mail.ru""Maildev""Mailgun""Mailjet""Mailosaur""Mandrill""Naver""OpenMailBox""Outlook365""Postmark""QQ""QQex""SendCloud""SendGrid""SendinBlue""SendPulse""SES""SES-US-EAST-1""SES-US-WEST-2""SES-EU-WEST-1""Sparkpost""Yahoo""Yandex""Zoho""qiye.aliyun"就这么多啦

<div class="note note-danger>
每次配置完环境变量需要重启容器！！！！!
</div>

好啦，至此已经完成了邮件提醒!


## 防止休眠
不过还有个小问题LeanCloud也是要恰饭的，当然不可能给你免费提供给这么好的服务!

免费版的 LeanCloud 容器，是有强制性休眠策略的，不能 24 小时运行
每天必须休眠 6 个小时

30 分钟内没有外部请求就会休眠

休眠后如果有新的外部请求才启动但是启动的第一份邮件会发送失败

如果您不缺钱请直接购买付费容器并跳过这段

正是因为大家都缺钱所以我们需要利用LeanCloud的云函数进行唤醒

既然必须休眠6个小时，那就让他休眠呗，总不可能你博客24小时都有人评论

首先我们需要再添加一个环境变量`ADMIN_URL` 然后把下方Web主机域名给填写上

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_29fdfec6_8875_289@1093x472.jpeg.m.jpg)

然后点击定时任务-->创建定时任务

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_13b6e405_8875_2892@1920x1077.jpeg.m.jpg)

名字随便取
选择生产环境下的`self_wake`
然后cron表达式输入
`0 */20 7-23 * * ?`
意思是8点到23点每20分钟唤醒一次
这是我的表达式
大家可以按自己需求改只需要保证6小时的休眠就好啦
然后如果出问题了可以去应用日志里查看以下，发到评论区，如果我能解决的话

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_6f33090a_8875_2894@1920x1077.jpeg.m.jpg)

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_3b9b9eb2_8880_424@1243x483.jpeg.m.jpg)

当有人评论时，应用日志里也会显示  

## 评论管理
然后还记得刚刚的Web主机域名，你也可以绑定自己的域名  
通过访问该地址你就可以管理评论啦  
但当你打开网址时会叫你登录  
这时候你需要去创建个用户，也就是你自己  
只需要填写密码，username，邮箱

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_0569b226_8880_4242@1920x1077.jpeg.m.jpg)

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_7fa85424_8880_4244@893x714.jpeg.m.jpg)

注意！！！邮箱才是是你的登录名！！！!  
不懂这是什么逻辑


# 微信提醒
好啦，接下来时加如微信提醒了
首先进入Server酱官网注册个账号然后按官网首页绑定微信

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_8f323549_8880_4246@1920x1077.jpeg.m.jpg)

第三步时测试绑定有没有成功

## 更改代码库
然后还记得更改的代码仓库吗，将他改成这个
`https://github.com/sviptzk/Valine-Admin-Server` 点击保存

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_ab6e6496_8880_4248@903x237.jpeg.m.jpg)

## 配置环境变量
然后再添加一个新的环境变量`SCKEY`

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_6e8bec86_8880_425@974x73.jpeg.m.jpg)

`SCKEY`的值从这来

![img](http://image.coolapk.com/feed/2020/0218/20/2335206_f516d74c_8880_4252@1920x1077.jpeg.m.jpg)

<div class="note note-danger>
然后一定记得要进行重新部署，重启容器！！！！
</div>

好啦！！大功告成，你可以在微信收到博客的评论啦！！

最后，前半段是我自己写的啦，后面加微信提醒参考 [小康大佬](www.antmoe.com) 他的博客链接  
后面用的那个代码仓库也是他的啦
虽说只是在原项目上二次开发，但就是大佬! [大佬文章链接](https://www.antmoe.com/posts/2380732b/index.html)