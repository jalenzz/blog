---
title: "利用 GitHub Action 实现自动化"
date: 2020-07-05
published: true
license: true
slug: use-github-action
tags: ['GitHub Action', 'CI']
cate: tech
cover_image: "./images/use-github-action.png"
canonical_url: false
description: "博客部署？我用 GitHub Action 自动部署<br>百度收录推送？我也用 GitHub Action 自动推送"
---

## 前言

首先，为什么选择静态网站？没后台，没数据库，但是方便折腾，可以完全自定义，这是我选择静态博客最大的原因之一。 ~~（其实没钱买服务器才是最大原因）~~

部署静态网站的方法很多，GitHub Page, Coding Page, Gitee Page, Vercel 都是免费的，各有各的优势，先说说这几个免费的。

### GitHub Page

Github Page 巨硬家的东西，除非不可抗力，要不然出问题的概率很小。但国内部分地区无法访问，部分地区访问速度慢。能利用 Github Action 实现自动化部署。速度问题或许可以通过 CloudFlare 的 CDN 来解决，但速度还是不怎么样。当然，如果你域名备案了，用国内的 CDN 也是没问题的。

### Coding Page

Coding Page 表明是 Coding 的，但 Coding 现在算是腾讯的了，出问题的概率也很小。但用的节点全是境外的，一般是香港和新加坡.....，而且日常宕机，动不动就崩了。同样能利用 集成CI 进行自动部署。

### Gitee Page

Gitee Page 码云家的，国内节点，速度没得说，快就完事了。自定义域名和自动更新（也就是说每次更新博客，推送到码云之后还要手动点击部署）需要购买 Pro 版，99 元/年。但因为是国内节点的原因，绑定的域名需要备案。码云还有个比较好的功能，能自动判断博客类型，支持 Jekyll、Hugo、Hexo，能自动进行编译，并部署生成的文件，也就是说你可以直接将整个博客文件夹推上去，每次更新只需要使用 git 推送下就行了，它会帮你生成。

### Vercel

Vercel 可以直接从 GitHub 导入博客仓库，且能识别静态博客类型，和码云一样自动生成。顺便看了下 Vercel 分配的节点，美国的，但是国内访问速度还是不错的，Ping 了一下，平均 62.0ms，速度也还不错（至少我这是这样）。

### 总结

- 不要求自定义域名，无脑上码云

- 要自定义域名上 GitHub Page or Vercel

- Coding 不推荐

那么本博客目前并没有采用上述方式进行部署，但全部体验过。因为域名进行了备案，就直接采用了腾讯的**静态网站托管**。

有一说一，国内各家的 CDN 计费规则是真的复杂，第一次看完基本都一头雾水，这时候腾讯的云开发出现了。云开发中包含了静态网站托管，专为静态网站而生。计费规则很简单，`流量费用` + `空间费用`，而且自动部署到 CDN 上，速度超快。

