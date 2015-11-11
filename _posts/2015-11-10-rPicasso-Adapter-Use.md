---
author: itxuye
comments: true
date: 2015-11-10 14:29:08 +0800
layout: post
slug: rPicasso-Adapter-Use
title: (译)Picasso-结合Adapter使用
postid: 1127
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  

在上两篇文章中我们将单个图像加载到一个ImageView。这篇文章将演示一个列表视图的实现,每一行包含一个图像。这类似于许多图片库应用程序。  
<!-- more -->   
  
###画廊实现:ListView   
首先,我们需要一些测试图片。我们上传一些准备好的图片在eatfoody.com上作为imgur:  
{% highlight java %}   
public static String[] eatFoodyImages = {
        "http://i.imgur.com/rFLNqWI.jpg",
        "http://i.imgur.com/C9pBVt7.jpg",
        "http://i.imgur.com/rT5vXE1.jpg",
        "http://i.imgur.com/aIy5R2k.jpg",
        "http://i.imgur.com/MoJs9pT.jpg",
        "http://i.imgur.com/S963yEM.jpg",
        "http://i.imgur.com/rLR2cyc.jpg",
        "http://i.imgur.com/SEPdUIx.jpg",
        "http://i.imgur.com/aC9OjaM.jpg",
        "http://i.imgur.com/76Jfv9b.jpg",
        "http://i.imgur.com/fUX7EIB.jpg",
        "http://i.imgur.com/syELajx.jpg",
        "http://i.imgur.com/COzBnru.jpg",
        "http://i.imgur.com/Z3QjilA.jpg",
};
{% endhighlight %}   
第二,我们将需要一个Activity,用来创建一个适配器给ListView:  
{% highlight java %}
public class UsageExampleAdapter extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_usage_example_adapter);

        listView.setAdapter(new ImageListAdapter(UsageExampleAdapter.this, eatFoodyImages));
    }
} 
{% endhighlight %}  
第三,让我们看一下布局文件适配器。listView布局文件非常简单:  
{% highlight xml %} 
<?xml version="1.0" encoding="utf-8"?>
<ImageView xmlns:android="http://schemas.android.com/apk/res/android"
       android:layout_width="match_parent"
       android:layout_height="200dp"/> 
{% endhighlight %}  
  
我们将得到高度200dp和匹配设备的宽度的图片列表。很明显,这不会得到最漂亮的图像画廊,但这并不是这个练习的重点。  
 
我们在得到结果之前,我们需要实现一个listview适配器。我们将保持简单和绑定eatfoody示例图像给适配器。每个条目将显示一张图片：  
{% highlight java %}
public class ImageListAdapter extends ArrayAdapter {
    private Context context;
    private LayoutInflater inflater;

    private String[] imageUrls;

    public ImageListAdapter(Context context, String[] imageUrls) {
        super(context, R.layout.listview_item_image, imageUrls);

        this.context = context;
        this.imageUrls = imageUrls;

        inflater = LayoutInflater.from(context);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (null == convertView) {
            convertView = inflater.inflate(R.layout.listview_item_image, parent, false);
        }

        Picasso
            .with(context)
            .load(imageUrls[position])
            .fit() // will explain later
            .into((ImageView) convertView);

        return convertView;
    }
}  
{% endhighlight %} 
 
ImageListAdapter()中的getView()方法发生了有趣的事情。你会发现picasso调用与前面使用“常规”加载的图片的方式一模一样。利用picasso的方式保持不变,无论你想掩盖什么应用程序。   
  
作为一个高级的Android开发人员你就知道我们需要重用布局视图创建一个快速和平滑滚动的体验。picasso精彩之一是,它会自动取消请求,清除ImageView,为适当的ImageView装载正确的图像。  
  
slide note:有一个选项来进一步优化适配器使用tag()和fit()。我们会即将发布的博客帖子中讨论这些。  
  
###Picasso强大之处: 缓存  
当你上下滚动很多图片时,你会发现图像显示比以前快得多。正如你所想,这些图片来自缓存和不是从网络加载了。picasso的缓存实现十分全面并将为你让事情变得更简单。picasso实现缓存的大小取决于设备的磁盘大小。   
   
加载一个图像时,picasso使用三级缓存:内存、磁盘和网络(命令从最快到最慢)。再一次,没有什么你必须做的。picasso从你隐藏所有实现的复杂性,智能的为你创造缓存大小。当然,从square设计理念来看,你可以替换缓存组件。我们在以后的博文将仔细看看缓存。  
  
###GridView   
实现GridView和ListView没有任何区别，你可以使用同一个布局适配器。你只需要替换布局文件即可：  
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<GridView
    android:id="@+id/usage_example_gridview"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:numColumns="2"/> 
 {% endhighlight %}   
  
###其他要点  
到目前为止,我们只使用了整个适配器项目是一个ImageView的例子。如果一个或多个imageview只是(小)适配器项目的一部分，这种方法仍然适用。getView()代码将有所不同,但picasso的加载方式将是相同的。

   
本文永久链接[http://itxuye.com/rPicasso-Adapter-Use.html](http://itxuye.com/rPicasso-Adapter-Use.html),转载请注明出处，欢迎交流讨论。 
