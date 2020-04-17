---
title: 【学习笔记】python
tags: [学习笔记, python]
abbrlink: 1a8f87d5
date: 2020-01-19 11:33:58
updated: 2020-01-31 11:33:58
index_img: https://cos.royce2003.top/1a8f87d5/index_img.webp
---

选择了 [小甲鱼老师的课程](https://www.bilibili.com/video/av27789609)进行 Python 入门，希望自己能坚持

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
这种情况下，list1 和 list3是一样的，他们指向同一片内存，list3 不过是 list1的别名，是引用。赋值操作（包括对象作为参数、返回值）不会开辟新的内存空间，它只是复制了新对象的引用。也就是说，除了 list3 这个名字以外，没有其它的内存开销。修改了 list1，就影响了 list3；同理，修改了 list3 就影响了 list1。

若进行拷贝，则当前列表不会受原列表影响
拷贝会创建新对象,拷贝产生的 list2 不再是 list1 了，它们也不指向同一片内存
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
python 中，在函数内对全局变量 new 进行修改并不会真正改变它的值
因为 python 会在函数中创建一个与 new 同名的局部变量，对局部变量进行赋值
'''

# 若一定要进行修改可使用 global 关键字
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
# fun2 无法在外部调用，且 fun2 内无法对 fun1 内的变量进行直接修改，但可通过  `nonlocal x` 强行声明为非局部变量进行修改
```

```python
# lambda 表达式 可理解为f(x)
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

filter 有两个参数，第一个参数可以是一个函数也可是 None，第二个参数为可迭代对象
第一个参数为 None 时，将第二个参数中为 True 的值筛选出并组成列表
第一个参数为函数时，将第二个参数中的每个值当作函数参数传入，并将返回 Ture 的值筛选出并组成列表
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

<p class="note note-info">下面的内容没有整理，有空再来吧</p>

```python
Python 3.8.1 (tags/v3.8.1:1b293b6, Dec 18 2019, 22:39:24) [MSC v.1916 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license()" for more information.

>>> t = frozenset([1,4,5,6,7,8])
>>> t
>>> frozenset({1, 4, 5, 6, 7, 8})
>>> help(open)
>>> Help on built-in function open in module io:

open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
    Open file and return a stream.  Raise OSError upon failure.
    

    file is either a text or byte string giving the name (and the path
    if the file isn't in the current working directory) of the file to
    be opened or an integer file descriptor of the file to be
    wrapped. (If a file descriptor is given, it is closed when the
    returned I/O object is closed, unless closefd is set to False.)
    
    mode is an optional string that specifies the mode in which the file
    is opened. It defaults to 'r' which means open for reading in text
    mode.  Other common values are 'w' for writing (truncating the file if
    it already exists), 'x' for creating and writing to a new file, and
    'a' for appending (which on some Unix systems, means that all writes
    append to the end of the file regardless of the current seek position).
    In text mode, if encoding is not specified the encoding used is platform
    dependent: locale.getpreferredencoding(False) is called to get the
    current locale encoding. (For reading and writing raw bytes use binary
    mode and leave encoding unspecified.) The available modes are:
    
    ========= ===============================================================
    Character Meaning
    --------- ---------------------------------------------------------------
    'r'       open for reading (default)
    'w'       open for writing, truncating the file first
    'x'       create a new file and open it for writing
    'a'       open for writing, appending to the end of the file if it exists
    'b'       binary mode
    't'       text mode (default)
    '+'       open a disk file for updating (reading and writing)
    'U'       universal newline mode (deprecated)
    ========= ===============================================================
    
    The default mode is 'rt' (open for reading text). For binary random
    access, the mode 'w+b' opens and truncates the file to 0 bytes, while
    'r+b' opens the file without truncation. The 'x' mode implies 'w' and
    raises an `FileExistsError` if the file already exists.
    
    Python distinguishes between files opened in binary and text modes,
    even when the underlying operating system doesn't. Files opened in
    binary mode (appending 'b' to the mode argument) return contents as
    bytes objects without any decoding. In text mode (the default, or when
    't' is appended to the mode argument), the contents of the file are
    returned as strings, the bytes having been first decoded using a
    platform-dependent encoding or using the specified encoding if given.
    
    'U' mode is deprecated and will raise an exception in future versions
    of Python.  It has no effect in Python 3.  Use newline to control
    universal newlines mode.
    
    buffering is an optional integer used to set the buffering policy.
    Pass 0 to switch buffering off (only allowed in binary mode), 1 to select
    line buffering (only usable in text mode), and an integer > 1 to indicate
    the size of a fixed-size chunk buffer.  When no buffering argument is
    given, the default buffering policy works as follows:
    
    * Binary files are buffered in fixed-size chunks; the size of the buffer
      is chosen using a heuristic trying to determine the underlying device's
      "block size" and falling back on `io.DEFAULT_BUFFER_SIZE`.
      On many systems, the buffer will typically be 4096 or 8192 bytes long.
    
    * "Interactive" text files (files for which isatty() returns True)
      use line buffering.  Other text files use the policy described above
      for binary files.
    
    encoding is the name of the encoding used to decode or encode the
    file. This should only be used in text mode. The default encoding is
    platform dependent, but any encoding supported by Python can be
    passed.  See the codecs module for the list of supported encodings.
    
    errors is an optional string that specifies how encoding errors are to
    be handled---this argument should not be used in binary mode. Pass
    'strict' to raise a ValueError exception if there is an encoding error
    (the default of None has the same effect), or pass 'ignore' to ignore
    errors. (Note that ignoring encoding errors can lead to data loss.)
    See the documentation for codecs.register or run 'help(codecs.Codec)'
    for a list of the permitted encoding error strings.
    
    newline controls how universal newlines works (it only applies to text
    mode). It can be None, '', '\n', '\r', and '\r\n'.  It works as
    follows:
    
    * On input, if newline is None, universal newlines mode is
      enabled. Lines in the input can end in '\n', '\r', or '\r\n', and
      these are translated into '\n' before being returned to the
      caller. If it is '', universal newline mode is enabled, but line
      endings are returned to the caller untranslated. If it has any of
      the other legal values, input lines are only terminated by the given
      string, and the line ending is returned to the caller untranslated.
    
    * On output, if newline is None, any '\n' characters written are
      translated to the system default line separator, os.linesep. If
      newline is '' or '\n', no translation takes place. If newline is any
      of the other legal values, any '\n' characters written are translated
      to the given string.
    
    If closefd is False, the underlying file descriptor will be kept open
    when the file is closed. This does not work when a file name is given
    and must be True in that case.
    
    A custom opener can be used by passing a callable as *opener*. The
    underlying file descriptor for the file object is then obtained by
    calling *opener* with (*file*, *flags*). *opener* must return an open
    file descriptor (passing os.open as *opener* results in functionality
    similar to passing None).
    
    open() returns a file object whose type depends on the mode, and
    through which the standard file operations such as reading and writing
    are performed. When open() is used to open a file in a text mode ('w',
    'r', 'wt', 'rt', etc.), it returns a TextIOWrapper. When used to open
    a file in a binary mode, the returned class varies: in read binary
    mode, it returns a BufferedReader; in write binary and append binary
    modes, it returns a BufferedWriter, and in read/write mode, it returns
    a BufferedRandom.
    
    It is also possible to use a string or bytearray as a file for both
    reading and writing. For strings StringIO can be used like a file
    opened in a text mode, and for bytes a BytesIO can be used like a file
    opened in a binary mode.

>>> f = open('G:/aaa.txt')
>>> f
>>> <_io.TextIOWrapper name='G:/aaa.txt' mode='r' encoding='cp936'>
>>> f.read()
>>> Traceback (most recent call last):
>>> File "<pyshell#5>", line 1, in <module>
>>> f.read()
>>> UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 4: illegal multibyte sequence
>>> f = open('G:\\aaa.txt')
>>> f
>>> <_io.TextIOWrapper name='G:\\aaa.txt' mode='r' encoding='cp936'>
>>> f.read()
>>> Traceback (most recent call last):
>>> File "<pyshell#8>", line 1, in <module>
>>> f.read()
>>> UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 4: illegal multibyte sequence
>>> f
>>> <_io.TextIOWrapper name='G:\\aaa.txt' mode='r' encoding='cp936'>
>>> f.readline()
>>> ''
>>> f = open('G:\\aaa.txt')
>>> f
>>> <_io.TextIOWrapper name='G:\\aaa.txt' mode='r' encoding='cp936'>
>>> f.readline)
>>> SyntaxError: unmatched ')'
>>> f.readline()
>>> Traceback (most recent call last):
>>> File "<pyshell#14>", line 1, in <module>
>>> f.readline()
>>> UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 4: illegal multibyte sequence
>>> f.readline()
>>> ''
>>> f.close
>>> <built-in method close of _io.TextIOWrapper object at 0x0376CA78>
>>> f = open('G:\\aaa.txt')
>>> f
>>> <_io.TextIOWrapper name='G:\\aaa.txt' mode='r' encoding='cp936'>
>>> f.read()
>>> Traceback (most recent call last):
>>> File "<pyshell#19>", line 1, in <module>
>>> f.read()
>>> UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 4: illegal multibyte sequence
>>>
>>> f = open('G:\\aaa.txt')
>>> f
>>> <_io.TextIOWrapper name='G:\\aaa.txt' mode='r' encoding='cp936'>
>>> f.read()
>>> 'aaaaa\nbbbbb\nccccc\nddddd\nfffff\nggggg\nhhhhh\niiiii\njjjjj\nkkkkk'
>>> f.colse()
>>> Traceback (most recent call last):
>>> File "<pyshell#24>", line 1, in <module>
>>> f.colse()
>>> AttributeError: '_io.TextIOWrapper' object has no attribute 'colse'
>>> f.close()
>>> f = open('G:\\aaa.txt')
>>> f.read(7)
>>> 'aaaaa\nb'
>>> f.tell()
>>> 8
>>> f.seek(8,0)
>>> 8
>>> f.readline()
>>> 'bbbb\n'
>>> f.seek(10,0)
>>> 10
>>> f.readline()
>>> 'bb\n'
>>> list(f)
>>> ['ccccc\n', 'ddddd\n', 'fffff\n', 'ggggg\n', 'hhhhh\n', 'iiiii\n', 'jjjjj\n', 'kkkkk']
>>> f.seek(0,0)
>>> 0
>>> for each_line in list(f):
>>> print(each_line)


aaaaa

bbbbb

ccccc

ddddd

fffff

ggggg

hhhhh

iiiii

jjjjj

kkkkk
>>> f.seek(0,0)
>>> 0
>>> for each_line in f:
>>> print(each_line)


aaaaa

bbbbb

ccccc

ddddd

fffff

ggggg

hhhhh

iiiii

jjjjj

kkkkk
>>> f = open('G:\\test.txt','w')
>>> f.write('abcdefg')
>>> 7
>>> f.close()
```
未完...........