至于怎么使用云开发部署静态博客，官方已经给出了详细教程 [静态网站托管 搭建 Hexo - 最佳实践 - 文档中心 - 腾讯云](https://cloud.tencent.com/document/product/1210/43365)。

当然，这是收费的，不过挺便宜的，正常小站一个月不超过一元，而且还可以申请腾讯的 [云开发网站托管「9.9包年」赞助计划](https://cloud.tencent.com/act/pro/wh99)。

## 自动部署

接下来进入重点，利用 GitHub Action 实现自动化部署，如果你还不知道 GitHub Action 是什么，可以看看 [官方介绍](https://github.com/features/actions)，简单来说，以你的仓库为根目录，给你一台电脑，帮你完成一些事情。如果想进一步了解，可以看看 [编写自己的 GitHub Action，体验自动化部署](https://zkqiang.cn/posts/e8ed6836/)

### 连接 GitHub

保证你的整个博客文件夹已 `push` 到了GitHub 上。如果没有，新建一个仓库 `Public` or `Private`  均可，然后将本地本地与仓库连接。

`username` 替换成用户名，`repo` 替换成仓库名

```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/username/repo.git
git push -u origin master
```

:::warning 🚨 注意

如果仓库为 `Public` 请不要将隐私内容直接写在文件中，暂时用一些单词替换，后续编写自动部署文件时有方法解决

:::

### 编写 GitHub Action

从这里开始，默认你已经看完之前提到的『编写自己的 GitHub Action，体验自动化部署』，或者对 GitHub Action 有初步的了解，知道大致操作。

以我的[个人主页](https://JalenChuh.cn)为例，是由 Vue.js 构建的，部署在腾讯云静态网站托管。GitHub 仓库地址：[homepage](https://github.com/jalenchuh/homepage)

共分为 `Setup` `Build` `Lint` `Deploy` 四个步骤

- Setup: 安装 node 环境

- Build: 构建

- Lint: Lint 代码

- Deploy: 推送到腾讯静态网站托管

```yaml
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
      with:
        node-version: '10.x'

    - name: Setup
      run: npm install

    - name: Build
      run: npm run build

    - name: Lint
      run: npm run lint

    - name: Deploy
      id: deployStatic
      uses: TencentCloudBase/cloudbase-action@v1.1.1
      with:
        secretId: ${{ secrets.SECRET_ID }}
        secretKey: ${{ secrets.SECRET_KEY }}
        envId: ${{ secrets.ENV_ID }}
        staticSrcPath: dist
```

:::tip 对于隐私数据须在 secrets 中设置

文件中出现的 `secrets.xxx` 须在仓库的 `settings > secrets` 中设置

新建 `secrests` 时，`name` 为 `xxx` ，`Value` 为内容

:::

### 部署到 GitHub Page

[^1]

```yaml
name: Deploy                      # Actions 显示的名字，随意设置

on: [push]                        # 监听到 push 事件后触发

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout              # 拉取当前执行 Actions 仓库的指定分支
      uses: actions/checkout@v2
      with:
        ref: master

    - name: Update Submodule      # 如果仓库有 submodule，在这里更新，没有则删掉此步骤
      run: |
        git submodule init
        git submodule update --remote

    - name: Setup Node            # 安装 Node 环境
      uses: actions/setup-node@v1
      with:
        node-version: "10.x"

    - name: Hexo Generate         # 安装 Hexo 依赖并且生成静态文件
      run: |
        rm -f .yarnclean
        yarn --frozen-lockfile --ignore-engines --ignore-optional --non-interactive --silent --ignore-scripts --production=false
        rm -rf ./public
        yarn run hexo clean
        yarn run hexo generate

    - name: Hexo Deploy           # 部署步骤，这里以 hexo deploy 为例
      env:
        SSH_PRIVATE: ${{ secrets.SSH_PRIVATE }}
        GIT_NAME: yourname
        GIT_EMAIL: your@email.com
      run: |
        mkdir -p ~/.ssh/
        echo "$SSH_PRIVATE" | tr -d '\r' > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        git config --global user.name "$GIT_NAME"
        git config --global user.email "$GIT_EMAIL"
        yarn run hexo deploy
```

### 部署到腾讯静态托管

建议使用[官方 Action](https://github.com/TencentCloudBase/cloudbase-action)

示例代码

```yaml
name: Deploy

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '10.x'

    - name: Setup Hexo
      run: |
        npm install hexo-cli -g
        npm install

    - name: Generate
      run: hexo clean && hexo g

    - name: Deploy
      id: deployStatic
      uses: TencentCloudBase/cloudbase-action@v1.1.1
      with:
        secretId: ${{ secrets.SECRET_ID }}
        secretKey: ${{ secrets.SECRET_KEY }}
        envId: ${{ secrets.ENV_ID }}
        staticSrcPath: public
```

部署 Hexo 的过程中，`Deploy` 之前的都是差不多，所有之后只需要修改 `Deploy` 之后的内容就行。

### 部署到 腾讯COS

建议使用[zkqiang/tencent-cos-action](https://github.com/zkqiang/tencent-cos-action)

### 其他

大部分都是有官方 Action 的，即使没有也会有其他人编写的，或参考官方文档。

## 隐私问题

可以直接使用 Private 仓库解决。

对于 Publlic 仓库，可以使用 `sed` 命令。

比如我在博客配置 `_config.yml` 文件中有百度推送的代码

```yaml
baidu_url_submit:
  count: 200
  host: blog.JalenChuh.cn
  token: baiduToken
  path: baidu_urls.txt
```

其中 `token` 属于隐私内容，不能公开，那么我们可以使用 `baiduToken` 将 `token` 代替

而之后在编写的 Action 的时候将 `token` 存入 `secrets` ，利用 `sed` 命令对 `baiduToken` 进行替换即可。

```bash
sed -i "s/baiduToken/${baiduToken}/" _config.yml
```

`sed -i` 用法为 `sed -i 's/原字符串/新字符串/' 文件路径`

结合 `secrets` 使用

```yaml
- name: env
  env:
    baiduToken: ${{ secrets.baiduToken }}

  run: sed -i "s/baiduToken/${baiduToken}/" _config.yml
```

## 自动提交百度收录

解决了这个问题我们就可以进行一些更好玩的了，比如百度自动推送

首先确保安装了 `hexo-baidu-url-submit`，并且 `package.json` 的 `dependencies` 中含有该插件。

:::tip

`package.json` 中如果没有，必须使用 `npm i hexo-baidu-url-submit --save` 安装

:::

然后还是该文件，修改 `scripts` 部分

```diff
"scripts": {
  .......
  "xx": "xxxx",
+  "baidupush": "hexo deploy"
},
```

:::warning 必须遵循 json 规范

最后一行，也就是 `baidupush` 这行结尾没有逗号，而倒数第二行必须有逗号

:::

百度给了几千条的限额，你可以通过 `hexo deploy && hexo deploy ...` 执行多次，把全部额度用完，但貌似一个链接重复提交会被百度降权（不懂 SEO），所以看你自己了。

但是还有一个问题，如果你使用的是 GitHub Page 之类的，每次推送的同时都会把博客也推送一遍，没这必要，那么我们可以新建一个配置文件 `_baidupush.yml` ，将 `_config.yml` 中我内容复制进去，再修改末尾 `deploy` 部分，仅保留百度推送。

```diff
deploy:
  - type: baidu_url_submitter
-  - type: git
-    repo: git@github.com:jalenchuh/test.git
-    branch: master
```

那么之前命令中的所有 `hexo deploy` 就需要相应的替换成 `hexo deploy --config _baidupush.yml`

然后在 `secrets`  中存入 `baiduToken`

并编写 Action，每天北京时间 0 点自动执行

```yaml
name: baiduPush

on:
  schedule:
    - cron: '0 16 * * *' # Github Action 使用的是 UTC 时间

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '10.x'

    - name: Setup Hexo
      run: |
        npm install hexo-cli -g
        npm install

    - name: BAIDU env
      env:
        baiduToken: ${{ secrets.baiduToken }}

      run: sed -i "s/baiduToken/${baiduToken}/" _baidupush.yml # 替换 baiduToken

    - name: generate
      run: hexo clean && hexo g

    - name: push
      run: npm run baidupush # 执行前面写好的命令
```

## 最后

著名的 CI 工具还有 Travis CI，相比之下我觉得 GitHub Action 更加容易上手，而且和 GitHub 直接集成算是它的一大优势吧。

不过还是有一些缺点的，比如没办法本地调试，第一次使用 Action 列表中总是一片 :x:。还有就是出错之后 `re run` 只能全部重来，没办法指定从某一个 steps 开始

当然了，已经做的非常不错了。同时，期待下即将推出的 Codespaces。

[^1]: GitHub Page 部署代码来自 <https://hexo.fluid-dev.com/posts/actions-deploy/>
