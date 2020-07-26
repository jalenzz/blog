<img src="https://p.pstatp.com/origin/fe820001edf383f736fa" alt="main.png" title="main.png" style="max-width:100%;" />

本博客采用 [Hexo](https://github.com/hexojs/hexo) + [Cards](https://github.com/ChrAlpha/hexo-theme-cards)。若想使用本站样式，下载仓库后替换本地的主题文件夹所有内容即可。

**并且，一定要阅读 README 的内容，保证主题 `_config.yml` 中的信息已经全部更换为你自己的。**

## 为什么开源呢

I :heart: open-source.

最重要的就是备份了，最初用 Hexo 的时候，各种折腾，但又很菜，有时候出问题了解决不了，只好重装。于是乎，就开启了版本控制。

然后是为了 GitHub Action 部署和云端编辑吧

还有就是方便别人吧，或许会对一些人的自定义有一点点的帮助。

让我意向不到的是，前段时期主题作者居然给我的仓库提了一个 lazyload 的 PR [#4](https://github.com/JalenChuh/blog/pull/4)，和仓库中的一个 issue

---

与原「Cards」主题相比，本站比较大的更改

- 文章字数和阅读时间统计

- leancloud 访问统计

- 脚注

- 数学公式渲染引擎更换

- 一些细微的样式调整

- Disqus 评论懒加载

- Cloudflare Workers 加速 Google Analytics

---

并且，你可能还需要了解以下内容：

- `pagination` （首页下方的页数选择） 展开

- 英文字体 Roboto Slab
- 代码字体 Fira Code
- 中文字体 Noto Serif SC 衬线

- 夜间模式切换按钮固定于右上角

- 时光机页面，位于 `/source/artitalk`，详见 <https://artitalk.js.org/>。需要注意的是，本站采用的样式和 js 都经过修改，与官方略有差异

- 默认的 Google Analytics 使用了 DogeDoge 提供的加速（和上面提到的利用 Cloudflare Workers 不是一个东西）

- 剩下的就等你来发现了

---

## 文章字数和阅读时间统计

默认开启，暂时在 `cards/layout/_meta/meta.ejs` 中引入

## leancloud 访问统计

见 `配置文件` 中的 `analytics` 部分

## 脚注

`[^1]` 文章中需要脚注的地方写入，数字递增

`[^1]：` 文章末尾对脚注进行说明

可参考本博客的文章

## 数学公式渲染引擎更换

若没更换渲染引擎请将配置文件中的 `math.engine` 设为 `mathjax`

若想使用 `katex`，先卸载原有渲染器 `npm uninstall hexo-renderer-marked --save`，并安装新渲染器 `npm install @upupming/hexo-renderer-markdown-it-plus --save`。最后，将 `math.engine` 设为 `katex`

## Disqus 评论懒加载

暂时只支持 Disqus，默认开启，无需配置

## Google Analytics 加速

详见 [SukkaW/cloudflare-workers-async-google-analytics](https://github.com/SukkaW/cloudflare-workers-async-google-analytics)

只需在配置文件的 `analytics > cfga` 中填写相关配置即可，默认忽略 `localhost`

Thanks 🙇
