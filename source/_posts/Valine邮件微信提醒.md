---
title: Valine评论之微信提醒
date: 2020-02-20 14:42:29
abbrlink: 22549
tag: [Hexo, 教程]
index_img: https://cos.royce2003.top/22549/index_img.webp-cover
---

{% c 该 %}
功能基于 Leancloud 的云引擎与云函数。
可以提供邮件 通知站长 和 被@ 通知 的功能还支持自定义邮件模板哦![^1]

项目来自 [查看链接](http://www.zhaojun.im/)

首先你需要一个可以正常使用 Valine 的博客

## 邮件提醒

[Valine官方文档](https://valine.js.org/)

首先进入 LeanCloud

华东节点的从这里进 [查看链接](https://tab.leancloud.cn/applist.html#/apps)

华北节点从这里 [查看链接](https://leancloud.cn/dashboard/login.html#/apps)

### 修改代码库
然后进入放评论数据的那个应用，云引擎-->设置-->修改代码库为
`https://github.com/zhaojun1998/Valine-Admin`

![](https://cos.royce2003.top/22549/01.webp-default)

进入部署界面，选择 Git 源码部署，

![](https://cos.royce2003.top/22549/02.webp-default)

修改 分支或版本号为 master

![](https://cos.royce2003.top/22549/03.webp-default)

下载最新依赖是升级用的
然后点击部署
过程会比较漫长，耐心等待当看到完成之类的字眼就好啦图片我下了个最新依赖花了我 4 分钟.....

![](https://cos.royce2003.top/22549/04.webp-default)

### 配置环境变量

接下来就需要配置环境变量了
{% note warning %}
环境变量配置图片已更新，请注意 SITE_URL 的值需要带 http(s)，否则邮件无法跳转
{% endnote %}

![](https://cos.royce2003.top/22549/05.webp-default)

`SITE_NAME` : 网站名称  
`SITE_URL` : 网站地址, 最后不要加 / SMTP_SERVICE : 邮件服务提供商，不如QQ，163...  
`SMTP_USER` : SMTP 服务用户名，邮箱地址  
`SMTP_PASS` : SMTP 密码，不是登录密码哦，是授权码，就是超级超级坑，需要你花钱发短信才能获得的授权码!  
`SENDER_NAME` : 寄件人名称  
`TEMPLATE_NAME`：邮件的样式，可以不写这行就按默认，除了默认还有另一个样式rainbow  
（我没提到但图片里有的环境变量先不管他）  
支持的邮件服务商:
`"126" "163" "1und1" "AOL" "DebugMail" "DynectEmail" "FastMail" "GandiMail" "Gmail" "Godaddy" "GodaddyAsia" "GodaddyEurope" "hot.ee" "Hotmail" "iCloud" "mail.ee" "Mail.ru" "Maildev" "Mailgun" "Mailjet" "Mailosaur" "Mandrill" "Naver" "OpenMailBox" "Outlook365" "Postmark" "QQ" "QQex" "SendCloud" "SendGrid" "SendinBlue" "SendPulse" "SES" "SES-US-EAST-1" "SES-US-WEST-2" "SES-EU-WEST-1" "Sparkpost" "Yahoo" "Yandex" "Zoho" "qiye.aliyun"` 就这么多啦

{% note danger %}
每次配置完环境变量需要重启容器!
{% endnote %}

好啦，至此已经完成了邮件提醒!

### 防止休眠

不过还有个小问题 LeanCloud 也是要恰饭的，当然不可能给你免费提供给这么好的服务!

免费版的 LeanCloud 容器，是有强制性休眠策略的，不能 24 小时运行
每天必须休眠 6 个小时

30 分钟内没有外部请求就会休眠

休眠后如果有新的外部请求才启动但是启动的第一份邮件会发送失败

如果您不缺钱请直接购买付费容器并跳过这段

正是因为大家都缺钱所以我们需要利用 LeanCloud的 云函数进行唤醒

既然必须休眠 6 个小时，那就让他休眠呗，总不可能你博客 24 小时都有人评论

首先我们需要再添加一个环境变量 `ADMIN_URL` 然后把下方 Web 主机域名给填写上

![](https://cos.royce2003.top/22549/06.webp-default)

然后点击定时任务-->创建定时任务

![](https://cos.royce2003.top/22549/07.webp-default)

名字随便取
选择生产环境下的 `self_wake`
然后cron表达式输入
`0 */30 7-23 * * ?`
意思是 8 点到 23 点每 30 分钟唤醒一次
这是我的表达式
大家可以按自己需求改只需要保证 6 小时的休眠就好啦
然后如果出问题了可以去应用日志里查看以下

![](https://cos.royce2003.top/22549/08.webp-default)
![](https://cos.royce2003.top/22549/09.webp-default)

当有人评论时，应用日志里也会显示  

### 评论管理

然后还记得刚刚的 Web 主机域名，你也可以绑定自己的域名  
通过访问该地址你就可以管理评论啦  
但当你打开网址时会叫你登录  
这时候你需要去创建个用户，也就是你自己  
只需要填写密码，username，邮箱

![](https://cos.royce2003.top/22549/10.webp-default)
![](https://cos.royce2003.top/22549/11.webp-default)

注意！邮箱才是是你的登录名！
不懂这是什么逻辑


## 微信提醒

好啦，接下来时加如微信提醒[^2]了
首先进入 Server 酱官网注册个账号然后按官网首页绑定微信

![](https://cos.royce2003.top/22549/12.webp-default)

第三步时测试绑定有没有成功

### 更改代码库

然后还记得更改的代码仓库吗，将他改成这个
`https://github.com/sviptzk/Valine-Admin-Server` 点击保存

![](https://cos.royce2003.top/22549/13.webp-default)

### 配置环境变量

然后再添加一个新的环境变量 `SCKEY`

![](https://cos.royce2003.top/22549/14.webp-default)

`SCKEY` 的值从这来

![](https://cos.royce2003.top/22549/15.webp-default)

{% note danger %}
然后一定记得要进行重新部署，重启容器！
{% endnote %}

大功告成，你可以在微信收到博客的评论了！

[^1]: 参考： [Hexo 优化 --- Valine 扩展之邮件通知](http://www.zhaojun.im/hexo-valine-admin/)
[^2]: 参考： [Hexo 博客 valine 评论微信、qq 提醒](https://www.antmoe.com/posts/2380732b/index.html)