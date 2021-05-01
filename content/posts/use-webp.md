---
title: "加速网页加载？我选择对图片下手"
date: 2020-04-20
published: true
license: true
slug: use-webp
tags: ['WebP']
cate: tech
cover_image: "./images/use-webp.png"
canonical_url: false
description: "WebP，由 Google 开发的新型图像格式，从名字就可以看出是专门为了 Web 而设计。采用 WebP 格式能对网站速度提升起到很大帮助。"
---

WebP 是一种现代图像格式，可为 Web 上的图像提供出色的无损和有损压缩。使用 WebP ，网站管理员和 Web 开发人员可以创建更小，更丰富的图像，从而使 Web 更快。
与 PNG 相比，WebP 无损图像的尺寸要小 26％。 在同等的 SSIM 质量指数下，WebP 有损图像比同类 JPEG 图像小 25-34％。
无损 WebP 支持透明性（也称为 Alpha 通道），而仅增加 22％ 的字节数。 对于可以接受有损 RGB 压缩的情况，有损 WebP 还支持透明性，与 PNG 相比，文件大小通常小 3 倍。

## WebP

新型图像格式，由 Google 开发[^1]

### WebP 是如何工作的

> 有损 WebP 压缩使用预测编码对图像进行编码，这与 VP8 视频编解码器用于压缩视频中的关键帧的方法相同。预测编码使用相邻像素块中的值来预测块中的值，然后仅对差异进行编码。
>
> 无损 WebP 压缩使用已经看到的图像片段来精确地重建新像素。如果找不到有趣的匹配项，它也可以使用本地调色板。
>
> WebP 文件由 VP8 或 VP8L 图像数据以及基于 RIFF 的容器组成。

### 兼容性

这种东西就贼烦了:hear_no_evil:

Google Chrome，Firefox，Edge，Opera 等都支持 WebP

