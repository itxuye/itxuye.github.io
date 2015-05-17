---
author: itxuye
comments: true
date: 2015-02-01 22:12:08 +0800
layout: post
slug: android-network-httpclient
title: Android网络编程之HttpClient
postid: 14
categories: 
- android
tags:
- android
- httpclient
---
###一、简介
HttpClient是Apache开源项目中的一个子项目，用来提供高效的、最新的、功能丰富的支持HTTP协议的客户端编程工具包，并且它支持HTTP协议最新的版本和建议。HttpClient已经应用在很多的项目中，比如Apache Jakarta上很著名的另外两个开源项目Cactus和HTMLUnit都使用了HttpClient。  
在Android开发中，Android SDK附带了Apache的HttpClient，它是一个完善的客户端。它提供了对HTTP协议的全面支持，可以使用HttpClient的对象来执行HTTP GET和HTTP POST调用。  
 <!-- more -->
> 访问地址: [HttpClient官方地址](http://hc.apache.org/httpcomponents-client-4.3.x/index.html)  
 
###二、HTTP工作原理：
1. 客户端(一般是指浏览器，这里是指自己写的程序)与服务器建立连接  
2. 建立连接后，客户端向服务器发送请求  
3. 服务器接收到请求后，向客户端发送响应信息  
4. 客户端与服务器断开连接  


###三、特性
1. 基于标准、纯净的java语言。实现了Http1.0和Http1.1  
2. 以可扩展的面向对象的结构实现了Http全部的方法（GET, POST, PUT, DELETE, HEAD, OPTIONS, and TRACE）。  
3. 支持HTTPS协议。  
4. 通过Http代理建立透明的连接。  
5. 利用CONNECT方法通过Http代理建立隧道的https连接。  
6. Basic, Digest, NTLMv1, NTLMv2, NTLM2 Session, SNPNEGO/Kerberos认证方案。  
7. 插件式的自定义认证方案。    
8. 便携可靠的套接字工厂使它更容易的使用第三方解决方案。  
9. 连接管理器支持多线程应用。支持设置最大连接数，同时支持设置每个主机的最大连接数，发现并关闭过期的连接。  
10. 自动处理Set-Cookie中的Cookie。  
11. 插件式的自定义Cookie策略。  
12. Request的输出流可以避免流中内容直接缓冲到socket服务器。  
13. Response的输入流可以有效的从socket服务器直接读取相应内容。  
14. 在http1.0和http1.1中利用KeepAlive保持持久连接。  
15. 直接获取服务器发送的response code和 headers。  
16. 设置连接超时的能力。  
17. 实验性的支持http1.1 response caching。  
18. 源代码基于Apache License 可免费获取。  
  
###四、使用方法

使用HttpClient发送请求、接收响应很简单，一般需要如下几步即可。  

1. 创建HttpClient对象。  
2. 创建请求方法的实例，并指定请求URL。如果需要发送GET请求，创建HttpGet对象；如果需要发送POST请求，创建HttpPost对象。
3. 如果需要发送请求参数，可调用HttpGet、HttpPost共同的setParams(HetpParams params)方法来添加请求参数；对于HttpPost对象而言，也可调用setEntity(HttpEntity entity)方法来设置请求参数。  
4. 调用HttpClient对象的execute(HttpUriRequest request)发送请求，该方法返回一个HttpResponse。  
5. 调用HttpResponse的getAllHeaders()、getHeaders(String name)等方法可获取服务器的响应头；调用HttpResponse的getEntity()方法可获取HttpEntity对象，该对象包装了服务器的响应内容。程序可通过该对象获取服务器的响应内容。  
6. 释放连接。无论执行方法是否成功，都必须释放连接   

###五、实例
#####（1）使用HttpClient来执行GET调用
{% highlight java %}
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.InputStream;


public class MainActivity extends ActionBarActivity {
    String URL = "http://www.itxuye.com/";
    final String TAG_STRING = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        try {
            //1.创建DefaultHttpClient的实例
            HttpClient httpClient = new DefaultHttpClient();
            //2.创建HttpGet对象，发起GET请求
            HttpGet httpGet = new HttpGet(URL);
            //3.调用execute()方法；返回值是HttpResponse对象
           HttpResponse httpResponse = httpClient.execute(httpGet);
            //判断请求是否成功
            if(httpResponse.getStatusLine().getStatusCode()== HttpStatus.SC_OK){
                Log.i(TAG_STRING, "请求服务器端成功");
                //获得输入流
                InputStream inStrem = httpResponse.getEntity().getContent();
                int result = inStrem.read();
                while (result != -1){
                    System.out.print((char)result);
                    result = inStrem.read();
                }
                //关闭输入流
                inStrem.close();
            }else {
                Log.i(TAG_STRING, "请求服务器端失败");
            }
        } catch (Exception ex) {

        }

} 
{% endhighlight %}  

**使用HTTP GET调用有一个缺点就是，请求的参数作为URL一部分来传递，以这种方式传递的时候，URL的长度应该在2048个字符之内。如果超出这个这范围，就要使用到HTTP POST调用。**  
  
#####2.使用HttpClient来执行POST调用
 使用POST调用进行参数传递时，需要使用NameValuePair来保存要传递的参数。NameValuePair封装了一个键/值组合。另外，还需要设置所使用的字符集。  

{% highlight java %}  
public class MainActivity extends ActionBarActivity {
    String URL = "http://www.itxuye.com/";
    final String TAG_STRING = "MainActivity";

    @Override 
    public void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.main);  
 
        BufferedReader in = null;  
        try {  
            HttpClient client = new DefaultHttpClient();  
            HttpPost request = new HttpPost(URL);  
            //使用NameValuePair来保存要传递的Post参数  
            List<NameValuePair> postParameters = new ArrayList<NameValuePair>();  
            //添加要传递的参数    
            postParameters.add(new BasicNameValuePair("id", "12345"));  
            postParameters.add(new BasicNameValuePair("username", "dave"));  
            //实例化UrlEncodedFormEntity对象  
            UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(  
                    postParameters);  
 
            //使用HttpPost对象来设置UrlEncodedFormEntity的Entity  
            request.setEntity(formEntity);  
            HttpResponse response = client.execute(request);  
            in = new BufferedReader(  
                    new InputStreamReader(  
                            response.getEntity().getContent()));  
 
            StringBuffer string = new StringBuffer("");  
            String lineStr = "";  
            while ((lineStr = in.readLine()) != null) {  
                string.append(lineStr + "\n");  
            }  
            in.close();  
 
            String resultStr = string.toString();  
            System.out.println(resultStr);  
        } catch(Exception e) {  
            // Do something about exceptions  
        } finally {  
            if (in != null) {  
                try {  
                    in.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    }  
} 
{% endhighlight %}   
  
  
参考阅读：
> 《安卓 第一行代码》   
  
  

本文永久链接[http://itxuye.com/android-network-httpclient.html](http://itxuye.com/android-network-httpclient.html),转载请注明出处，欢迎交流讨论。