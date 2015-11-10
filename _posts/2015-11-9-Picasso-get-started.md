---
author: itxuye
comments: true
date: 2015-11-10 14:29:08 +0800
layout: post
slug: picasso-get-started
title: (译)Picasso-入门
postid: 1125
categories: 
- Picasso
tags:
- android
- Picasso
---  
这是Square Picasso 图片加载开源库使用的一系列翻译文章,翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)
###为什么我们使用Picasso?   
有经验的Android开发人员可以跳过这一节,但对于初学者来说:你可能会问自己为什么想用picasso代替我们自己的实现。    

Android加载图片是相当糟糕的，因为它会通过像素的图像加载到内存中。
单张照片的平均手机相机的2592x1936像素（5百万像素）的尺寸将拨出约19 MB的内存。
<!-- more -->    
如果添加的网络请求是复杂性参差不齐无线连接，缓存和图像操作。如果你使用一个良好的测试和开发库比如像picasso库,你将节省了大量的时间和头痛的问题。   
  
在本系列中,我们来看看picasso的许多特征。只要看一眼博客文章大纲,来思考下自己真的需要开发所有这些特性。  
  
###picasso的配置  
  
希望现在我们相信你将使用一个库来处理图像加载请求。如果你想看看picasso,这系列文章将会给你指导!
首先,添加picasso依赖。在撰写本文时,picasso的最后版本2.5.2。  
  
####Gradle  
  
{% highlight groovy %} 
compile 'com.squareup.picasso:picasso:2.5.2'
{% endhighlight %}  
  
####Maven  
 {% highlight xml %} 
<dependency>
      <groupId>com.squareup.picasso</groupId>
      <artifactId>picasso</artifactId>
      <version>2.5.2</version>
</dependency>
{% endhighlight %}   
  
###通过URL加载图像  
  
picasso库使用连贯接口,特别是与picasso的类中实现的。picasso类至少需要三个参数才能实现一个全功能的请求:  
  
***with(Context context)*** 许多Android API都需要调用上下文。picasso也一样。  
***load(String imageUrl)***  指定图像被加载。主要就代表一个URL的字符串来源于网络图片的URL。  
***into(ImageView targetImageView)***指定显示图片的Imageview  
  
####例子 
{% highlight java %}   

ImageView targetImageView = (ImageView) findViewById(R.id.imageView);
String internetUrl = "http://i.imgur.com/DvpvklR.png";
Picasso
    .with(context)
    .load(internetUrl)
    .into(targetImageView);  
{% endhighlight %} 
  
就是这样!如果图像URL存在和你ImageView可见的话,你会在几秒钟后看到图像。如果图像不存在,picasso将返回错误回调,我们以后会提到。通过这三行代码你可能已经相信picasso库对你是有用的,但这些特性只是冰山一角。  
  
  
本文永久链接[http://itxuye.com/picasso-get-started.html](http://itxuye.com/picasso-get-started.html),转载请注明出处，欢迎交流讨论。  