---
author: itxuye
comments: true
date: 2015-02-05 19:14:08 +0800
layout: post
slug: android-network-pull-xml
title: Android网络编程之pull解析xml
postid: 18
categories: 
- android
tags:
- android
- pull
- xml
---
PULL解析器小巧轻便，解析速度快，简单易用，非常适合在Android移动设备中使用，Android系统内部在解析各种XML时也是用PULL解析器，Android官方推荐开发者们使用Pull解析技术。 
 <!-- more --> 
###pull解析的代码步骤

第一步：我们需要先定义一个xml文件（当然也可以是从网络上获取的xml文件）

第二步：创建一个XmlPullParser对象，用于对文件进行解析

第三步：通过parser.setInput()方法，将文件和文件解析器关联起来。

第四步：调用getEventType();方法正式开始解析。

第五步：在while循环中处理xml

###具体实现
我在apache http sever（**这个可以去apache官网去下载或者直接搜索，我觉得非常好用**）临时搭建的服务器内存储了一个test.xml文件。

{% highlight xml %}
<note>
<to>George</to>
<from>John</from>
<heading>Reminder</heading>
</note>
{% endhighlight %}  

####准备Http工具类
{% highlight java %}
import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

/**
 * Created by itxuye on 2015/2/8.
 */
public class HttpUtils {

    HttpUtils() {

    }

    public static String RequestUrl(String Url) {
    String xml_data = "";
    try {
    HttpClient httpClient = new DefaultHttpClient();
    HttpGet httpGet = new HttpGet(Url);
    HttpResponse httpResponse = httpClient.execute(httpGet);
    if (httpResponse.getStatusLine().getStatusCode() == 200) {
        //请求响应成功
        HttpEntity httpEntity = httpResponse.getEntity();
        xml_data = EntityUtils.toString(httpEntity);
        return xml_data;
        }
    } catch (Exception ex) {
        Log.i("MainActivity", "读取不到");
    }
    return null;
    }
}
{% endhighlight %} 

###创建解析方法
{% highlight java %}
private void parseXMLWithPull(String xml_data_) {
        try {
    //创建XmlPullParser,有两种方式
    //方式一:使用工厂类XmlPullParserFactory
    XmlPullParserFactory factory = XmlPullParserFactory.newInstance();
    XmlPullParser xmlPullParser = factory.newPullParser();

    //方式二:使用Android提供的实用工具类android.util.Xml
    //XmlPullParser xmlPullParser = Xml.newPullParser();

    // 通过parser.setInput()方法，将文件和文件解析器关联起来。
    xmlPullParser.setInput(new StringReader(xml_data_));

    //产生第一个事件
    int eventType = xmlPullParser.getEventType();

    String to = "";
    String from = "";
    String heading = "";


    while (eventType != XmlPullParser.END_DOCUMENT) {
        String nodename = xmlPullParser.getName();
        switch (eventType) {

        //判断当前事件是否是标签元素开始事件
        case XmlPullParser.START_TAG: {
            if ("to".equals(nodename)) {
                to = xmlPullParser.nextText();
            } else if ("from".equals(nodename)) {
                from = xmlPullParser.nextText();
            } else if ("heading".equals(nodename)) {
                heading = xmlPullParser.nextText();
            }
            break;
        }
        case XmlPullParser.END_TAG: {
            if ("note".equals(nodename)) {
                Log.i(TAG, "to" + to);
                Log.i(TAG, "from" + from);
                Log.i(TAG, "heading" + heading);

            }
            break;
        }
        default:
            break;
    }
    //进入下一个元素并触发相应事件
    eventType = xmlPullParser.next();
            }
        } catch (Exception ex) {

            Log.i("MainActivity", "解析错误");
        }
｝
{% endhighlight %} 

###输出结果：
```
   1431-1448/com.itxuye.Pull I/MainActivity﹕ toGeorge  

   1431-1448/com.itxuye.Pull I/MainActivity﹕ fromJohn  

   1431-1448/com.itxuye.Pull I/MainActivity﹕ headingReminder   
```  
  

####参考阅读：
> 《安卓 第一行代码》  
 
  
####代码完整地址：
[https://github.com/itxuye/Pull_xml](https://github.com/itxuye/Pull_xml)
    
  

本文永久链接[http://itxuye.com/android-network-pull-xml.html](http://itxuye.com/android-network-pull-xml.html),转载请注明出处，欢迎交流讨论。