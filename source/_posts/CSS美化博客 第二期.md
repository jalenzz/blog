---
title: CSS美化博客 第二期
tags:
  - 教程
  - NexT
  - Hexo
  - CSS
abbrlink: 17142
date: 2020-02-26 16:43:12
index_img: https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_94a1b9ce_7356_3822@1600x719.jpeg
---
![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_94a1b9ce_7356_3822@1600x719.jpeg)


哪个男孩子不想要个炫酷的博客
哪个女孩子不想要个美美是博客
所以，第二期主要讲圆角动画
好像没啥因果关系

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_886f2e08_7356_3824@271x265.gif)

在此期间已经有大佬[@Moce_Hu](https://www.coolapk.com/u/Moce_Hu) 催更，然鹅他自己已经做了圆角动画
可能这就是大佬吧
该教程面向小白，大佬请略过全文
如果你是真的想学css，建议通过专业方法学习，此教程只是为了帮助小白利用css美化博客，所以方法略微有些奇怪。也感谢对于上篇文章大佬们的评论建议!
<!--more-->
首先，制作圆角动画需要认识一个css新属性border-radius ，他用来向元素添加圆角边框。最简单的用法就是在后面加上 多少px

```css
.header-inner {
	border-radius: 15px;
}
```

我们先从菜单栏开始改起

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_40ed0f7d_7356_3828@1918x928.jpeg.m.jpg)

左边HTML代码中我们找到了对应菜单栏的一行，其中class="header-inner" header-inner我们称他为类名，你会发现类名和右边css中对应的红色字是一样的，没错，这两个就相当于做一个标记，告诉浏览器，我这个标签需要那个css样式。
上期也有人说到既然找到了类名，为什么不直接去修改css代码而是新建应该文件来写？该主题本身的css代码非常非常多，如果你在里面改，万一哪天出错了，你得跑到你部署的平台去翻版本对比，就回变得比较麻烦，而你直接写在新文件中会变得方便很多，当然了，这方法也有缺点，比如很多样式需要加
!important这是非常不好的地方

找到了对应的css接下来直接写入就行了

```css
.header-inner {
	border-radius: 15px;
}
```



后面的值越大，圆角也越大
接着找打其他元素对应的css，依次加入代码就好啦
通过寻找
发现博客文章那个框框是post-block

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_1ea14b4a_7356_3832@1920x1036.jpeg.m.jpg)

那就加入如下代码

```css
.post-block {
	border-radius: 15px !important;
}
```

然后是侧边栏
寻找发现是`sidebar-inner`

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_f07e2f1d_7356_3836@1920x1037.jpeg.m.jpg)

加入如下代码

```css
.sidebar-inner{
	border-radius: 15px;
}
```

这里有个小坑

侧边框，也就是那个有头像的地方，这里作者放了两层东西，可以当做图层理解，如果你只是让其中一层圆角，那么另一层任然是直角
所以我们刚刚修改了，但是并没有完全起效果，会出现这种情况

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_61fff449_7361_3208@421x220.jpeg.m.jpg)

所以侧边栏中我们需要修改两个

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_f60854e0_9009_2345@1920x1040.jpeg.m.jpg)

```css
.sidebar {
	border-radius: 15px !important;
}
.sidebar-inner {
	border-radius: 15p×;
}
```

关于图层，推荐阅读[@我是天小正](https://www.coolapk.com/u/我是天小正) 的图文写的很好

接下来就是触碰恢复直角和阴影了
直角很简单，也就是不要圆角
那直接写`border-radius = 0px;`
阴影我们需要认识一个新的css属性
`box-shadow`，用法如下
`box-shadow: h-shadow v-shadow blur spread color inset;`
其中`h-shadow v-shadow`是必须要写的，其他随便，那这里就不介绍其他的了
`h-shadow`是水平阴影的位置，那v-shadow就是垂直阴影的位置了
还有`color`说下

大家应该都懂吧，也就是阴影的颜色  
那事情就变得简单了  
再把这个东西加进去就好啦  
下面是我的源码  

```css
.post-block:hover,
.header-inner:hover,
.sidebar:hover,
.sidebar-inner:hover,
.comments:hover {
	border-radius: 0px !important;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .6), 0 0 6px 0 rgba(0, 0, 0, .6);
}
```



但仅仅这样是不行的
你会发现他真的是圆角变直角，也加上了阴影，但是完全没有过度，就是硬生生的变过去

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_6eda9c46_7361_3214@292x233.gif)

