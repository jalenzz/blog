---
title: 【学习笔记】 Kotlin
date: 2020-03-22 15:47:25
tags: [学习笔记, Kotlin]
abbrlink: 42757
index_img: https://oss.royce2003.top/42757/index_img.webp
---

记录一些 Kotlin 的高阶函数以便复习
也会记录一些好玩的东西
<!--more-->
```kotlin
//生成一张00ff00的bmp图片
import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO

fun main() {
    var img = BufferedImage(100,100,BufferedImage.TYPE_INT_BGR)
    var w = 0 .. 99 //width
    var h = 0 .. 99 //height
    img.apply {
        for(i in w)
            for(j in h)
                setRGB(i,j,0x00ff00)
    }
    ImageIO.write(img,"bmp", File("a.bmp"))
}
```

```kotlin
data class Student(var name:String, var age:Int, var score:Int)
var student = listOf<Student>(
    Student("A",14,10),
    Student("B",13,50),
    Student("C",14,60),
    Student("D",15,80),
    Student("E",11,56),
    Student("F",17,74),
    Student("G",14,97),
    Student("H",11,100),
    Student("I",14,100),
    Student("J",15,66),
    Student("K",12,89),
    Student("L",14,100)
)

//DSL
fun List<Student>.FindAge(age:Int) { //扩展函数，可直接student.FindAge调用
    filter {
        it.age<age
    }.forEach(::println)
}
infix fun List<Student>.FindAge(age:Int) { //中缀表达式
    filter {
        it.age<age
    }.forEach(::println)
}
fun main() {
    println(student.maxBy { it.score }) //查找scorce最大的，只返回一个
    println(student.minBy { it.score })
    println(student.filter {
        (it.age>14) and (it.score<80)
    })
    println(student.map {
        "${it.name} : ${it.age}"
    })
    println(student.any {
        it.age == 14
    })
    println(student.count {
        it.age == 14
    })
    println(student.find { //find the first one
        it.age == 14
    })
    student.groupBy {
        it.age
    }.get(14)?.forEach { println(it) }

    student.FindAge(16) // 扩展函数调用
    student FindAge 16 // 中缀表达式调用

}
```