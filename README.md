
<img src="https://p.pstatp.com/origin/fe820001edf383f736fa" alt="main.png" title="main.png" style="max-width:100%;" />

本博客采用 [Hexo](https://github.com/hexojs/hexo) + [Cards](https://github.com/ChrAlpha/hexo-theme-cards)。若想使用本站样式，下载仓库后替换本地的主题文件夹所有内容即可。

---

与原 Cards 主题相比，本站增加了

1. 文章字数和阅读时间统计

2. leancloud 访问统计

3. 脚注

4. ToolTip

5. 数学公式渲染引擎更换

6. 一些细微的样式调整

## 文章字数和阅读时间统计

默认开启，暂时在 `cards/layout/_meta/meta.ejs` 中引入

## leancloud 访问统计

见 `配置文件` 中的 `analytics` 部分

## 脚注

`[^1]` 文章中需要脚注的地方写入，数字递增

`[^1]：` 文章末尾对脚注进行说明

可参考本博客的文章

## ToolTip

鼠标悬浮在脚注上时会弹出脚注说明，可参考代码，运用在需要的地方

## 数学公式渲染引擎更换

若没更换渲染引擎请将配置文件中的 `math.engine` 设为 `mathjax`

若想使用 `katex`，先卸载原有渲染器 `npm uninstall hexo-renderer-marked --save`，并安装新渲染器 `npm install @upupming/hexo-renderer-markdown-it-plus --save`。最后，将 `math.engine` 设为 `katex`

*1 ~ 4 功能来自 Fluid 主题*

Thanks 🙇
