---
title: Hexo 新增友链页面
tags: [NexT, 教程]
abbrlink: f909dd9a
date: 2020-02-13 14:18:22
index_img: https://gitee.com/Royce2003/blogimages/raw/master/img/1e2ddb83bacb0a2f9f667a6557443aed_1_1_art.jpg
---

NexT 主题自带的友链模块放在侧边栏下面，视觉上比较臃肿。  

本文介绍一种修改友链样式的方法以及具体的步骤。
<!--more-->

# 新建`Links`界面
```bash
hexo new page links
```

这样会在 `/source/` 下创建 `links/index.md`。在文档的 `front matter` 添加 `type: links`，编辑好自己需要的友链页面内容。
例如：

```markdown
---
title: Friends Links
type: links
---

------

  <i class="fa fa-heart"></i>
    <span>留言添加友链</span>
  <i class="fa fa-heart"></i>

------

## 友链格式
- 网站名称：Royce
- 网站地址：https://royce2003.top
- 网站描述：OI小白
- 网站Logo/头像：https://royce2003.top/img/avatar.jpg
```

# 新建`link`渲染文件
在 `/themes/next/layout/_scripts/pages/` 目录下建一个 `link.swig` 文件，写入以下代码
```
{% raw %}{% block content %}{% endraw %}
<div id="links">
    <style>
        .container .main-inner {
            width: 1100px;
        }
        .links-content{
            margin-top:1rem;
        }
        .link-navigation::after {
            content: " ";
            display: block;
            clear: both;
        }
        .card {
            width: 45%;
            font-size: 1rem;
            padding: 10px 20px;
            border-radius: 4px;
            transition-duration: 0.15s;
            margin-bottom: 1rem;
            display:flex;
        }
        @media(max-width: 1400px){
            .card{
                width: 40% !important;
            }
        }
        .card:nth-child(odd) {
            float: left;
        }
        .card:nth-child(even) {
            float: right;
        }
        .card:hover {
            transform: scale(1.1);
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
        }
        .card a {
            border:none; 
        }
        .card .ava {
            width: 3rem!important;
            height: 3rem!important;
            margin:0!important;
            margin-right: 1em!important;
            border-radius:4px;
            
        }
        .card .card-header {
            font-style: italic;
            overflow: hidden;
            width: 100%;
        }
        .card .card-header a {
            font-style: normal;
            color: #2bbc8a;
            font-weight: bold;
            text-decoration: none;
        }
        .card .card-header a:hover {
            color: #d480aa;
            text-decoration: none;
        }
        .card .card-header .info {
            font-style:normal;
            color:#a3a3a3;
            font-size:14px;
            min-width: 0;
            overflow: hidden;
            white-space: nowrap;
        }
        span.focus-links {
            font-style: normal;
            margin-left: 10px;
            position: unset;
            left: 0;
            padding: 0 7px 0 5px;
            font-size: 11px;
            border-color: #42c02e;
            border-radius: 40px;
            line-height: 24px;
            height: 22px;
            color: #fff !important;
            background-color: #42c02e;
            display: inline-block;
        }
        span.focus-links:hover{
            background-color: #318024;
        }
        .friends-btn{
            text-align: center;
            color: #555!important;
            background-color: #fff;
            border-radius: 3px;
            font-size: 15px;
            box-shadow: inset 0 0 10px 0 rgba(0,0,0,.35);
            border: none!important;
            transition-property: unset;
            padding: 0 15px;
            margin: inherit;
        }
        .friends-btn:hover{
            color: rgb(255, 255, 255) !important;
            border-radius: 3px;
            font-size: 15px;
            box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
            background-image: linear-gradient(90deg, #a166ab 0%, #ef4e7b 25%, #f37055 50%, #ef4e7b 75%, #a166ab 100%);
            margin: inherit;
        }
    </style>
    <div class="links-content">
        <div class="link-navigation">
            {% raw %}{% for link in theme.mylinks %}{% endraw %}
                <div class="card">
                    <img class="ava" src="{% raw %}{{ link.avatar }}{% endraw %}"/>
                    <div class="card-header">
                    <div><a href="{% raw %}{{ link.site }}{% endraw %}" target="_blank"> {% raw %}{{ link.nickname }}{% endraw %}</a> <a href="{% raw %}{{ link.site }}{% endraw %}"><span class="focus-links">关注</span></a></div>
                    <div class="info">{% raw %}{{ link.info }}{% endraw %}</div>
                    </div>
                </div>
            {% raw %}{% endfor %}{% endraw %}
        </div>
        {% raw %}{{ page.content }}{% endraw %}
    </div>
</div>
{% raw %}{% endblock %}{% endraw %}
```


