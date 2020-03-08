---
title: 【学习笔记】python
tags: [学习笔记, python]
abbrlink: 1a8f87d5
date: 2020-01-19 11:33:58
updated: 2020-01-31 11:33:58
index_img: https://cdn.jsdelivr.net/gh/Royce2019/img/links-img/1e9726e77f5a9377ce09d493d3add5b9_1_3_art.jpg
---

选择了[小甲鱼老师的课程](https://www.bilibili.com/video/av27789609)进行Python入门，希望自己能坚持

因为有其他语言基础，笔记里只会记录一些新的东西

<!--more-->

```python
# python支持多行字符串
>>> str = """aaa
bbb
ccc
ddd
"""

>>> str
aaa\nbbb\nccc\nddd\n

>>> print(str)
aaa
bbb
ccc
ddd
```



```python
# 随机数
>>> inport random # 引用库
>>> t = random.randint(1,100) # 1~100内随机数
>>> t
75
```



```python
>>> 12e10
120000000000.0
>>> 12e-10
1.2e-09
```



```python
# append extend insert
>>> t = [123, 456, 789, 'aaa', 'bbb']
>>> t.append('ccc') # append()方法向列表的尾部添加一个新的元素
>>> t
[123, 456, 789, 'aaa', 'bbb', 'ccc']
>>> t.extend(['ddd','eee']) # extend()方法只接受一个列表作为参数
>>> t
[123, 456, 789, 'aaa', 'bbb', 'ccc', 'ddd', 'eee']
>>> t.insert(3,100) # 在列表中的3位置插入100
>>> t
[123, 456, 789, 100, 'aaa', 'bbb', 'ccc', 'ddd', 'eee']
```



```python
# isinstance
>>> isinstance(True,bool) # True是否为bool类型
True
>>> isinstance(123,bool) # 123是否为bool类型
False
>>> isinstance(1,str) # 1是否为str类型
False
```



```python
>>> member = ['aaa',10,'bbb',20,'ccc',30]

# range内一个参数表示[0,2)循环
>>> for i in range(2):
	print(member[i])

aaa
10

# 两个参数表示[2,4)循环
>>> for i in range(2,4):
	print(member[i])

bbb
20

# 三个参数，[0,len(member)),每次i+=2
>>> for i in range(0,len(member),2):
	print(member[i],member[i+1])

aaa 10
bbb 20
ccc 30
# python中的print自带换行
```



```python
#assert（断言）
>>> assert 5>4 # 条件为 true 正常执行
>>> assert 3>4 # 条件为 false 触发异常
Traceback (most recent call last):
  File "<pyshell#22>", line 1, in <module>
    assert 3>4
AssertionError

'''
assert（断言）用于判断一个表达式，在表达式条件为 false 的时候触发异常。
断言可以在条件不满足程序运行的情况下直接返回错误，而不必等待程序运行后出现崩溃的情况。
例如我们的代码只能在 Linux 系统下运行，可以先判断当前系统是否符合条件。
'''
import sys
assert ('linux' in sys.platform) # 该代码只能在 Linux 下执行
```



```python
# split
>>> string = 'this is strng example'
>>> print(string.split( )) # 以空格为分隔符
['this', 'is', 'strng', 'example']
>>> print(string.split('i')) # 以i为分隔符
['th', 's ', 's strng example']

>>> n = 1
>>> print(string.split('i',n)) # 以i为分隔符,返回有n+1个元素的列表
['th', 's is strng example'] # n=1，有2个元素
>>> n = 2
>>> print(string.split('i',2))
['th', 's ', 's strng example'] # n=2,有3个元素
```



```python
# remove del pop
>>> t
[123, 456, 789, 'aaa', 'bbb', 'ccc', 'ddd', 'eee']
>>> t.remove(123) # 删除t中的123
>>> t
[456, 789, 'aaa', 'bbb', 'ccc', 'ddd', 'eee']
>>> del t[0] # 删除t中的第0个元素
>>> t
[789, 'aaa', 'bbb', 'ccc', 'ddd', 'eee']
>>> t.pop() # 弹出t中的最后一个元素
'eee'
>>> a = t.pop() # pop()有返回值
>>> a
'ddd'
```



```python
# 列表拷贝
>>> list1 = [11,22,33,44,55]
>>> list2 = list1[2:4] # 将list1 [2,4)拷贝到list2
>>> list2
[33, 44]
>>> list2 = list1[:3] #若没有第一个参数时默认从0开始
>>> list2
[1, 2, 3]
>>> list2 = list1[2:] #若没有第二个参数时默认到结尾
>>> list2
[3, 4, 5]
>>> list2 = list1[:] #若两个参数都没有则完整拷贝
>>> list2
[1, 2, 3, 4, 5]

# 需要注意的时拷贝与直接相等是有区别的
>>> list2 = list1[:]
>>> list3 = list1
>>> list1.pop()
>>> list1
[1, 2, 3, 4]
>>> list2
[1, 2, 3, 4, 5]
>>> list3
[1, 2, 3, 4]
'''
直接相等时，会受原列表影响
这种情况下，list1和list3是一样的，他们指向同一片内存，list3不过是list1的别名，是引用。赋值操作（包括对象作为参数、返回值）不会开辟新的内存空间，它只是复制了新对象的引用。也就是说，除了list3这个名字以外，没有其它的内存开销。修改了list1，就影响了list3；同理，修改了list3就影响了list1。

若进行拷贝，则当前列表不会受原列表影响
拷贝会创建新对象,拷贝产生的list2不再是list1了，它们也不指向同一片内存
'''
```



```python
# count index
>>> list1 = [123,123,345,345,345,456]
>>> list1.count(345) # 返回值为list1中345的个数
3
>>> list1.index(345) # 返回值为list1中第一个345出现的位置
2
>>> list1.index(345,3,5) # 返回值为list1在[3,5)第一个345出现的位置
3
```



```python
>>> list1 = [1,9,2,8,3,7,4,6,5]
>>> list1.reverse() # 全部反转
>>> list1
[5, 6, 4, 7, 3, 8, 2, 9, 1]
>>> list1.sort() # 默认升序
>>> list1
[1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> list1 = [1,9,2,8,3,7,4,6,5]
>>> list1.sort(reverse=True) # 排序，reverse参数值为True时降序，默认值（不赋值）为升序
>>> list1
[9, 8, 7, 6, 5, 4, 3, 2, 1]


>>> list1 = [3, 6, 2, 7, 34, 6]
>>> list(reversed(list1))
[6, 34, 7, 2, 6, 3]

>>> sorted(list1)
[2, 3, 6, 6, 7, 34]

>>> list(enumerate(list1))
[(0, 3), (1, 6), (2, 2), (3, 7), (4, 34), (5, 6)]

>>> a = [1, 2, 3, 4, 5, 6, 7, 8]
>>> b = [4, 5, 6, 7, 8]
>>> list(zip(a,b))
[(1, 4), (2, 5), (3, 6), (4, 7), (5, 8)]
```



```python
# 元组
>>> tuple1 = (1, 2, 3, 4, 5, 6, 7, 8)
>>> tuple1
(1, 2, 3, 4, 5, 6, 7, 8)
>>> tuple1[1]
2
>>> tuple1[5:]
(6, 7, 8)
>>> tuple1[5:]
(6, 7, 8)
>>> tuple2 = tuple1[:]
>>> tuple2
(1, 2, 3, 4, 5, 6, 7, 8)

# 元组的标志为逗号
>>> temp = (1)
>>> temp
1
>>> type(temp)
<class 'int'>

>>> temp2 = 2, 3, 4
>>> type(temp2)
<class 'tuple'>

>>> temp = [] # 空列表定义方式
>>> type(temp)
<class 'list'>
>>> temp = () # 空元组定义方式
>>> type(temp)
<class 'tuple'>

>>> 8 * (8,)
(8, 8, 8, 8, 8, 8, 8, 8)


# 元组不可修改
>>> tuple1[1] = 3
Traceback (most recent call last):
  File "<pyshell#7>", line 1, in <module>
    tuple1[1] = 3
TypeError: 'tuple' object does not support item assignment
# 但可利用拷贝和拼接方法
>>> temp = ('aa','bb','cc','dd')
>>> temp = temp[:2] + ('kkk',) + temp[2:]
>>> temp
('aa', 'bb', 'kkk', 'cc', 'dd')
# 同，字符串也不可单独修改
```

```python
def function(new):
    new = 10
    print('函数内求改全局变量后new为',new)
new = 50
function(new)
print(new)
程序输出：
函数内修改全局变量后new为 10
50
'''
python中，在函数内对全局变量new进行修改并不会真正改变它的值
因为python会在函数中创建一个与new同名的局部变量，对局部变量进行赋值
'''

# 若一定要进行修改可使用global关键字
def function(new):
    global new = 10
    print('函数内求改全局变量后new为',new)
new = 50
function(new)
print(new)
程序输出：
函数内修改全局变量后new为 10
10
```

```python
闭包
>>> def fun1(x):
	def fun2(y):
		return x * y
	return fun2

>>> i = fun1(8)
>>> i
<function fun1.<locals>.fun2 at 0x03F17070>
>>> type(i)
<class 'function'>
>>> i(5)
40
>>> fun1(8)(5)
40
# fun2无法在外部调用，且fun2内无法对fun1内的变量进行直接修改，但可通过  `nonlocal x` 强行声明为非局部变量进行修改
```

```python
# lambda表达式 可理解为f(x)
>>> lambda x : 2 * x +1
<function <lambda> at 0x03F17070>
>>> i = lambda x : 2 * x +1
>>> i(2)
5
>>> lambda x,y : x * y
<function <lambda> at 0x03F17070>
>>> t = lambda x,y : x * y
>>> t(5,8)
40
```

```python
'''
filter 过滤器
filter(function or None, iterable（可迭代对象）) --> filter object
Return an iterator yielding those items of iterable for which function(item) is true.
If function is None, return the items that are true.

filter有两个参数，第一个参数可以是一个函数也可是None，第二个参数为可迭代对象
第一个参数为None时，将第二个参数中为True的值筛选出并组成列表
第一个参数为函数时，将第二个参数中的每个值当作函数参数传入，并将返回Ture的值筛选出并组成列表
'''
>>> def odd(x):
	return x % 2

>>> list(filter(None,[1,0,False,True]))
[1, True]
>>> list(filter(odd,range(10)))
[1, 3, 5, 7, 9]

# lambda表达式写法
>>> list(filter(lambda x : x % 2,range(10)))
[1, 3, 5, 7, 9]
```

```python
'''
map 映射
map(func, *iterables) --> map object
Make an iterator that computes the function using arguments from each of the iterables. Stops when the shortest iterable is exhausted.
可迭代对象中的每个值传入函数，并将返回值组成列表
'''
>>> list(map(lambda x : x * x,range(10)))
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

```python
# 字典
>>> t = {1:'one',2:'two',3:'three'} # 使用花括号
>>> t[1]
'one'
>>> t[3]
'three'
```

未完...........