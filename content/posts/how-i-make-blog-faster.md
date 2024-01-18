---
title: "我是如何加速博客的"
date: 2020-07-30
published: false
license: true
slug: how-i-make-blog-faster
tags: ['Analytics', 'Static', 'Preloading']
cate: tech
cover_image: "./images/how-i-make-blog-faster.png"
canonical_url: false
description: "折腾博客这么久了，加速博客算是有点经验吧"
---

:::note 🍉 同步发布

- **在少数派上阅读本文** — [我是如何加速博客的](https://sspai.com/post/61820)

:::

谁不想拥有一个超快的博客？~~我~~
这篇文章鸽了好多天了，本来打算 28 号写完的，正好那天下午开始暑假，结果晚上去聚餐了，聚餐结束又大晚上的去爬山了 ~~（真爬山，还有机会）~~。然后到了 29 号，又花了一个下午和晚上重装系统:confounded:，咕咕咕就到了 30 号。

不多说了，先来看看我的成果：

![speed desktop](https://u.jalenchuh.cn/how-i-make-blog-faster/speed_desktop.png)

![speed mobile](https://u.jalenchuh.cn/how-i-make-blog-faster/speed_mobile.png)

如果你和我一样，时不时用 PageSpeed Insights 跑跑博客、F12 看看网页加载速度，那么接下来的内容可能会对你有点帮助。

虽然我这冷淡的博客**什么都不优化就能有九十多分**，但是优化完能明显感觉浏览体验更好了。

## 服务器 & CDN

如果你是静态博客，你可以使用自己的服务器或者其他平台提供的静态网站托管，而当你没有备案时，没办法用国内的服务器或者 CDN 服务，速度基本上不来。
动态博客使用服务器一个道理。

而备案就见仁见智了，但是必须承认，加速博客的最简单最有效的方法就是备案，然后接入国内 CDN。

我目前使用的是腾讯云开发中的静态网站托管，之前尝试过 `COS + CDN` 和 `OSS + CDN`，但是使用 `云储存 + CDN` 种方法需要担心的就是流量问题，万一被恶意刷流量，会产生巨额费用，所以防护措施一定要做好。

现在域名还基本都会配个小绿🔒，但是个别免费 SSL 提供商所提供的服务是真滴慢阿，光 SSL
连接就去了好几秒，所以选择一个不错的提供商是非常重要的。泛域名证书推荐 Let's Encrypt Authority X3，双域名证书推荐 TrustAsia TLS RSA CA。

## 访问统计

访问统计分为两种，一种是单纯的 PV UV 统计，比如常见的不蒜子。但是~~众所周知~~，不蒜子日常抽风，加载时间动不动就超过 1s，但是我们想要一个超快的博客啊，整个博客的加载时间最好在 2s 以内，被你一个不蒜子占了一半怎么行呢。

还有一种就是稍微专业一点的，会统计更多的内容，就比如大部分博客使用的百度或 Google 提供的统计，而引入统计的同时会带来一个 js 和一张 gif，还有几个乱七八糟的东西。百度虽然是国内的但百度统计加载还是很慢，基本半秒以内，有时候甚至一秒。而 Google 的在国内有节点，速度其实和百度差不了多少。

### LeanCloud 统计代替不蒜子

对于日常抽风的不蒜子，你完全可以使用 LeanCloud 代替它，原理很简单，就是通过网页加载一段 js，向 LeanCloud 中储存的数据进行修改。但是请注意，该方法速度也不是特别快，但至少比不蒜子的 1s 要强一点，基本能在 0.5s 内完成加载。

直接在网页中加入以下 js[^1] 即可。并在 LeanCloud 中新建一个应用，获取 `app_id` `app_key` `server_url`，并修改 js 中三者的值。

:::tip
server_url 为该应用绑定的 API 域名

国内版用户必填，国际版用户可不填
:::

```js
(function () {
  // 查询存储的记录
  function getRecord(Counter, target) {
    return new Promise(function (resolve, reject) {
      Counter('get', '/classes/Counter?where=' + encodeURIComponent(JSON.stringify({target})))
        .then(resp => resp.json())
        .then(({results, code, error}) => {
          if (code === 401) {
            throw error;
          }
          if (results && results.length > 0) {
            var record = results[0];
            resolve(record);
          } else {
            Counter('post', '/classes/Counter', {target, time: 0})
              .then(resp => resp.json())
              .then((record, error) => {
                if (error) {
                  throw error;
                }
                resolve(record);
              }).catch(error => {
              console.error('Failed to create', error);
              reject(error);
            });
          }
        }).catch((error) => {
        console.error('LeanCloud Counter Error:', error);
        reject(error);
      });
    })
  }
  // 发起自增请求
  function increment(Counter, incrArr) {
    return new Promise(function (resolve, reject) {
      Counter('post', '/batch', {
        "requests": incrArr
      }).then((res) => {
        res = res.json();
        if (res.error) {
          throw res.error;
        }
        resolve(res);
      }).catch((error) => {
        console.error('Failed to save visitor count', error);
        reject(error);
      });
    });
  }
  // 构建自增请求体
  function buildIncrement(objectId) {
    return {
      "method": "PUT",
      "path": `/1.1/classes/Counter/${ objectId }`,
      "body": {
        "time": {
          '__op': 'Increment',
          'amount': 1
        }
      }
    }
  }
  // 校验是否为有效的 UV
  function validUV() {
    var key = 'LeanCloud_UV_Flag';
    var flag = localStorage.getItem(key);
    if (flag) {
      // 距离标记小于 24 小时则不计为 UV
      if (new Date().getTime() - parseInt(flag) <= 86400000) {
        return false;
      }
    }
    localStorage.setItem(key, new Date().getTime().toString());
    return true;
  }
  function addCount(Counter) {
    var enableIncr = '<%= theme.web_analytics.enable %>' === 'true' && window.location.hostname !== 'localhost';
    var getterArr = [];
    var incrArr = [];
    // 请求 PV 并自增
    var pvCtn = document.querySelector('#leancloud-site-pv-container');
    if (pvCtn || enableIncr) {
      var pvGetter = getRecord(Counter, 'site-pv').then((record) => {
        incrArr.push(buildIncrement(record.objectId))
        var ele = document.querySelector('#leancloud-site-pv');
        if (ele) {
          ele.innerText = record.time + 1;
          if (pvCtn) {
            pvCtn.style.display = 'inline';
          }
        }
      });
      getterArr.push(pvGetter);
    }
    // 请求 UV 并自增
    var uvCtn = document.querySelector('#leancloud-site-uv-container');
    if (uvCtn || enableIncr) {
      var uvGetter = getRecord(Counter, 'site-uv').then((record) => {
        var vuv = validUV();
        vuv && incrArr.push(buildIncrement(record.objectId))
        var ele = document.querySelector('#leancloud-site-uv');
        if (ele) {
          ele.innerText = record.time + (vuv ? 1 : 0);
          if (uvCtn) {
            uvCtn.style.display = 'inline';
          }
        }
      });
      getterArr.push(uvGetter);
    }
    // 如果是文章，请求文章的浏览数，并自增
    if ('<%= is_post() %>' === 'true') {
      var viewCtn = document.querySelector('#leancloud-post-views-container');
      if (viewCtn || enableIncr) {
        var target = decodeURI('<%= url_for(page.path) %>');
        var viewGetter = getRecord(Counter, target).then((record) => {
          incrArr.push(buildIncrement(record.objectId))
          if (viewCtn) {
            var ele = document.querySelector('#leancloud-post-views');
            if (ele) {
              ele.innerText = (record.time || 0) + 1;
              viewCtn.style.display = 'inline';
            }
          }
        });
        getterArr.push(viewGetter);
      }
    }
    // 如果启动计数自增，批量发起自增请求
    if (enableIncr) {
      Promise.all(getterArr).then(() => {
        incrArr.length > 0 && increment(Counter, incrArr);
      })
    }
  }

  var app_id = 'xxx'
  var app_key = 'xxx'
  var server_url = 'xxx'

  function fetchData(api_server) {
    var Counter = (method, url, data) => {
      return fetch(`${ api_server }/1.1${ url }`, {
        method,
        headers: {
          'X-LC-Id': app_id,
          'X-LC-Key': app_key,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    };
    addCount(Counter);
  }
  var api_server = app_id.slice(-9) !== '-MdYXbMMI' ? server_url : `https://${ app_id.slice(0, 8).toLowerCase() }.api.lncldglobal.com`;
  if (api_server) {
    fetchData(api_server);
  } else {
    fetch('https://app-router.leancloud.cn/2/route?appId=' + app_id)
      .then(resp => resp.json())
      .then(({api_server}) => {
        fetchData('https://' + api_server);
      });
  }
})();
```

### 加速 Google Analytics

百度统计没看到过有人弄加速，Google Analytics 的话我目前尝试了两种方法

#### 利用 Cloudflare Workers

原理是将一段 js 部署在 Cloudflare Workers，网页向它传输数据，它再异步发给 Google Analytics。详见 [@SukkaW/cloudflare-workers-async-google-analytics](https://github.com/SukkaW/cloudflare-workers-async-google-analytics)

但是该方法还是存在一定问题的，Cloudflare 自身的速度 emmm，反向加速的称号可不是吹的，某些地区确实速度非常慢，和原来的 Google Analytics 相比或许会快那么一点点（至少我当时测试的是这样的）

#### 采用 DogeDoge 提供的加速

这个是我目前使用的方法，非常简单，直接使用以下代码来引入 ga。

```html
<script>
  window.ga_tid = 'Your google_site_id';
  (function() {
    var dga = document.createElement("script");
    dga.src = "https://rmt.dogedoge.com/fetch/public/ga.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(dga, s);
  })();
</script>
```

引入的文件总共就 1 kb 多一点点，速度也是杠杠的，基本两个文件各自都能在 100ms 内加载完成，总共也就 200ms，而我测试后发现，大部分时间两个文件总共加载时间都在 100ms 内。

![ga](https://u.jalenchuh.cn/how-i-make-blog-faster/ga.png)

强烈推荐使用这种方法，速度贼快，还省事。

## 预加载

网站第一次加载的等待时间非常重要，但浏览过程中的链接跳转的加载速度同样重要。

提前加载网页，即通过 js 对当前页面中的本站链接进行预先加载，或是在鼠标悬浮在链接上时，对该链接进行预先加载。

这里吐槽下，看到过有些博客使用了 pjax 局部刷新，但是博客本身的速度还是非常慢，导致体验极差，所以如果博客本身速度就非常非常慢，使用 pjax 并不会有什么效果。

目前我尝试过的共有 4 种方案

- instantclick
- [quicklink](https://github.com/GoogleChromeLabs/quicklink)
- [instant.page](https://github.com/instantpage/instant.page)
- [flying-pages](https://github.com/gijo-varghese/flying-pages)

首先建议排除 instantclick，配置非常麻烦，需要考虑很多 js 问题，而且项目本身已经没有人维护了（应该是的，上一次更新是几年前的事了）

### quicklink

由 Google 的团队开发，通过脚本检测当前可视区域内的链接，进行预加载。
比如下方图片中共包含 6 个本站链接，本页面所有内容加载完成后，就会对这 6 个链接预先加载，在本地留下缓存，使得点击跳转的后的加载速度变快。因为它会加载当前可视区的所有链接，所以对服务器的负担会比较重。

![quicklink](https://u.jalenchuh.cn/how-i-make-blog-faster/quicklink.png)

他采用的预加载是在 `<head>` 中引入 `<link>`

```html
<link rel="prefetch" href="xxx">
```

使用方法很简单

```html
<script src="https://unpkg.com/quicklink@2.0.0/dist/quicklink.umd.js"></script>

......

<script>quicklink.listen();</script>
```

更多的用法请查看该项目的 [GitHub 仓库](https://github.com/GoogleChromeLabs/quicklink)

### instant.page

刚刚的 quicklink 是直接预加载，而这个则是鼠标悬浮在链接上时才对该链接预加载，这无疑极大的减轻了服务器的负担，是个非常好的选择。

只需要加入以下代码就可以使用了

```html
<script src="//instant.page/5.1.0" type="module" integrity="sha384-by67kQnR+pyfy8yWP4kPO12fHKRLHZPfEsiSXR8u2IKcTdxD805MGUXBzVPnkLHw"></script>
```

预加载的方式和 quicklink 一样，也是引入 `<link>`。

貌似它没有更多用法了。

### Flying Pages

这个也就是我目前在使用的了。同时具有 quicklink 和 instant.page 的功能，能直接预加载可视区域内的链接，还能预加载鼠标悬浮的链接（前一个未生效的情况下），并且能自动检测服务器状态，如果服务器繁忙则不进行预加载。同时还能修改 4 个参数的值。

```html
<script>
  window.FPConfig = {
    delay: 0,    // 浏览器空闲多少秒后开始预加载
    ignoreKeywords: [],    // 不进行预加载的链接，例 ["#", "/about"]
    maxRPS: 3,    // 每秒最大加载数
    hoverDelay: 50    // 鼠标悬浮后预加的延迟，毫秒单位
    // 上方数值未默认值
  };
</script>
<script defer src="https://cdn.jsdelivr.net/gh/gijo-varghese/flying-pages@2.1.2/flying-pages.min.js"></script>
```

### 总结

| 插件        | Quicklink  | Instant.page | Flying Pages |
|:---------:|:----------:|:------------:|:------------:|
| 预加载的内容    | 当前可视区域内的链接 | 鼠标悬浮的链接      | 可视区域 + 鼠标悬浮  |
| 大小        | 1.5 KB     | 1.3 KB       | 1.5 KB       |
| 支持 Safari | ✅          | ❌            | ✅            |
| 判断服务器状态   | ❌          | ❌            | ✅            |

大致的一些差异就在这里，怎么选择看你自己需求。

## 静态文件

### 图片

图片是一个网站浏览的大头，之前也有写过一篇文章『[加速网页加载？我选择对图片下手](/posts/12013.html)』，通过使用 WebP 来减少网站加载流量，提供网站速度。

今年 WWDC 上 Safari 的更新也支持了 WebP，终于，我们不再需要为 Safair 不支持 WebP 而对它特殊照顾了。但是我个人还是习惯保留 PNG or JPG 原图，所以我选择了 [DogeDoge 提供的图床服务](https://v2ex.com/t/659652#reply43)，支持智能 WebP（浏览器支持 WebP 则返回 WebP 格式，不知此则返回原图）。还有件值得提的事情，不单单又拍云，最近腾讯数据万象也支持了智能 WebP。

当然，如果你这在使用的图床服务并不支持该功能，或者并没有使用图床，但仍然想得当相同的体验，『[WebP 图片优化在 Hexo 上的最佳尝试](https://blog.ichr.me/post/webp-on-hexo)』 这篇文章中的方法或许是目前最佳的方式。

此外，图片懒加载是个非常有效的方式，用几 kb 的 js 延迟图片加载，博客的首次加载速度能得到非常大的提升。

### 减少文件

这是博客，初衷是写文章，输出内容。当然，美化博客是件很重要的事情，但过度的美化会适得其反，真正重要的是内容，只有内容好了，看的人才会多。不过话说回来，每个 Blogger 应该都有一个折腾的过程：`简单 -> 花里胡哨 -> 简单`，~~起点就是终点~~。现在我的博客能有 99 分，最大的原因就是这个主题，简约而不简陋，除去字体文件，首页加载的文件不超过 10 个。

既让讲到了字体就谈谈吧，这个算是见仁见智了，有的人认为字体非常重要，直接决定了博客的观感，而有的人觉得无关紧要。我属于前者，所以字体文件在我的博客中算是流量大户了，毕竟我引入了整整三个字体，其中还包括一个中文字体，中文字体的体积可想而知。英文字体：Roboto Slab，中文：思源宋体，代码：Fira Code。两个英文字体的体积还算可以，但中文的体积真的有点大，如果你爱折腾可以试试[字蛛](https://www.font-spider.org/)。

### 文件压缩

目前我是用的文件压缩插件是 [hexo-all-minifier](https://github.com/chenzhutian/hexo-all-minifier)，但是并没有开启 `image_minifier`，图片压缩速度慢而且我没有把图片和博文放在一起的习惯。总体效果不错，体积能减少 20% 左右。

而对于图片，我使用的是[智图](https://zhitu.isux.us/)进行压缩，虽然这个软件已经很久没更新了，但是完全够用

### 尽量统一外链

这里指的外链是文件外链，加载不同域的文件需要不同的 SSL 连接时间。比如你的一个 js 来自 `jsdelivr.net`，另一个来自 `staticfile.org`，那么你就需要两次 SSL 连接，而如果你的两个文件全部来自 `jsdelivr.net` 那你将只需要一次 SSL 连接。

## 后

以上就是我的一点小优化，其实也没什么东西，还说不定有什么错的地方，不过对于不怎么会代码的人或许还有点用，毕竟这些基本不涉及什么非常复杂深奥的东西。

V2EX 上曾有一句话 『像你这样不分享教程的人有什么资格看不起我们这些小白？』，所以，希望大佬们在做一些事情之后能分享下相关教程，当然啦，全凭意愿 :blossom:

[^1]: 来自 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/layout/_partial/plugins/leancloud.ejs)
