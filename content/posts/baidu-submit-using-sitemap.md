---
title: "利用 GitHub 从 sitemap 中提取链接并推送至百度"
date: 2020-08-11 09:05:19
published: true
license: true
slug: baidu-submit-using-sitemap
tags: ['GitHub Action', 'Python']
cate: tech
cover_image: "./images/baidu-submit-using-sitemap.png"
canonical_url: false
description: "每天自动从 sitemap 中提取链接并推送至百度"
---

之前在 「利用 GitHub Action 实现自动化」一文中介绍了如何利用 GitHub Action 实现自动提交百度收录。当时使用的博客框架是 Hexo，配套了自动生成文章链接的插件。而目前本站已经从 Hexo 换成了 Gridsome，经过一番折腾，终于成功迁移了，不过以前的一些过水的文章已经删掉了~实际上是懒得给文章做题图~。中途还有用 Forestry（博客 CMS 系统） 管理文章的想法，但是转念一想，管理系统是在浏览器上的，写文章体验本不怎么样，而且我都已经把源代码上传到 GitHub 了，本地在 Markdown 编辑器中写完再上传到 GitHub 中，体验反而更好。

## 前言

扯远了，回归正题。前面提到，在 Hexo 中是依靠一个 [hexo-baidu-url-submit](https://github.com/huiwang/hexo-baidu-url-submit) 插件就能完成文章链接生成、链接推送，不得不佩服 Hexo 这超赞的生态，不光是插件，主题也是如此，这应该也是 Hexo 最大的优势了吧。相比之下， Gridsome 这里主题少的可怜，插件虽然有 172 个，大概是 Hexo 的一般，但大部分插件的本地化较差，毕竟是外国用户更多。

Gridsome 官网上看到官方称其 _SEO-friendly_

> Gridsome sites load as static HTML before they hydrate into fully Vue.js-powered SPAs. This makes it possible for search engines to be able to crawl content and give better SEO ranking, and still have all the power of Vue.js.

于是乎，就想到了 sitemap，Google 不用说了，交了站点地图基本都会收录，百度那虽然不一定但总比没有好。当然还想到的就是百度提供的 API。翻了一圈，就找到了 [@gridsome/plugin-sitemap](https://gridsome.org/plugins/@gridsome/plugin-sitemap)。百度的 API 推送只好暂时放下。今天正好无聊又想到了这件事，现在已经有了 sitemap，或许我们可以直接从其中提取链接进行推送。一搜，果然有提取 sitemap 中链接的网站，但这样手动提取，然后写脚本用 API 岂不是很麻烦，不如直接把提取也集成进来。

## 提取链接

稍微看看 sitemap.xml 就能发现链接的格式是固定的

```xml
<url>
  <loc>https://blog.jalenchuh.cn/</loc>
</url>
```

那么我们只需要用正则去获取 `<loc>` 和 `</loc>` 之间的内容就好了

```js
(?<=<loc>).*?(?=</loc>)
```

## 推送

比较方便的有 `curl` 和 `post` ，然而利用 `post` 需要差不多 30s，而 `curl` 只要 2s 左右。

官方也给了 `curl` 的方法

```bash
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=xxx&token=xxx
```

## 编写链接生成脚步

通过 `urllib.request.urlopen` 进行文件打开，然后用 utf-8 解码 `.decode('utf-8')`，本地测试的时候没有用 utf-8 就会莫名出错。

用 `re.compile` 进行正则匹配，并用 `re.findall` 直接获取匹配后的字串，之后来个 `for` 就完美解决。

```py
import re
import urllib
import requests

sitemap = 'https://blog.jalenchuh.cn/sitemap.xml'

html = urllib.request.urlopen(sitemap).read().decode('utf-8')
result = re.findall(re.compile(r'(?<=<loc>).*?(?=</loc>)'), html)

with open('urls.txt', 'w') as file:
  for data in result:
    print(data, file=file)
file.close()
```

以上是利用 py 生成 txt 文件，等会再用 `curl` 推送。当然还可以利用 `post` 进行推送，不过慢很多。

首先安装百度要求定义 `header`

```py
headers = {
  'User-Agent': 'curl/7.12.1',
  'Host': 'data.zz.baidu.com',
  'Content-Type': 'text/plain',
  'Content-Length': '83'
}
```

利用 `requests.post` 推送

```py
for data in result:
  print(data + '\n' +
    requests.post(
      url = url,
      data = data,
      headers = headers
    ).text + '\n'
  )
```

:::warning 此处 url 涉及 token
我们应该先用 `BAIDU_TOKEN` 替换原来的 token 值，之后在 Action 中利用 `sed -i` 替换。
:::

## 编写 Action 文件

```yaml
name: push


on:
  schedule:
    - cron: '0 16 * * *'
  watch:
    types: [started]


jobs:
  build:
    runs-on: ubuntu-latest


    steps:
    - name: Checkout
      uses: actions/checkout@master


    - name: Set up python
      uses: actions/setup-python@v1
      with:
        python-version: 3.8


    - name: Install requests
      run: pip install requests


    - name: generate
      run: python generate.py


    - name: Push
      env:
        BAIDU_TOKEN: ${{ secrets.BAIDUTOKEN }}
        SITE: ${{ secrets.SITE }}
      run: curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=${SITE}&token=${BAIDU_TOKEN}"
```

如果是利用 `post` 进行推送，直接运行 py 文件就好了，不过在此之前需要替换刚刚文件中的 `BAIDU_TOKEN`

```yaml
    - name: BAIDU env
      env:
        BAIDU_TOKEN: ${{ secrets.BAIDUTOKEN }}
      run: sed -i "s/BAIDU_TOKEN/${BAIDU_TOKEN}/" xxx.py
```

## 配置

具体配置见 [README](https://github.com/JalenChuh/baidu-url-submit-by-using-sitemap#readme)

## 结束

到这里，这篇文章就水完了。终究还是*需求推动生成啊*。

前几天从 Hexo 换到了 Gridsome，把一些非常水的文章删了，现在只剩下十几篇了，不过也好，提升博客质量嘛，宁愿文章少也不要一堆水文。每个人对水文的定义不同，在我看来文章很短但不一定是水文，而以前的几篇 OI 题解就很水，题目一放，随便说几句就直接上代码。不过适当的水文还是可以接受的~~比如这篇~~。
