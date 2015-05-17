---
author: itxuye
comments: true
date: 2015-01-31 21:02:08 +0800
layout: post
slug: android-network-webview
title: Android网络编程之webview开发
postid: 13
categories: 
- android
tags:
- android
- webview
---
###Webview概述
Android WebView在Android平台上是一个特殊的View， 他能用来显示网页，这个类可以被用来在你的app中仅仅显示一张在线的网页，还可以用来开发浏览器。WebView内部实现是采用渲染引擎来展示view的内容，提供网页前进后退，网页放大，缩小，搜索。
 <!-- more --> 
###应用程序添加WebView    
  

####在xml中配置WebView
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<WebView  xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/webview"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
{% endhighlight %}  
  
####创建WebView的实例
{% highlight java %}
WebView myWebView = (WebView) findViewById(R.id.webview);
myWebView.loadUrl("http://www.itxuye.com");
{% endhighlight %} 

###访问权限  
使用webview必定会访问网络，所以要加上访问网络的权限，简单的webview就可以运行了  
 
{% highlight xml %}
<uses-permission android:name="android.permission.INTERNET" /> 
{% endhighlight %}  
   
###WebView使用Javascript  

WebView默认未开启Javascript，需要通过WebView.getSettings().setJavaScriptEnabled(true)来开启Javascript，如下：
{% highlight java %}
WebView myWebView = (WebView) findViewById(R.id.webview);
WebSettings webSettings = myWebView.getSettings();
webSettings.setJavaScriptEnabled(true);
{% endhighlight %}   
  
###WebView处理页面浏览  
  
当用户在WebView中点击超链接时，应用程序的默认行为是调用默认处理url的程序来处理。通常是调用系统默认浏览器打开相应链接。但是你可以在WebView中覆盖该行为，使用自定义行为（如在当前WebView中打开该链接）。这样就可以实现只在这个WebView浏览。  
    
需要设置Webview对象就可以了，里面有许多方法，具体的用法可以查看谷歌官方文档
{% highlight java %}
private class MywebviewClient extends WebViewClient{
   @Override
   public boolean shouldOverrideUrlLoading(WebView view, String url) {
       return super.shouldOverrideUrlLoading(view, url);
   }

   @Override
   public void onPageStarted(WebView view, String url, Bitmap favicon) {
       super.onPageStarted(view, url, favicon);
   }

   @Override
   public void onPageFinished(WebView view, String url) {
       super.onPageFinished(view, url);
   }

   @Override
   public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
       super.onReceivedError(view, errorCode, description, failingUrl);
   }

   @Override
   public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
       super.doUpdateVisitedHistory(view, url, isReload);
   }

   }
{% endhighlight %}   
  
{% highlight java %}
myWebView.setWebViewClient(new MyWebViewClient());
{% endhighlight %}  
  
  
###WebView实现浏览历史功能  
调用keyDown()方法便可以实现前进，后退功能  
{% highlight java %}
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
    // Check if the key event was the Back button and if there's history
    if ((keyCode == KeyEvent.KEYCODE_BACK) && myWebView.canGoBack()) {
        myWebView.goBack();
        return true;
    }
    // If it wasn't the Back key or there's no web page history, bubble up to the default
    // system behavior (probably exit the activity)
    return super.onKeyDown(keyCode, event);
}
{% endhighlight %} 

  
  
初步的webview使用就到这里，接下来可能会写关于javascript与webview的具体用法和安卓4.4的webview的变化。  
  
参考阅读：
> 《安卓 第一行代码》   
   
>  [http://developer.android.com/guide/webapps/webview.html](http://developer.android.com/guide/webapps/webview.html)  
  
  


本文永久链接[http://itxuye.com/android-network-webview.html](http://itxuye.com/android-network-webview.html),转载请注明出处，欢迎交流讨论。