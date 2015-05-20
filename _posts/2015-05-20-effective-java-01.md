---
author: itxuye
comments: true
date: 2015-05-20 15:11:08 +0800
layout: post
slug: effective-java-01
title: Effective Java 1-避免创建不必要的对象
postid: 20
categories: 
- java知识
tags:
- java
---  
在编码的时候，最好能重用对象而不是在每次需要的时候创建一个相同功能的新对象。我们可以举一个String类的例子，String类常量一旦被赋值就不可被改变，就可以始终被重用。
<!-- more -->
{% highlight java %}
//这是不可取的，因为执行这条语句都会创建新的对象
String s1 = new String("hello world");
{% endhighlight %}
  
我们应当这样使用下面的方式。
{% highlight java %}
//java中，字符串常量存在方法区的字符串常量池中，方便相同内容的字符串复用
String s1 = "hello world";
{% endhighlight %}
  
对于同时提供了静态工厂方法和构造器的不可变类，通常可以使用静态工厂方法而不是构造器，以避免创建不必要的对象。例如，静态工厂方法Boolean.valueOf(String)要比Boolean(String)要好。构造器每次被调用的时候都会创建一个新的对象，而静态工厂方法则不会。
  
除了重用不可变的对象外，也可以重用那些不会被修改的可变对象。  
{% highlight java %}
public class Person{
    private final Date birthday;
    //不要这样使用
    public boolean isBiggerThanChina(){
        Calendar gmtCal = Calendar.getInstance(TimeZone.getTimeZone("GMY"));
        gmtCal.set(1949,Calendar.October,1,0,0,0);
        Date MyBirthday = gmtCal.getTime();
        return birthday.compareTo(MyBirthday) < 0;
    }
}
{% endhighlight %}
这段代码每次比较都会创建新的MyBirthday对象，显然这个是不需要修改的。可以这样写：  
{% highlight java %}
public class Person{
    private final Date birthday;
    //使用静态代码初始化，实例只被创建一次
    private static final Date chinaBirthday;
    static {
        Calendar gmtCal = Calendar.getInstance(TimeZone.getTimeZone("GMY"));
        gmtCal.set(1949,Calendar.October,1,0,0,0);
        Date MyBirthday = gmtCal.getTime();
    }
    public boolean isBiggerThanChina(){
        Calendar gmtCal = Calendar.getInstance(TimeZone.getTimeZone("GMY"));
        gmtCal.set(1949,Calendar.October,1,0,0,0);
        Date MyBirthday = gmtCal.getTime();
        return birthday.compareTo(MyBirthday) < 0;
    }
}
{% endhighlight %}  
  
在java 5.0之后，程序员可以使用新的特性自动装箱和自动拆箱。但是无意识的自动装箱，会使得程序的功耗增加，要避免无意识的自动装箱，优先使用基本类型而不是装箱基本类型。  
  
程序员是否去创建新的对象还是复用对象，在于自己的权衡，具体可阅读《Effective Java》第6和39条.   
  

本文永久链接[http://itxuye.com/effective-java-01.html](http://itxuye.com/effective-java-01.html),转载请注明出处，欢迎交流讨论。