丑爆了
那接下来我们需要给他加上动画  
可能大家认为这过程非常非常复杂，但是看看标题如何用css的几行代码美化网站
所以只需要一行代码就解决啦  
我们得先认识一个新属性  
`transition-duration`，规定某一个元素完成过渡效果需要的时间，默认是0，所以就是没过渡效果  
用法很简单，后面加上时间就好啦，还需要加单位  
我们先拿菜单栏试试，比如这样写  

```css
.header-inner {
	border-radius: 15px;
}
.header-inner: hover {
	transition-duration: .5s;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .6), 0 0 6px 0 rgba(0, 0, 0, .6);
	border-radius: 0px;
}
```

然后就会有这样的效果

![aaa](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_59053e39_7361_3218@452x376.gif)

很清楚的可以看到，鼠标上去恢复直角是有过渡的了，但是鼠标移开的时候就没过渡动画了  
看看代码，我把transition-duration写到了xx:hover里面，前面说过了，他是规定这个标签过渡需要的时间，我写入：hover中也就意味着只在这个标签被触碰时生效，所以我们应该不应该放入hover中，而应该这样  

```css
.header-inner {
	transition-duration: .5s;
	border-radius: 15px;
}
.header-inner:hover {
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .6), 0 0 6px 0 rgba(0, 0, 0, .6);
	border-radius: 0px;
}
```

可能由于我比较菜当初就跳进了这个坑  
那么其他的按这个修改下，就大功告成了 

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_886f2e08_7356_3824@271x265.gif)

关于border-radius再说下  
其实transition-duration包含了

`border-top-left-radius`  
`border-top-right-radius  `
`border-bottom-left-radius`   
`border-bottom-right-radius`  

也就是你可以用一个来设置四个角  
也可以每个角单独设置  
比如这上面的一行和下面的四行效果是一样的

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_7d24f093_7361_3221@1028x568.png.m.jpg)

知道了这个东西我们还可以设置菜单栏顶上那个黑黑的东西

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_433bb9d2_7366_3371@812x660.png.m.jpg)

下面是效果

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_d9dc472f_7366_3373@384x265.gif)

虽说这个也可以直接四个角一起设置

再顺带讲个透明度吧
也需要认识一个新属性opacity
用法也很简单，后面直接加0～1的小数，1是不透明，0是全透明
比如这样

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_80164241_7366_3375@1028x448.png.m.jpg)

就像这样，菜单栏有设置透明，而其他没有

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_322faf31_7366_3377@458x709.jpeg.m.jpg)

接下来附上全部源码

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_b6daa349_9009_8915@1412x2536.png.m.jpg)

番外
其实是先讲一点下一期的东西啦
首页的那个头像，在主题配置里可以开启触碰旋转，但是这里毕竟是大佬聚集地，那我们不如自己写一个



首先认识一个新属性  
这篇图文的最后一个了  
transform，可对元素进行旋转等  
这次只需要用到旋转，所以也只讲这个  
用法如下  
transform: rotate(10deg)  
旋转10º  
正的顺时针转，负的逆时针转  
然后找到对应css  

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_58276f48_7366_3381@1920x1027.jpeg.m.jpg)

然后加入代码

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_0d7f20c5_7366_3383@768x548.png.m.jpg)

然后就好啦

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_2c56a3d1_7366_3385@211x223.gif)

我们还可以转多一点

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_809bae87_9010_5858@211x223.gif)

还可以再快一点

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_d446060d_7372_0258@211x223.gif)

再快一点

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_332021db_7372_026@211x223.gif)

好吧由于帧率限制，再快就录不出来效果了



第三期应该快来了  
先上效果图

![](https://gitee.com/Royce2003/blogimages/raw/master/img/2335206_3825e33f_9010_586@1057x986.gif)