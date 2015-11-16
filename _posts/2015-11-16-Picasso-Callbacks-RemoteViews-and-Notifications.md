---
author: itxuye
comments: true
date: 2015-11-16 14:55:08 +0800
layout: post
slug: Picasso-Callbacks-RemoteViews-and-Notifications
title: (译)Picasso-Callbacks, RemoteViews and Notifications
postid: 1132
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  
  
关于picasso你已经学到了很多。然而,直到现在,我们一直认为你只是加载图片到一个ImageView。然而,这是很少的使用的Android应用程序。您可能需要加载在ImageView没有显示一个图像,或者你想要为学习缓存做准备。  
  
<!-- more -->    
  
在我们进入回调之前,值得提出的是picasso可以用各种方法来加载一个图像。picasso一般提供了同步和异步加载。 
  
###fetch(), get() and Target之间的区别  
  
.fetch()将在一个后台线程异步加载图片,但是在ImageView既不会显示,也不返回bitmap。这个方法只保存图像到磁盘和内存缓存。它可以用来填补在后台缓存的图片,如果你知道你需要图片后不久想减少加载时间。  
  
.get()同步加载图像和返回一个bitmap对象。确保你不是在UI线程调用.get()。否则UI将会被阻塞!    
  
除了使用.into()选项,还有另一个方法:回调。在picasso的中叫做target。  
  
###使用target作为回调机制  
  
到目前为止,我们一直使用一个ImageView作为.into()参数。这不是.into()完整的功能。还可以使用target接口的一个实现。  
  
picasso将和之前一样加载图片,但是在ImageView显示,它会返回bitmap(或error)的target回调。  
{% highlight java %}   
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .into(target);
{% endhighlight %} 
  
{% highlight java %}
private Target target = new Target() {
    @Override
    public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
        // loading of the bitmap was a success
        // TODO do some action with the bitmap
    }
    @Override
    public void onBitmapFailed(Drawable errorDrawable) {
        // loading of the bitmap failed
        // TODO do some action/warning/error message
    }
    @Override
    public void onPrepareLoad(Drawable placeHolderDrawable) {
    }
};
{% endhighlight %}   
  
如果操作成功,将获得bitmap的回调对象和一个picasso.LoadedFrom对象。后者将指定如果图像来自一个缓存或网络。在这一点上,你可以根据bitmap做任何事情。如果你不想用picasso的转换,在之前的博文中,我们展示了也如何模糊图像有效地使用RenderScript。   
  
最后，当你需要使用原始位图，使用get()或Target接收图像。  

Important：始终宣布目标的实现为一个字段，而不是匿名！否则垃圾回收器销毁你的目标对象你永远得不到bitmap。   
  
###用RemoteViews加载自定义通知图片  
  
让我们来看一个例子为一个自定义通知RemoteViews。如果你感兴趣自定义通知布局,你可能知道如何构建通知。希望下面的代码你不会看不懂:  
{% highlight java %}  
// create RemoteViews
final RemoteViews remoteViews = new RemoteViews(getPackageName(), R.layout.remoteview_notification);

remoteViews.setImageViewResource(R.id.remoteview_notification_icon, R.mipmap.future_studio_launcher);
remoteViews.setTextViewText(R.id.remoteview_notification_headline, "Headline");
remoteViews.setTextViewText(R.id.remoteview_notification_short_message, "Short Message");
remoteViews.setTextColor(R.id.remoteview_notification_headline, getResources().getColor(android.R.color.black));
remoteViews.setTextColor(R.id.remoteview_notification_short_message, getResources().getColor(android.R.color.black));

// build notification
NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(UsageExampleTargetsAndRemoteViews.this)
    .setSmallIcon(R.mipmap.future_studio_launcher)
    .setContentTitle("Content Title")
    .setContentText("Content Text")
    .setContent(remoteViews)
    .setPriority(NotificationCompat.PRIORITY_MIN);
final Notification notification = mBuilder.build();

// set big content view for newer androids
if (android.os.Build.VERSION.SDK_INT >= 16) {
    notification.bigContentView = remoteViews;
}

NotificationManager mNotificationManager = (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
mNotificationManager.notify(NOTIFICATION_ID, notification); 
{% endhighlight %}   
  
这一切都是用自定义布局创建一个通知。我们不会进入细节,因为它不是本教程的一部分。有趣的是下一步:加载图片到ImageView。  
  
再次,使用picasso非常简单。类似于imageview,我们使用.into()加载RemoteViews。然而,参数不同:  
```.into(android.widget.RemoteViews remoteViews, int viewId, int notificationId, android.app.Notification notification).```  
  
{% highlight java %}  
Picasso
    .with(UsageExampleTargetsAndRemoteViews.this)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .into(remoteViews, R.id.remoteview_notification_icon, NOTIFICATION_ID, notification);  
{% endhighlight %}  
  
也许你不知道每个变量持有什么,请回到上面的长代码块中理解参数。我们的示例通知如下:    
  
[![desigh](http://7s1s78.com1.z0.glb.clouddn.com/picasso-notifcation--1-.jpg)](http://7s1s78.com1.z0.glb.clouddn.com/picasso-notifcation--1-.jpg)    
  
如果你感兴趣的图片加载到Widgets,使用另一个.into()调用以下参数:   
```into(android.widget.RemoteViews remoteViews, int viewId, int[] appWidgetIds).```  
  
本文永久链接[http://itxuye.com/Picasso-Callbacks-RemoteViews-and-Notifications.html](http://itxuye.com/Picasso-Callbacks-RemoteViews-and-Notifications.html),转载请注明出处，欢迎交流讨论。  

  
