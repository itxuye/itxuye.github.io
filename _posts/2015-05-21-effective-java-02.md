---
author: itxuye
comments: true
date: 2015-05-21 16:37:08 +0800
layout: post
slug: effective-java-02
title: Effective Java 2-始终覆盖toString()方法
postid: 21
categories: 
- java知识
tags:
- java
---  
所以类的基类是java.lang.Object类，在Object类提供了一个toString()方法的一个实现。该方法返回该对象的字符串表示，通常会返回一个“以文本方式表示”此对象的字符串，由类的名称，以及一个“@”符号，接着是散列码的无符号十六进制表示法。（***getClass().getName() + "@" + Integer.toHexString(hashCode())***）  
  
例如，像这样的 com.itxuye.CompareTest@659e0bfd。但是这样，并不简洁到让人明白传递了什么信息。  
   
所以java文档中建议所以的子类都覆盖这个方法，应该返回对象中值得关注的信息。例如这样的:itxuye [name=" + name + ", id=" + id + "]".  
  在IDE中应该都会提供生成该方法的快捷方式，我们在重写的时候，应当尽量编写好注释文档，以便其他程序员阅读修改。  
  

本文永久链接[http://itxuye.com/effective-java-02.html](http://itxuye.com/effective-java-02.html),转载请注明出处，欢迎交流讨论。