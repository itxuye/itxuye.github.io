---
author: itxuye
comments: true
date: 2015-11-13 9:19:08 +0800
layout: post
slug: tPicasso-Resizing-Scaling-and-fit
title: (译)Picasso-Image Resizing, Scaling and fit()操作
postid: 1129
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  
  
在过去的博客文章,您已经学会如何从各种源加载图片以及如何使用不同类型的占位符方法。本周的博客文章很重要,如果你不会操作影响图像加载的大小:调整和缩放!  
  
<!-- more -->      
  
###resize(x, y)调整图片大小  
   
通常来讲,这是最佳的如果您的服务器或API提供的图像在你需要准确的尺寸比如完美的平衡带宽、内存消耗和图像质量。  
  
不幸的是,你不总能控制请求图片完美的尺寸。如果图像大小不合适，你可以使用resize(horizontalSize verticalSize)调用改变图像的尺寸到一个更合适的大小。这将图像在显示到imageview之前调整好大小。  
{% highlight java %} 
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .resize(600, 200) // resizes the image to these dimensions (in pixel). does not respect aspect ratio
    .into(imageViewResize);
{% endhighlight %} 
  
###scaleDown()使用  
  
当使用resize()方法Picasso将调整图片大小。因为使一个小图像更大并没有提高图像的质量会浪费计算时间,调用scaleDown(true)只当原始图像尺寸超过目标的大小才会调用resize()方法。  
  
{% highlight java %}
 Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .resize(6000, 2000)
    .onlyScaleDown() // the image will only be resized if it's bigger than 6000x2000 pixels.
    .into(imageViewResizeScaleDown); 
{% endhighlight %}  
  
###避免拉伸和缩放图像  
现在,对于任何图像处理,调整图片大小可以扭曲了长宽比和糟蹋图像显示。在大多数你的应用中,你想要阻止这种情况的发生。Picasso给你两个选择缓解这种情况,叫centerCrop()或centerInside()。  
  
####CenterCrop  
  
CenterCrop()是一种尺度图像的裁剪技术,填补了ImageView的要求范围,然后修剪其余的范围。ImageView将被完全填满,但整个图像可能不会显示。
{% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .resize(600, 200) // resizes the image to these dimensions (in pixel)
    .centerCrop() 
    .into(imageViewResizeCenterCrop);
{% endhighlight %}   
  
####CenterInside  
CenterInside()是一种尺度图像的裁剪技术,这样两个尺寸等于或小于请求的ImageView的界限。图像将显示完全,但可能不会填满整个ImageView。  
{% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .resize(600, 200)
    .centerInside() 
    .into(imageViewResizeCenterInside);  
{% endhighlight %}   
  
###Last, but not least: Picasso's fit()  
  
讨论选项应该覆盖你需要关于图像调整和扩展功能。毕加索有最后一个辅助功能,可以非常有用:fit()。   
  {% highlight java %}
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .fit()
    // call .centerInside() or .centerCrop() to avoid a stretched image
    .into(imageViewFit);
{% endhighlight %}   
  
fit()是测量目标ImageView和在内部使用的resize()来减少图像ImageView的尺寸。关于fit()有两件事需要了解。首先,调用fit()可以延迟图像请求因为picasso需要等到ImageView可以测量。第二,你只可以使用fit()和一个ImageView作为目标(稍后我们会看看其他目标)。  
  
优点是图像在尽可能低的分辨率,而不影响其质量。较低的分辨率意味着更少的数据保存在缓存中。这可以极大地减少图像的影响应用程序的内存占用。总之,如果你喜欢较低的内存的影响在一个更快的加载时间,fit()是一个很好的工具。  
  
   

本文永久链接[http://itxuye.com/tPicasso-Resizing-Scaling-and-fit.html](http://itxuye.com/tPicasso-Resizing-Scaling-and-fit.html),转载请注明出处，欢迎交流讨论。 