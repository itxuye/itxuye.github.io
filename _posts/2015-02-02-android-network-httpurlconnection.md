---
author: itxuye
comments: true
date: 2015-02-02 20:12:08 +0800
layout: post
slug: android-network-httpurlcoonection
title: Android网络编程之HttpURLConnection
postid: 15
categories: 
- android
tags:
- android
- HttpURLConnection
---
###一、简介
HttpURLConnection是java的标准类，HttpURLConnection继承自URLConnection，可用于向指定网站发送GET、POST请求。HttpURLConnection来自于jdk，它的完整名为:`java.net.HttpURLConnection`,
HttpURLConnection类，没有公开的构造方法，但我们可以通过java.net.URL的openConnection方法获取一个URLConnection的实例,而HttpURLConnection是它的子类。
 <!-- more -->
###二、HttpURLConnection实现步骤
(1).得到HttpURLConnection对象，通过调用URL.openConnection()方法得到该对象  
(2).设置请求头属性，比如数据类型，数据长度等等  
(3).可选的操作  setDoOutput(true),默认为false无法向外写入数据！setDoInput(true),一般不用设置默认为true  
(4).浏览器向服务器发送的数据，比如post提交form表单或者像服务器发送一个文件  
(5).浏览器读取服务器发来的相应，头数据(content-type及content-length等等)，body数据  
(6).调用HttpURLConnection的disconnect()方法关闭链接 
###三、分别GET和POST实现步骤
####使用HttpURLConnection来执行GET调用  

{% highlight java %}
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


public class MainActivity extends ActionBarActivity {
    String URL = "http://www.itxuye.com/";
    final String TAG_STRING = "MainActivity";
    HttpURLConnection   HttpURLConnection;
    String resultData="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    try {
        //1.通过openConnection 连接
        URL url = new URL(URL);
        HttpURLConnection =(HttpURLConnection)url.openConnection();
       //2.设置输入和输出流
        HttpURLConnection.setDoOutput(true);
        HttpURLConnection.setDoInput(true);
        //设置请求，一般默认为GET，可不设置
        HttpURLConnection.setRequestMethod("GET");
        HttpURLConnection.setConnectTimeout(2000);
        HttpURLConnection.setReadTimeout(2000);
        //3.流的操作
        InputStreamReader in = new InputStreamReader(HttpURLConnection.getInputStream());
        BufferedReader buffer = new BufferedReader(in);
        String inputLine = null;
        while (((inputLine = buffer.readLine()) != null)){
            resultData += inputLine + "\n";
        }
        in.close();
        }catch (Exception e) {
        resultData = "连接超时";
        e.printStackTrace();
       }finally {
        //4.关闭连接
        HttpURLConnection.disconnect();
        }

    }
｝
{% endhighlight %}    

####使用HttpURLConnection来执行POST调用
{% highlight java %}
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;


public class MainActivity extends ActionBarActivity {
    String URL = "http://www.itxuye.com/";
    final String TAG_STRING = "MainActivity";
    HttpURLConnection   HttpURLConnection;
    String resultData="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    try {
        //1.通过openConnection 连接
        URL url = new URL(URL);
        HttpURLConnection =(HttpURLConnection)url.openConnection();
       //2.设置输入和输出流
        HttpURLConnection.setDoOutput(true);
        HttpURLConnection.setDoInput(true);
        //设置POST请求
        HttpURLConnection.setRequestMethod("POST");
		HttpURLConnection.setConnectTimeout(2000);
        HttpURLConnection.setReadTimeout(2000);
        HttpURLConnection.setUseCaches(false);
       //3.流的操作
        // 配置本次连接的Content-type，配置为application/x-www-form-urlencoded的
        HttpURLConnection.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
        // 连接，从postUrl.openConnection()至此的配置必须要在connect之前完成，
        // 要注意的是connection.getOutputStream会隐含的进行connect。
        HttpURLConnection.connect();
        //DataOutputStream流
        DataOutputStream out = new DataOutputStream(HttpURLConnection.getOutputStream());
        //要上传的参数
        String content = "par=" + URLEncoder.encode("ylx_Post+中正", "UTF_8");
        //将要上传的内容写入流中
        out.writeBytes(content);
        //刷新、关闭
        out.flush();
        out.close();

        InputStreamReader in = new InputStreamReader(HttpURLConnection.getInputStream());
        BufferedReader buffer = new BufferedReader(in);
        String inputLine = null;
        while (((inputLine = buffer.readLine()) != null)){
            resultData += inputLine + "\n";
        }
        in.close();
        }catch (Exception e) {
            resultData = "连接超时";
            e.printStackTrace();
        }finally {
        //关闭连接
        HttpURLConnection.disconnect();
        }

    }
}
{% endhighlight %}  

  
###总结
1.HttpURLConnection.connect函数，实际上只是建立了一个与服务器的tcp连接，并没有实际发送http请求。无论是post还是get，http请求实际上直到HttpURLConnection.getInputStream()这个函数里面才正式发送出去。 
 
2.对connection对象的一切配置（那一堆set函数）都必须要在connect()函数执行之前完成。而对outputStream的写操作，又必须要在inputStream的读操作之前。这些顺序实际上是由http请求的格式决定的。  

3.http请求实际上由两部分组成，一个是http头，所有关于此次http请求的配置都在http头里面定义，一个是正文content，在connect()函数里面，会根据HttpURLConnection对象的配置值生成http头，因此在调用connect函数之前，就必须把所有的配置准备好。  

4.紧接着http头的是http请求的正文，正文的内容通过outputStream写入，实际上outputStream不是一个网络流，充其量是个字符串流，往里面写入的东西不会立即发送到网络，而是在流关闭后，根据输入的内容生成http正文。  

5.至此，http请求的东西已经准备就绪。在getInputStream()函数调用的时候，就会把准备好的http请求正式发送到服务器了，然后返回一个输入流，用于读取服务器对于此次http请求的返回信息。由于http请求在getInputStream的时候已经发送出去了（包括http头和正文），因此在getInputStream()函数之后对connection对象进行设置（对http头的信息进行修改）或者写入outputStream（对正文进行修改）都是没有意义的了，执行这些操作会导致异常的发生。   
  
 
  参考阅读：
> 《安卓 第一行代码》   

>[http://blog.163.com/daizi_/blog/static/184876424201271595512331/](http://blog.163.com/daizi_/blog/static/184876424201271595512331/)  

本文永久链接[http://itxuye.com/android-network-httpurlconnection.html](http://itxuye.com/android-network-httpurlconnection.html),转载请注明出处，欢迎交流讨论。