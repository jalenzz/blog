---
title: Hexo标签云
tags: [教程, Hexo, NexT]
abbrlink: db44ecae
date: 2020-02-10 16:01:12
index_img: https://cdn.jsdelivr.net/gh/Royce2019/img/img/20200303195435.png
---


## hexo-tag-cloud插件介绍

`hexo-tag-cloud`插件是MikeCoder写的一个Hexo博客的标签云插件，能直观的展示标签的种类，美观大方且非常优雅。

<!--more-->

插件效果预览：[标签页](https://royce2003.top/tags/)

![GIF.gif](https://i.loli.net/2020/03/05/xcHjV6X8nT9LBdo.gif)

插件地址：
[GitHub地址](https://github.com/MikeCoder/hexo-tag-cloud)

插件说明：
[说明地址](https://github.com/MikeCoder/hexo-tag-cloud/blob/master/README.ZH.md)

## 安装插件

进入到 `hexo` 的根目录，在 `package.json` 中添加依赖: `"hexo-tag-cloud": "2.0.*"` 操作如下：

### 使用命令行进行安装

```
npm install hexo-tag-cloud@^2.1.* --save
```

## 配置插件

不同类型主题配置方法不同

### 对于 swig 用户

- 这里以 Next 主题为例。
- 找到文件 `next/layout/_macro/sidebar.swig`, 然后添加如下内容。（添加位置与显示位置相关联）
- 对于最新版的NexT主题，文件位置在`Blog\source\_data\sidebar.swig`(若没有则创建)添加如下内容，并且在主题配置文件的`custom_file_path`中将`sidebar: source/_data/sidebar.swig`取消注释

```html
{% raw %}{% if site.tags.length > 1 %}{% endraw %}
<script type="text/javascript" charset="utf-8" src="{% raw %}{{ url_for('/js/tagcloud.js') }}{% endraw %}"></script>	
<script type="text/javascript" charset="utf-8" src="{% raw %}{{ url_for('/js/tagcanvas.js') }}{% endraw %}"></script>
<div class="widget-wrap">
    <h3 class="widget-title">Tag Cloud</h3>
    <div id="myCanvasContainer" class="widget tagcloud">
        <canvas width="250" height="250" id="resCanvas" style="width=100%">
            {% raw %}{{ list_tags() }}{% endraw %}
        </canvas>
    </div>
</div>
{% raw %}{% endif %}{% endraw %}
```

### 对于 ejs 的用户

- 这里以默认主题 landscape 为例。
- tagcloud 模板文件为 `hexo/themes/landscape/layout/_widget/tagcloud.ejs`
- 将这个文件修改为如下内容：

```diff
<% if (site.tags.length) { %>
  <script type="text/javascript" charset="utf-8" src="<%- url_for('/js/tagcloud.js') %>"></script>
  <script type="text/javascript" charset="utf-8" src="<%- url_for('/js/tagcanvas.js') %>"></script>
  <div class="widget-wrap">
    <h3 class="widget-title"><%= __('tagcloud') %></h3>
    <div id="myCanvasContainer" class="widget tagcloud">
      <canvas width="250" height="250" id="resCanvas" style="width=100%">
        <%- tagcloud() %>
      </canvas>
    </div>
  </div>
<% } %>
```

### 对于 jade 用户

- 这里以 Apollo 主题为例
- 找到 `apollo/layout/archive.jade` 文件，并且把 container 代码块修改为如下内容:

```
...
block container
    include mixins/post
    .archive
        h2(class='archive-year')= 'Tag Cloud'
        script(type='text/javascript', charset='utf-8', src=url_for("/js/tagcloud.js"))
        script(type='text/javascript', charset='utf-8', src=url_for("/js/tagcanvas.js"))

        #myCanvasContainer.widget.tagcloud(align='center')
            canvas#resCanvas(width='500', height='500', style='width=100%')
                !=tagcloud()
            !=tagcloud()
    +postList()
...
```

## 开启

现在 hexo-tag-cloud 插件支持自定义啦。非常简单的步骤就可以改变你的标签云的字体和颜色，还有突出高亮。

- 在你的博客根目录，找到 `_config.yml` 文件然后添加如下的配置项:

```yml
# hexo-tag-cloud
tag_cloud:
    textFont: Trebuchet MS, Helvetica
    textColor: '#333'
    textHeight: 25
    outlineColor: '#E2E1D1'
    maxSpeed: 0.5
```

textColor: 字体颜色
textHeight: 字体高度
maxSpeed: 文字滚动速度

## 部署

```
hexo clean && hexo g && hexo d
```

建议清理缓存，这样不容易出现问题

------

[参考文章](https://github.com/MikeCoder/hexo-tag-cloud/blob/master/README.ZH.md)
[参考文章](http://www.aomanhao.top/2019/04/20/hexo_Tag_cloud/)