---
author: itxuye
comments: true
date: 2015-11-15 14:55:08 +0800
layout: post
slug: Request-Management-by-Grouping-of-Images-via-Tag
title: (译)Picasso-通过tag()请求分组管理图像
postid: 1131
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  
  
学习如何加载,调整图像大小与多个方面影响图像管理,今天我们来看看一个非常先进的优化:标记。picasso提供许多图像请求分组来一起管理。  
  
<!-- more -->   
###Idea of Picasso's tag()  
  
在过去的博客文章中,您已经了解了如何优化特定的图像。如果你需要在同一时间取消、暂停或恢复多个图像这可能是不够的,。如果你的观点迅速变化,在取消所有请求的图像之前,过时的屏幕,启动新视图的图像这将是非常有用的。picasso可以通过tag()做到那些。  
  
tag(Object object)接受任何Java对象作为参数。因此,您可以基于任何逻辑构建图像组。你有以下选项:  
> pause requests with pauseTag() 暂停请求 

> resume requests with resumeTag() 恢复请求 

> cancel requests with cancelTag() 取消请求  

基本上,当你需要暂停或取消一个或多个图片的加载,应用一个标签,然后调用相应的方法。这听起来可能有点抽象,让我们看一个例子。  
  
###Example #1: pauseTag() and resumeTag()  
picasso标记的使用标准的例子是一个listView列表。让我们想象一个收件箱列表视图,显示消息的发送者。发送者将由他们的个人资料照片。   
 
[![desigh](http://7s1s78.com1.z0.glb.clouddn.com/gmail.png)](http://7s1s78.com1.z0.glb.clouddn.com/gmail.png)  
  
现在,让我们考虑以下场景:用户正在寻找一个旧消息并向下快速滚动。ListView旨在迅速回收和重用。如果正确实现适配器,它会是一个平滑的体验。然而,picasso会开始要求每一行,然后又马上取消,因为用户滚动列表时,那么快。  
  
这将是更有效的暂停图像加载,直到快速滑动完成为止。用户不会注意到任何的区别,但你的应用大大减少请求的数量。   
  
实现是很容易的。首先,将tag()添加到picasso请求:  
{% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .tag("Profile ListView") // can be any Java object
    .into(imageViewWithTag);  
{% endhighlight %}   
  
第二,实现AbsListView.OnScrollListener并复写onScrollStateChanged():  
 {% highlight java %}   
@Override
  public void onScrollStateChanged(AbsListView view, int scrollState) {
    final Picasso picasso = Picasso.with(context);
    if (scrollState == SCROLL_STATE_IDLE || scrollState == SCROLL_STATE_TOUCH_SCROLL) {
          picasso.resumeTag(context);
    } else {
          picasso.pauseTag(context);
    }
  }
{% endhighlight %}   
  
最后,设置监听器到ListView:  
{% highlight java %} 
ListView listView = ... // e.g. findById()
listView.setOnScrollListener(onScrollListener);   
{% endhighlight %}    
  
滚动视图状态更改到快速滑动的时候,它会暂停所有请求。当滚动状态返回到空闲或定期滚动的位置,就会恢复请求。  
  
###Example #2: cancelTag()  
  
前面的列表视图示例不使用cancelTag()方法。让我们看看另一个例子。你实现了一个购物车显示所有选中的图片存放物品。一旦用户点击“购买!”按钮,显示一个ProgressDialog同时请求到服务器并检查事务的有效性。一旦用户点击了“购买!”按钮,前面的项目列表部分隐藏起来。没有理由进一步负担设备的网络,电池和内存来继续加载其他图像。  
  
我们可以优化行为在ProgressDialog显示后通过调用.cancelTag() :   
{% highlight java %}  
public void buyButtonClick(View v) {
    // display ProgressDialog
    // ...

    // stop image requests
    Picasso
        .with(context)
        .cancelTag("ShoppingCart");

    // make 'buy'-request to server
    // ...
}   
{% endhighlight %}   
  
###Summary and A Warning  
  
这两个例子只是=你能做的标签要求的一部分。根据您的应用,您可能想使用一个不同的对象作为标记。这篇博客使用字符串,但是您可以使用任何东西。有些人可能会想要使用context(或activity,fragment)对象作为标记。但是如果用户留下一个activity,你停止了加载图片,垃圾收集器可能无法破坏activity对象。这是一个标准内存泄漏的例子。  
  
本文永久链接[http://itxuye.com/Request-Management-by-Grouping-of-Images-via-Tag.html](http://itxuye.com/Request-Management-by-Grouping-of-Images-via-Tag.html),转载请注明出处，欢迎交流讨论。
  

  


  
  
   