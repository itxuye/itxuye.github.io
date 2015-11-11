---
author: itxuye
comments: true
date: 2015-11-11 14:58:08 +0800
layout: post
slug: sPicasso-Placeholders-Errors-and-Fading
title: (译)Picasso-Placeholders,Errors and Fading操作
postid: 1128
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  
  
在过去三个星期我们演示了基本的网络操作,加载和缓存功能之后,是时候讲到更高级的主题。这周,我们将讨论各种各样的占位符。picasso不仅显示图像,也能在后台运行,直到图像加载;或者如果它不能被加载。
<!-- more -->   
  
###占位符:.placeholder()操作  
我们可能不需要去解释它，空的ImageView在任何的UI界面都不好看。如果您使用的是picasso,你最有可能是通过一个网络连接加载图像。根据用户的网络环境中,这可能要花费大量的时间。一个应用程序的预期行为是显示一个占位符(译者注：就是预先在图片位置加载一个图片，你懂的),直到图像加载和处理。  
  
  
毕加索的连贯接口使得这个很容易做到!只需要调用placeHolder()方法和一个引用(资源)作为一个占位符,直到你的实际图像已经准备好了。   
{% highlight java %}
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .placeholder(R.mipmap.ic_launcher) // can also be a drawable
    .into(imageViewPlaceholder);    
{% endhighlight %}   
  
很明显,你不能设置一个网路资源url作为占位符,因为那个需要加载。应用资源和drawable才能保证是可用的和可访问的。然而,对于一个load()参数,picasso接受所有类型的值。  
  
###错误占位符:.error()操作  
  
让我们假设我们的程序试图从一个网站加载一个图像,目前，picasso确实给我们得到一个错误的选项回调并采取适当的行动。当我们将讨论该选项后,现在这将是太复杂。在大多数用例一个占位符,信号无法加载的图像是相当足够了。(译者注:表示这边翻译起来太坑了，语句太过晦涩，简单来说:当图片无法加载的时候显示你想要加载的图片- -)  
  
picasso的连贯接口的调用是与前面的示例pre-display占位符相同,只是用不同的函数调用 error():  
  
{% highlight java %}
Picasso
    .with(context)
    .load("http://futurestud.io/non_existing_image.png")
    .placeholder(R.mipmap.ic_launcher) // can also be a drawable
    .error(R.mipmap.future_studio_launcher) // will be displayed if the image cannot be loaded
    .into(imageViewError);
{% endhighlight %}   
  
就是这样。如果load()图像不能加载,picasso将显示R.mipmap。future_studio_launcher。再次说一下,error()可接受的参数只能是已经初始化资源(R.drawable < drawable-keyword >)。  
  
###noFade()的使用   
  
无论如果你是否在加载图片之前显示一个占位符图片,picasso自动褪色ImageView图像软化UI的重大变化。如果你想直接显示图像没有小褪色效果,可以调用.noFade()方法:  
  
{% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .placeholder(R.mipmap.ic_launcher) // can also be a drawable
    .error(R.mipmap.future_studio_launcher) // will be displayed if the image cannot be loaded
    .noFade()
    .into(imageViewFade);  
{% endhighlight %}  
  
这将直接向您展示图像,没有消退ImageView。请确认你有这样做一个充分的理由!
重要的是要知道所有这些参数可以独立设置的,不依赖其他方法。例如,你可以设置. error()没有调用.placeholder()。任意组合的参数是可以的。  
  
###noPlaceholder()的使用  
  
最后,您可能会在文档中发现一个小小的方法叫做.noPlaceholder()。重要的是要理解,这并不是通过禁用以前设置的占位符().placeholder()或. error()! 它涵盖了一个不同的用例。  
  
让我们考虑下面的场景:你想要一个图像加载到一个ImageView,一段时间后,你想要不同的图像加载到同一个ImageView。因为默认的配置,当你创建第二个picasso,ImageView将被之前的图像清除，.placeholder()设定的占位符()将显示出来。如果ImageView突出，这让UI看起来丑，用户可能在几秒内看到图像之间的快速变化。一个更好的解决办法是在第二个picasso调用.noPlaceholder()的请求。这将保持以前的图像位置直到加载到第二个。它将给你的用户更加平滑的体验。   
{% highlight java %}
// load an image into the imageview
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .placeholder(R.mipmap.ic_launcher) // can also be a drawable
    .into(imageViewNoPlaceholder, new Callback() {
        @Override
        public void onSuccess() {
            // once the image is loaded, load the next image
            Picasso
                .with(context)
               .load(UsageExampleListViewAdapter.eatFoodyImages[1])
               .noPlaceholder() // but don't clear the imageview or set a placeholder; just leave the previous image in until the new one is ready
               .into(imageViewNoPlaceholder);
        }
        @Override
        public void onError() {
        }
    });  
{% endhighlight %}    
  
这个小的代码片段跟我们刚才描述的完全一致。完成加载加载第一个形象之后,它会开始第二个请求。然而,由于调用.noPlaceholder()方法,它会保持之前的位置。  
  
slide note：如果你对.into(imageViewNoPlaceholder, new Callback())感到困惑，没关系之后我们会解释。  
  
  
本文永久链接[http://itxuye.com/sPicasso-Placeholders-Errors-and-Fading.html](http://itxuye.com/sPicasso-Placeholders-Errors-and-Fading.html),转载请注明出处，欢迎交流讨论。