# 修改`page`渲染文件
然后修改 `/themems/next/layout/page.swig` 文件，
```diff
{% raw %}{% block title %}{% endraw %}
    {% raw %}{%- set page_title_suffix = ' | ' + title %}{% endraw %}

    {% raw %}{%- if page.type === 'categories' and not page.title %}{% endraw %}
      {% raw %}{{- __('title.category') + page_title_suffix }}{% endraw %}
    {% raw %}{%- elif page.type === 'tags' and not page.title %}{% endraw %}
      {% raw %}{{- __('title.tag') + page_title_suffix }}{% endraw %}
      
+   <!-- 友情链接-->
+   {% raw %}{% elif page.type === 'links' and not page.title %}{% endraw %}
+   {% raw %}{{ __('title.links') + page_title_suffix }}{% endraw %}
    
    {% raw %}{%- elif page.type === 'schedule' and not page.title %}{% endraw %}
      {% raw %}{{- __('title.schedule') + page_title_suffix }}{% endraw %}
    {% raw %}{%- else %}{% endraw %}
      {% raw %}{{- page.title + page_title_suffix }}{% endraw %}
    {% raw %}{%- endif %}{% endraw %}
  {% raw %}{% endblock %}{% endraw %}
```

然后还是在这个 `page.swig` 文件中，引入刚才新建的 `swig` 页面：
```diff
{% raw %}{% elif page.type === 'categories' %}{% endraw %}
          <div class="category-all-page">
            <div class="category-all-title">
              {% raw %}{{ _p('counter.categories', site.categories.length) }}{% endraw %}
            </div>
            <div class="category-all">
              {% raw %}{{ list_categories() }}{% endraw %}
            </div>
          </div>
+           <!-- 友情链接-->
+          {% raw %}{% elif page.type === 'links' %}{% endraw %}
+              {% raw %}{% include '_scripts/pages/links.swig' %}{% endraw %}
        {% raw %}{% elif page.type === 'schedule' %}{% endraw %}
          <div class="event-list">
          </div>
          {% raw %}{% include '_scripts/pages/schedule.swig' %}{% endraw %}
        {% raw %}{% else %}{% endraw %}
          {% raw %}{{ page.content }}{% endraw %}
        {% raw %}{%- endif %}{% endraw %}
      </div>
```


# 配置`_config`文件
## 增加友链
最后，添加友链的话，需要在`主题配置文件`文件末尾添加：
```yml
defaultlinks: # 跟着身边的大佬走，努力成为小大佬
  - nickname: Neworld2002     # 昵称
    site: https://neworld2002.github.io/ # 友链地址
    info: OI大佬  # 描述
    avatar: https://i.loli.net/2019/03/17/5c8dff0100f07.jpg    # 头像地址
  - nickname: newsheep
    site: http://newsheep2003.github.io/
    info: 社长大大
    avatar: https://newsheep2003.github.io/images/apple-touch-icon.png?v=5.1.3

friendslinks: # 五湖四海的朋友们
  - nickname: 维他入我心
    site: https://wtrwx.top
    info: 科技/生活日常～
    avatar: https://wtrwx.top/img/avatar.png
```
`defaultlinks`: 对应的是 link.swig 文件中 👨‍🎓 跟着身边的大佬走，努力成为小大佬  
`friendslinks`:呼应的是 link.swig 文件中 🍭 五湖四海的朋友们  
此处内容可以根据自己需要自行修改

## 开启显示
同时我们还需要在主题配置文件中开启 Links
```diff
menu:
  home: / || home
  # top: /top/ || signal
  tags: /tags/ || tags
  # categories: /categories/ || th
  archives: /archives/ || archive
- # links: /links/ || link
+ links: /links/ || link
  # schedule: /schedule/ || calendar
  sitemap: /sitemap.xml || sitemap
  commonweal: /404/ || heartbeat
  about: /about/ || user
```
然后就可以使用了！

---
[参考文章](https://bestzuo.cn/posts/2016690040.html)