[^2]![支持列表](https://u.jalenchuh.cn/use-webp/01.png)

~~万恶的~~ Safari 居然还不支持，但当看到下方的 `Safari is experimenting with supporting WebP images.`[^3] 时，还兴奋了一小会，但点进去之后...

![Safari 支持情况](https://u.jalenchuh.cn/use-webp/02.png)

2016 年 7 月 19 日 ... wd*md:anger::anger:  
而且 2016 年就内测过，居然给删了...  
和 Google 竞争？没有技术做好？我肯定相信前者

### 使用情况

随便找了几个网站测下

#### 淘宝

淘宝官网中大部分图片均采用了 WebP 格式

![淘宝](https://u.jalenchuh.cn/use-webp/03.png)

对于部分较小的图片仍采用 JPG or PNG 格式

![淘宝](https://u.jalenchuh.cn/use-webp/04.png)

#### 京东

京东官网中大部分图片均采用了 WebP 格式

![京东](https://u.jalenchuh.cn/use-webp/05.png)

对于极少的图片仍采用 JPG or PNG 格式，如 Logo 等

![京东](https://u.jalenchuh.cn/use-webp/06.png)

#### 腾讯、阿里云

两者均无 WebP 格式图片:-1:

### 大小

[^4]
![PNG WebP 对比1](https://u.jalenchuh.cn/use-webp/07.png)
![PNG WebP 对比2](https://u.jalenchuh.cn/use-webp/08.png)

这些都是较小图片的对比，感觉没差太多，于是乎自己找了几张大图测了下
图片名字为 分辨率 + 大小

![大图](https://u.jalenchuh.cn/use-webp/09.png)

好像图片有点大诶，由于采用本地软件[智图](https://zhitu.isux.us/)转换，CPU 直接拉满了 qaq:sob:

![CPU](https://u.jalenchuh.cn/use-webp/10.png)

而且两张图图还出错了 qaq，就成功了两张:sob:

![出错](https://u.jalenchuh.cn/use-webp/11.png)

这数据吓到我了  
5.7 MB 直接被干到了 74.2 KB  
11.6 MB 直接被干到了 266 KB

再来看看网络上一个[工具](https://renzhezhilu.gitee.io/webp2jpg-online/)的转换情况

![webp2jpg-online](https://u.jalenchuh.cn/use-webp/12.png)

也是很吓人，不过前两张和智图比一下就效果不怎么样了，但是智图有对图片进行适当压缩，所以...

原本四张图总大小 87.5 MB，现在 15.7 MB  
反正都 NB 就是了

再说下智图的压缩，和网络上处理的对比了下，除非放大看细节，要不然没差

三张对比图放在蓝奏云上了 <https://jalen.lanzous.com/ibnfvza>

顺便再说下，WebP 是支持动图的，也就是说 GIF 也可以转成 WebP，不过目前我找到的大部分工具都不支持转换，[又拍云](https://www.upyun.com/webp)支持

### 总结

图片体积小，支持透明、动画，不过少数浏览器不支持  
~~万恶的~~ Safari 以后应该也是会支持的吧

能有效缓解网页加载过慢的情况 ~~（不配图加载最快了）~~  
还能有效缓解流量太大导致的费用过高（针对对象存储）

WebP 支持 Alpha 透明和 24-bit 颜色数，例如 PNG8 中的毛边问题是不会出现的

在大幅缩小体积的情况下保证了图片质量，所以还是非常推荐使用的

但是有的时候就很玄学了，我曾试过在 JPG 图片通过压缩工具压缩到体积很小的情况下，再去转成 WebP，体积反而变大了，这说明 JPG 比 WebP 体积更小吗？我觉得应该没有。  
本身 JPG 的体积已经很小了，图片质量也非常差，但是大部分情况 WebP 在差不多相同大小的情况下，图片质量能明显高出很多，不排除个例

真是因为这些优势，本站已将所有的图片换成了 WebP 格式（图标 icon 和个别特例除外）  
那对于~~万恶的~~ Safari 怎么办呢？  
加几行代码不就好了，~~简单高效（bushi）~~

```js
if ((sessionStorage.getItem('confirm') !== '1') && (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
    confirm('抱歉，本博客在 Safari 中大部分图片无法显示');
    sessionStorage.setItem('confirm', '1');
}
```

当然了，也可以通过一些 JS 代码来进行转换，但是效率不怎么高

还有就是又拍云支持 WebP 自适应，根据浏览器对 WebP 的支持情况，自动返回对应格式图片

希望 cos 等也能尽快出个这种功能

## 工具

最后来推荐些转换工具，当然了，可以自己写代码转换，但是我菜啊，只好找现成的

### 又拍云

[转换工具地址](https://www.upyun.com/webp)
这东西事实上是个 Demo，给用户体验用的，所以下载时需要手动右键另存为，不过它没限制上传数量啊

![又拍云](https://u.jalenchuh.cn/use-webp/13.png)

下面这张图片为 GIF to WebP

![又拍云](https://u.jalenchuh.cn/use-webp/14.png)

#### 优点

1. 智能压缩
2. 转换速度较快
3. 支持 GIF 转 WebP

#### 缺点

1. 不支持较大图片
2. 只能一张一张转换（可以开多个网页同时进行）
3. 不可自己调节质量

如果使用又拍云 CDN，可以开启 WebP 自适应  
智能判断浏览器是否支持 WebP，来决定返回 WebP 格式图片还是原图，从而减少网络传输消耗

![智能 WebP](https://u.jalenchuh.cn/use-webp/15.png)

### 智图

腾讯的东西，为数不多的一个良心产品，[官网](https://zhitu.isux.us/)
这东西不仅可以转成 WebP，还能优化图片

软件中需要在右上角的菜单中打开生成 WebP

![智图](https://u.jalenchuh.cn/use-webp/16.png)

会在图片相同位置新建一个文件夹，里面包含了智能处理后的图片和一个 WebP 文件夹

#### 优点

1. 智能压缩
2. 支持多张图一起转换

#### 缺点

1. 不支持较大图片
2. 不支持 GIF 转 WebP
3. 不可自己调节质量
4. 偶尔出现转换失败或提示文件格式错误

:::tip
软件中的质量调节对生成 WebP 图片无效
:::

### WebP Converter

[官网](https://webp-converter.com/)

![WebP Converter](https://u.jalenchuh.cn/use-webp/17.png)

options 可调节质量

#### 优点

1. 支持多张图一起转换
2. 可自行调节质量
3. 转换速度较快

#### 缺点

1. 限制 8MB 以下
2. 不支持 GIF 转 WebP

### webp2jpg-online

[官网](https://renzhezhilu.gitee.io/webp2jpg-online/)

![webp2jpg-online](https://u.jalenchuh.cn/use-webp/18.png)

options 可调节质量

#### 优点

1. 转换速度非常快
2. 支持多张图一起转换
3. 可自行调节质量
4. **可自行裁剪**
5. **支持大图片**
6. **支持 jpeg, jpg, png, gif, svg, ico, bmp 转 WebP**

还可以转换成 JPEG PNG ICO

#### 缺点

好像没找到缺点，还是托管在 gitee 的，访问速度非常快:laughing:

### 总结

上面推荐的工具用着都还不错，各有各的优势

我在转换时的优先级排序

单张图片：又拍云 > webp2jpg-online > 智图 > WebP Converter

大量图片：智图 > webp2jpg-online > WebP Converter > 又拍云

单张图片最优选又拍云是因为会智能压缩而且比较快，比较方便
多图主要还是因为智图有客户端，方便一点，webp2jpg-online 如果出客户端我肯定毫不犹豫选它

这篇文章在此之前一共 18 张图片，PNG 格式大小为 25.1 MB，Snipaste 直接100质量输出，智图转 WebP 之后仅 645 KB，直接就省了 24 MB 啊:+1:

![总结](https://u.jalenchuh.cn/use-webp/19.png)

[^1]: 参考 [A new image format for the Web](https://developers.google.com/speed/webp)
[^2]: 图片来源 [Can I use...](https://caniuse.com/#feat=webp)
[^3]: 来源 [Apple tests Google graphics format to speed up websites](https://www.cnet.com/news/apple-ios-macos-tests-googles-webp-graphics-to-speed-up-web/)
[^4]: 图片来源 [WebP 示例 (PNG 转 WebP)](https://isparta.github.io/compare-webp/index.html#12345)
