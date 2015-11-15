---
author: itxuye
comments: true
date: 2015-11-15 14:04:08 +0800
layout: post
slug: Ordering-Requests-by-Image-Priority
title: (译)Picasso-根据图像优先级进行请求
postid: 1130
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)   
  
经常,你会碰到这种情况,picasso将在同一时间加载多个图像。假设您正在构建一个界面有一个大图像在顶部和底部有个小图像。对用户体验最佳的是顶部大图像最先显示,然后再在底部加载其他图像。一如既往,picasso帮你做到了。  
<!-- more -->   
  
###优先级:高、中、低    
你可能不会考虑一个特定的场景,但是如果你需要优先考虑图像加载,可以使用priority()。这将需要三个常数之一,高、中或低。默认情况下,所有请求优先级是中。分配不同的优先级将影响picaaso的加载方式。  

###Example: XML Layout  
  
为了更清楚的演示,让我们看一个实际的例子。
 {% highlight xml %} 
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <ImageView
            android:id="@+id/activity_request_priority_hero"
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:layout_margin="5dp"/>

        <TextView
            android:id="@+id/textView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="5dp"
            android:text="Sweets"
            android:textAppearance="?android:attr/textAppearanceLarge"/>

        <TextView
            android:id="@+id/textView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="5dp"
            android:text="Lorem Ipsum is simply dummy text"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="100dp"
            android:layout_gravity="center_horizontal"
            android:orientation="horizontal">

            <ImageView
                android:id="@+id/activity_request_priority_low_left"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1"/>

            <ImageView
                android:id="@+id/activity_request_priority_low_right"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1"/>
        </LinearLayout>

    </LinearLayout>
</ScrollView>  
{% endhighlight %}   
  
[![desigh](http://7s1s78.com1.z0.glb.clouddn.com/picasso-hero-priority--1-.png)](http://7s1s78.com1.z0.glb.clouddn.com/picasso-hero-priority--1-.png)  
  
###Example: Activity Code  
在我们的activity中,我们只需要我们希望图像加载到三个imageview。现在你应该知道如何做出正确的picasso请求。顶部大图片会得到较高的优先级:  
 {% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .fit()
    .priority(Picasso.Priority.HIGH)
    .into(imageViewHero); 
{% endhighlight %}   
  
两个小图像会得到一个低优先级:  
  {% highlight java %}   
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[1])
    .fit()
    .priority(Picasso.Priority.LOW)
    .into(imageViewLowPrioLeft);

Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[2])
    .fit()
    .priority(Picasso.Priority.LOW)
    .into(imageViewLowPrioRight);  
{% endhighlight %}  
  
重要的是要理解,你让picasso请求的顺序没有意义。确保你用picasso的优先级,而不是试图影响毕加索的请求顺序排序你的请求。  
  
本文永久链接[http://itxuye.com/Ordering-Requests-by-Image-Priority.html](http://itxuye.com/Ordering-Requests-by-Image-Priority.html),转载请注明出处，欢迎交流讨论。