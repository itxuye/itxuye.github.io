---
author: itxuye
comments: true
date: 2015-11-10 14:29:08 +0800
layout: post
slug: qpicasso-advanced-loading
title: (译)Picasso-高级加载
postid: 1126
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  
  
上周,我们讨论了使用picasso的原因和一个简单的示例请求加载图像从一个互联网URL。但这不是picasso记载图像的唯一途径。picasso也可以从Android资源,文件和Uri加载图片。在这篇文章中,我们将涵盖所有这三个途径。  
<!-- more -->   
###Loading from Resources  
首先从Android资源中加载图片。而不是给一个字符串URL指向一个网络URL,需要传入一个int类型的资源id。 
{% highlight java %}   
int resourceId = R.mipmap.ic_launcher;
Picasso
    .with(context)
    .load(resourceId)
    .into(imageViewResource);  
{% endhighlight %}    
###Loading from File  
  
第二就是从文件加载。这是有用的，当你让用户选择一张照片显示一个图像(类似于一个画廊)。参数只是一个文件对象。  
  {% highlight java %}   
// this file probably does not exist on your device. However, you can use any file path, which points to an image file
File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "Running.jpg");
Picasso
    .with(context)
    .load(file)
    .into(imageViewFile); 
{% endhighlight %} 
 
###Loading from Uri  
  
最后,您还可以加载图像定义为一个Uri。  
   
{% highlight java %}   
// this could be any Uri. for demonstration purposes we're just creating an Uri pointing to a launcher icon
Uri uri = resourceIdToUri(context, R.mipmap.future_studio_launcher);
Picasso
    .with(context)
    .load(uri)
    .into(imageViewUri);   
{% endhighlight %} 
  
这是一个简单的转换resourceId为Uri的方法。  
  
{% highlight java %}   
public static final String ANDROID_RESOURCE = "android.resource://";
public static final String FOREWARD_SLASH = "/";
private static Uri resourceIdToUri(Context context, int resourceId) {
    return Uri.parse(ANDROID_RESOURCE + context.getPackageName() + FOREWARD_SLASH + resourceId);
} 
{% endhighlight %} 
  
  
本文永久链接[http://itxuye.com/picasso-advanced-loading.html](http://itxuye.com/picasso-advanced-loading.html),转载请注明出处，欢迎交流讨论。 