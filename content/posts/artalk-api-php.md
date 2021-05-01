---
title: "Artalk 自托管评论系统的后端部署"
date: 2020-08-23
published: true
license: true
slug: artalk-api-php
tags: ['Artalk', 'PHP']
cate: tech
cover_image: "./images/artalk-api-php.png"
canonical_url: false
description: "Artalk 的后端部署教程"
---

首先，恭喜自己，成功部署了 Artalk 的后端，这或许是件很简单的事，但对于我这种对后端（利用云服务器）一窍不通的白痴来说，这还真是件值得庆祝的事，从「白痴」进阶到了「小白」。考虑到可能也有像我这样的小白，所以这篇文章就出现了。

从最开始的 Valine 到 utterances 再到 Disqus。  
Valine 基于 LeanCloud，但是第三方的服务总归不是特别安全，LeanCloud 的政策也一直在边，完全切断免费版应该是不可能的，但限制只会越来越多。还有人发了刷 Valine 评论的教程，邮箱随时可能爆炸，本就不安全的 Valine 变得更不可靠。垃圾评论也越来越多，没有后端的 Valine 几乎没办法避免，Valine-Admin（Valine 评论系统的扩展和增强） 引入了垃圾评论过滤，但实际效果不佳，垃圾评论没过滤掉，反而正常评论被误杀了；  
utterances 基于 GitHub 的 Issue，虽然官方并没有禁止使用 Issue 进行评论搭建，但是我总感觉怪怪的，而且众所周知，GitHub 的 API 在国内也非常不稳定。使用体验上，我个人觉得并不是非常好，不能进行回复，还不如直接在 Issue 界面评论；  
Disqus 应该算是世界上比较有名的评论系统了，但是因为一些原因被国内墙了，国内只能依靠 DisqusJS 进行评论浏览，而如果想要评论就必须进行代理，要是没有这个问题，Disqus 或许是个很好的选择（除了那庞大的体积）。害，「向来冷清的本站雪上加霜 —— Monstx」真是麻烦啊。

[@qwqcode/Artalk](https://github.com/qwqcode/Artalk) 🌌 一款简洁有趣的自托管评论系统，应该算是一个比较小众的评论系统了，光是要自己部署后端就劝退一大批人了。不过这都是~~小~~大问题，现在用的 Gridsome 框架在国内应该也算是非常小众的一款博客框架了，~~但咱就喜欢与众不同（求异心理，不可取😜）~~，毕竟小而美嘛，正好有台服务器，就本着试一试的心态开始了折腾。

*教程采用阿里云学生机 + 宝塔面板进行演示

:::warning 警告
**鉴于最近宝塔出现的 0day 漏洞，请自行判断宝塔的安全问题！**
:::

## 安装宝塔面板

新人建站，肯定首选宝塔。

如果之前服务器有整过一些自己也不知道的东西，可以先重装一次系统（宝塔推荐使用 centos 8.X 的系统），记住重装时的用户名和密码。

![重装](https://u.jalenchuh.cn/artalk-api-php/re-install.png)

进入实列进行远程连接，选择 「终端连接」 进行 「密码认证」

![远程连接](https://u.jalenchuh.cn/artalk-api-php/remote.png)

输入以下命令安装宝塔

```bash
yum install -y wget
wget -O install.sh http://download.bt.cn/install/install_6.0.sh
sh install.sh
```

安装完成后会显示登录网址（外网）和用户名密码，需要保存。同时可能会提示进行端口放行，此时前往安全组页面查看

![安全组](https://u.jalenchuh.cn/artalk-api-php/safe.png)

若没有相关端口的放行则需要手动添加

![放行端口](https://u.jalenchuh.cn/artalk-api-php/port.png)

## 安装相关内容

安装 Git，在远程连接中输入：

```bash
yum –y install git
```

登录宝塔界面，在软件商店页面搜索安装 `PHP-7.4` 和 `Nginx 1.18.0`，注意选择**快速安装**

进入 PHP 管理页面，在禁用函数中将 `putenv` 删除

![删除函数禁用](https://u.jalenchuh.cn/artalk-api-php/putenv.png)

在远程连接中输入

```bash
git clone https://github.com/qwqcode/ArtalkServerPhp.git
cd ArtalkServerPhp
composer install
php -r "copy('Config.example.php', 'Config.php');"
```

若在出现报错 `Warning: putenv() has been disabled`，检查禁用函数中是否还存在 `putenv`。

## 修改配置

在宝塔面板的文件页面中找到 `Config.php` 参照注释进行修改，如果你是按之前的步骤来的，没有进入其他目录，那 `ArtalkServerPhp` 文件夹应该是在根目录的 `root` 文件夹中。

## 添加站点

更改 `ArtalkServePhp` 文件夹的权限为 755，所有者 www，并应用到子目录。

![更改权限](https://u.jalenchuh.cn/artalk-api-php/authority.png)

在宝塔面板的站点页面添加站点，根目录选择 `ArtalkServePhp`。

![添加站点](https://u.jalenchuh.cn/artalk-api-php/site.png)

然后在站点的设置中修改运行目录为 `/public`。

![设置运行目录](https://u.jalenchuh.cn/artalk-api-php/run_directory.png)

将域名用 A 记录解析到服务器的**公网 IP**

至此，大功告成！

## 后

现在发现这个过程是真的蛮简单的，不过对于当时的我来说可绝对不是这样的。这是 Artalk 后端部署的部分，前端部分如有问题可以看看「[为 Gridsome 添加 Artalk 自托管评论系统 - Monstx](https://blog.monsterx.cn/code/use-self-hosted-comment-system-in-gridsome/)」，适配了暗黑模式，那有轮子咱肯定要直接用呀！
