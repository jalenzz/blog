---
title: "P3372 【模板】线段树 1"
date: 2020-06-05
published: true
license: true
slug: segment-tree-1
tags: ['Algorithm']
cate: tech
canonical_url: false
---

## 题目

[^1]

### 题目描述

如题，已知一个数列，你需要进行下面两种操作：

1. 将某区间每一个数加上 $k$。
2. 求出某区间每一个数的和。

### 输入格式

第一行包含两个整数 $n, m$，分别表示该数列数字的个数和操作的总个数。

第二行包含 $n$ 个用空格分隔的整数，其中第 $i$ 个数字表示数列第 $i$ 项的初始值。

接下来 $m$ 行每行包含 $3$ 或 $4$ 个整数，表示一个操作，具体如下：

1. `1 x y k`：将区间 $[x, y]$ 内每个数加上 $k$。
2. `2 x y`：输出区间 $[x,y]$ 内每个数的和。

### 输出格式

输出包含若干行整数，即为所有操作 2 的结果。

### 输入输出样例

**输入 #1**

```text
5 5
1 5 4 2 3
2 2 4
1 2 3 2
2 3 4
1 1 5 1
2 1 4
```

**输出 #1**

```text
11
8
20
```

### 说明/提示

对于 $30\%$ 的数据：$n \le 8$，$m \le 10$。  
对于 $70\%$ 的数据：$n \le {10}^3$，$m \le {10}^4$。  
对于 $100\%$ 的数据：$1 \le n, m \le {10}^5$。

保证任意时刻数列中任意元素的和在 $[-2^{63}, 2^{63})$ 内。

**【样例解释】**

