---
title: "P3368 【模板】树状数组 2"
date: 2020-03-26
published: true
license: true
slug: fenwick-tree-2
tags: ['Algorithm']
cate: tech
canonical_url: false
---

### 题目

[^1]

#### 题目描述

如题，已知一个数列，你需要进行下面两种操作：

1. 将某区间每一个数数加上 $x$；
2. 求出某一个数的值。
<!--more-->
#### 输入格式

第一行包含两个整数 $N$、$M$，分别表示该数列数字的个数和操作的总个数。

第二行包含 $N$ 个用空格分隔的整数，其中第 $i$ 个数字表示数列第 $i$ 项的初始值。

接下来 $M$行每行包含 2 或 4 个整数，表示一个操作，具体如下：

操作 1： 格式：`1 x y k` 含义：将区间 $x,y$ 内每个数加上 $k$；

操作 2： 格式：`2 x` 含义：输出第 $x$ 个数的值。

#### 输出格式

输出包含若干行整数，即为所有操作 2 的结果。

#### 输入输出样例

**输入 #1**

```text
5 5
1 5 4 2 3
1 2 4 2
2 3
1 1 5 -1
1 3 5 7
2 4
```

**输出 #1**

```text
6
10
```

#### 说明/提示

##### 样例 1 解释：

![解释](https://rmt.dogedoge.com/fetch/royce/storage/fenwick-tree-2/01.png?fmt=webp)

故输出结果为 6、10。

------

##### 数据规模与约定

对于 $30\%$ 的数据：$N\le8,M\le10$；

对于 $70\%$ 的数据：$N\le 10000,M\le10000$；

对于 $100\%$ 的数据：$1 \leq N, M\le 500000$，$1 \leq x, y \leq n$，保证任意时刻序列中任意元素的绝对值都不大于 $2^{30}$。

### 题解

上一篇文章已经讲了`树状数组 1`，单点修改区间查询。

树状数组 2 需要实现的是区间修改，单点查询。

并且树状数组 2 要完全依赖于树状数组 1，仅在 1 的基础上引入差分数组

通过差分数组将其转换为单点修改区间查询，没错，就是树状数组 1，的单点修改区间查询

说到差分我就想到了 xzt 卖煎饼，想到 xzt 卖煎饼我就想到了暴力 $O(nm)$ 解法，想到这个解法就想到了我是多么菜鸡<img src="https://rmt.dogedoge.com/fetch/royce/storage/fenwick-tree-2/02.png?fmt=webp" data-align="inline">

#### 前置知识 差分数组

现有一序列 $A$
$$
A={3,\,1,\,4,\,1,\,5,\,9,\,2,\,6,\,5}
$$
建立一个差分数组 $D$, 使得 $D_i=A_i-A_{i-1}$
$$
D={3,\;-2,\,3,\,-3,\,4,\,4,\,-7,\,4,\,-1}
$$

此时将 $A$ 序列中 $A_3 \sim A_5$ 都加上 3，得到新的 $A$
$$
A={3,\,1,\,7,\,4,\,8,\,9,\,2,\,6,\,5}
$$
此时再更新 $D$ 数组
$$
D={3,\,-2,\,6,\,-3,\,4,\,1,\,-7,\,4,\,-1}
$$
不难发现，在 $A$ 序列的 $A_i \sim A_j$ 区间分别加上 $n$ ，在差分数组 $D$ 中就相当于 $D_i\;+=\; n,\;D_{j+1}\;-=\;n$

相信聪明的你已经发现了，这里出现了树状数组 1的单点修改

#### 查询

这个也就变的很简单了，利用差分数组的性质，假设我们要求 $A_3$

那么

$$
A_3=D_1+D_2+D_3
$$
好啦，就是这么简单

### 结束

附上 AC 代码

```cpp
#include <cstdio>

int n,m,k,x,aa,l,r;
int a[500110],c[500110];

int read() {
    bool flag = 1;
    int x = 0;
    char ch = getchar();
    while (ch<'0' || ch>'9') {if (ch == '-') flag = 0; ch = getchar();}
    while (ch>='0' && ch<='9') {x *= 10;x += ch-'0';ch=getchar();}
    return flag ? x:-x;
}
int lowbit(int x) {
    return x & -x;
}
void add(int x,int k) {
    while (x<=n) {
        c[x] += k;
        x += lowbit(x);
    }
}
int find(int x) {
    int sum = 0;
    while (x) {
        sum += c[x];
        x -= lowbit(x);
    }
    return sum;
}

int main() {
    n = read(); m = read();
    for (int i=1; i<=n; i++) {
        a[i] = read();
        add(i, a[i]-a[i-1]);
    }
    while (m--) {
        aa = read();
        if (aa==1) {
            l = read(); r = read(); k =read();
            add(l,k);
            add(r+1,-k);
        }
        else {
            k = read();
            printf("%d\n", find(k));
        }
    }
    return 0;
}
```

[^1]: 题目来源：[P3368 【模板】树状数组 2 - 洛谷 | 计算机科学教育新生态](https://www.luogu.com.cn/problem/P3368)