![样例解释](https://rmt.dogedoge.com/fetch/royce/storage/2024/01.png?fmt=webp)

## 题解

:::tip
想认真学推荐看看这篇两篇

[浅谈线段树 - TRTTG - 博客园](https://www.cnblogs.com/TheRoadToTheGold/p/6254255.html)
[线段树 - OI Wiki](https://oi-wiki.org/ds/seg/)
:::

### 建树

一直二分，直到 到了叶子节点，输入数据，==记住 return==

非叶子节点的值为 左儿子+右儿子

```cpp
// 建树，k 当前节点
void build(LL l, LL r, LL k) {
    LL mid = (l + r) / 2;
    tree[k].l = l, tree[k].r = r;
    if (l == r) { // 判断叶子节点
        tree[k].w = read();
        return;
    }
    build(l, mid, 2*k);
    build(mid+1, r, 2*k+1);
    tree[k].w = tree[2*k].w + tree[2*k+1].w;
}
```

### 懒标记

> A 有两个儿子，一个是 B，一个是 C。
>
> 有一天 A 要建一个新房子，没钱。刚好过年嘛，有人要给 B 和 C 红包，两个红包的钱数相同都是 $1$ 元，然而因为 A 是父亲所以红包肯定是先塞给 A 咯~
>
> 理论上来讲 A 应该把两个红包分别给 B 和 C，但是……缺钱嘛，A 就把红包偷偷收到自己口袋里了。
>
> A 高兴地说：「我现在有 $2$ 份红包了！我又多了 $2 \times 1 = 2$ 元了！哈哈哈~」
>
> 但是 A 知道，如果他不把红包给 B 和 C，那 B 和 C 肯定会不爽然后导致家庭矛盾最后崩溃，所以 A 对儿子 B 和 C 说：「我欠你们每人 $1$ 份 $1$ 元的红包，下次有新红包给过来的时候再给你们！这里我先做下记录……嗯……我欠你们各 $1$ 元……」
>
> 儿子 B、C 有点恼怒：「可是如果有同学问起我们我们收到了多少红包咋办？你把我们的红包都收了，我们还怎么装？」
>
> 父亲 A 赶忙说：「有同学问起来我就会给你们的！我欠条都写好了不会不算话的！」
>
> 这样 B、C 才放了心。[^2]

举个例子：

要求 $4 \backsim 5$ 的数都加上 $2$

那么我们现在只需要将其父亲节点 $2$ 的懒标记 $+2$

需要用到的时候将懒标记下传给子节点

下传操作：

1. 两个子节点的懒标记分别加上父亲节点的懒标记的值

2. 子节点的值分别加上 $(r-l+1) \times$ 父亲节点的懒标记值。$(r-l+1)$ 表示该节点之下还有多少节点，这里必须乘父亲节的懒标记的值，而不是自己的懒标记，因为自身的懒标记可能还包含上一次下传的值

3. 父亲节点懒标记归零

```cpp
// 懒标记下传，k 当前节点
void down(LL k) {
    tree[k * 2].f += tree[k].f;
    tree[k*2 + 1].f += tree[k].f;

    tree[k * 2].w += tree[k].f * (tree[k*2].r - tree[k*2].l + 1);
    tree[k*2 + 1].w += tree[k].f * (tree[k*2+1].r - tree[k*2+1].l + 1);

    tree[k].f = 0;
}
```

### 区间修改

$n = [l, r]$ 需要修改的区间，$m = [s, t]$ 当前区间

$n, m$ 只满足以下三种关系的一种

1. $m \subseteq n$
2. $m \cap n$ 不为空
3. $n \subseteq m$

#### 1

第一种情况 $m \subseteq n$，直接返回当前区间 $m$ 的值就行了

#### 2

第二种情况 $m \cap n$ 不为空

令 $mid= \frac{s+t}{2}$

1. $l \le mid$ 则说明待修改区间（一部分）在当前节点的左孩子
2. $r > mid$ 则说明待修改区间（一部分）在当前节点的右孩子

重复多次后就得到了情况 1
（画个图模拟下就明白了）

#### 3

第三种情况 $n \subseteq m$

解决方法和情况 2 相同

```cpp
// 区间修改 [l, r] 修改区间，[s, t]当前区间，k 当前节点，addition 修改的值
void update(LL l, LL r, LL k, LL addition) {
    LL s = tree[k].l, t = tree[k].r;
    LL mid = (s + t) / 2;

    if(l<=s && t<=r) {
        tree[k].f += addition;
        tree[k].w += addition * (t - s + 1);
        return;
    }

    // 不满足上面的 if，所以需要修改子节点，所以需要下传懒标记
    if(tree[k].f) down(k);
    if(l <= mid) update(l, r, k*2, addition);
    if(r > mid) update(l, r, 2*k+1, addition);
    tree[k].w = tree[2*k].w + tree[2*k+1].w;
}
```

### 区间查询

与区间修改基本一样

$n = [l, r]$ 需要查询的区间，$m = [s, t]$ 当前区间

$n, m$ 只满足以下三种关系的一种

1. $m \subseteq n$
2. $m \cap n$ 不为空
3. $n \subseteq m$

```cpp
// 区间查询，[l, r] 查询区间，[s, t]当前区间，k 当前节点
LL getsum(LL l, LL r, LL k) {
    LL s = tree[k].l, t = tree[k].r;
    LL mid = (s + t) / 2, sum = 0;

    // 不满足上面的 if，所以需要修改子节点，所以需要下传懒标记
    if(l<=s && t<=r) return tree[k].w;

    if(tree[k].f) down(k);
    if(l <= mid) sum += getsum(l, r, k*2);
    if(r > mid) sum += getsum(l, r, 2*k+1);
    return sum;
}
```

### 代码

```cpp
#include <cstdio>
#define LL long long

LL n, m;
struct node {
    LL l, r, w, f; // w 值，f 懒标记
}tree[400001]; // 大小 4 * n

LL read() {
    bool flag = 0; LL x = 0; char ch = getchar();
    while(ch<'0' || ch>'9') {if (ch == '-') flag = 1; ch = getchar();}
    while(ch>='0' && ch <= '9') {x *= 10; x += ch - '0'; ch = getchar();}
    return flag ? - x : x;
}

// 建树，k 当前节点
void build(LL l, LL r, LL k) {
    LL mid = (l + r) / 2;
    tree[k].l = l, tree[k].r = r;
    if (l == r) { // 判断叶子节点
        tree[k].w = read();
        return;
    }
    build(l, mid, 2*k);
    build(mid+1, r, 2*k+1);
    tree[k].w = tree[2*k].w + tree[2*k+1].w;
}

// 懒标记下传，k 当前节点
void down(LL k) {
    tree[k * 2].f += tree[k].f;
    tree[k * 2].w += tree[k].f * (tree[k*2].r - tree[k*2].l + 1);
    tree[k*2 + 1].f += tree[k].f;
    tree[k*2 + 1].w += tree[k].f * (tree[k*2+1].r - tree[k*2+1].l + 1);
    tree[k].f = 0;
}

// 单点修改，k 当前节点
void add(LL k, LL addition) {
    LL l = tree[k].l, r = tree[k].r;
    LL mid = (l + r) / 2;

    if (l == r) {
        tree[k].w += addition;
        return;
    }

    // 不满足上面的 if，所以需要修改子节点，所以需要下传懒标记
    if (tree[k].f) down(k);

    if (x <= mid) add(2 * k);
    else add(2*k + 1);
    tree[k].w = tree[2*k].w + tree[2*k+1].w;
}

// 单点查询，k 当前节点
LL ask(LL k) {
    LL l = tree[k].l, r = tree[k].r;
    LL mid = (l + r) / 2;

    // 不满足上面的 if，所以需要修改子节点，所以需要下传懒标记
    if (l == r) return tree[k].w;

    if (x <= mid) ask[2 * k];
    else ask(2*k + 1)
}

// 区间修改 [l, r] 修改区间，[s, t]当前区间，k 当前节点，addition 修改的值
void update(LL l, LL r, LL k, LL addition) {
    LL s = tree[k].l, t = tree[k].r;
    LL mid = (s + t) / 2;

    if(l<=s && t<=r) {
        tree[k].f += addition;
        tree[k].w += addition * (t - s + 1);
        return;
    }

    // 不满足上面的 if，所以需要修改子节点，所以需要下传懒标记
    if(tree[k].f) down(k);
    if(l <= mid) update(l, r, k*2, addition);
    if(r > mid) update(l, r, 2*k+1, addition);
    tree[k].w = tree[2*k].w + tree[2*k+1].w;
}

// 区间查询，[l, r] 查询区间，[s, t]当前区间，k 当前节点
LL getsum(LL l, LL r, LL k) {
    LL s = tree[k].l, t = tree[k].r;
    LL mid = (s + t) / 2, sum = 0;

    // 不满足上面的 if，所以需要修改子节点，所以需要下传懒标记
    if(l<=s && t<=r) return tree[k].w;

    if(tree[k].f) down(k);
    if(l <= mid) sum += getsum(l, r, k*2);
    if(r > mid) sum += getsum(l, r, 2*k+1);
    return sum;
}

int main() {
    n = read(), m = read();
    build(1, n, 1);

    while (m--) {
        LL t = read(), x = read(), y = read();
        if (t == 2)
            printf("%lld\n", getsum(x, y, 1, n, 1));
        else {
            LL k = read();
            update(x, y, 1, n, 1, k);
        }
    }
    return 0;
}
```

学完可以做做 [P2068 统计和](https://www.luogu.com.cn/problem/P2068)

[^1]: 题目来源 [【模板】线段树 1 - 洛谷](https://www.luogu.com.cn/problem/P3372)
[^2]: 来自 [线段树 - OI Wiki](https://oi-wiki.org/ds/seg/#_4)
