---
author: itxuye
comments: true
date: 2015-02-04 19:14:08 +0800
layout: post
slug: android-network-sax-xml
title: Android网络编程之sax解析xml
postid: 17
categories: 
- android
tags:
- android
- sax
- xml
---
SAX采用事件驱动机制来解析XML文档，每当SAX解析器发现文档开始、元素开始、文本、元素结束、文档结束等事件时，就会向外发送一次事件，而开发者则可以通过编写事件监听器处理这些事件，以此来获取XML文档里的信息。SAX解析方式占用内存小，处理速度非常快。  
 <!-- more --> 

###sax解析的代码步骤
第一步：新建一个工厂类SAXParserFactory,代码如下：  

**SAXParserFactory factory = SAXParserFactory.newInstance();**  

第二步：让工厂类产生一个SAX的解析类SAXParser,代码如下：

**SAXParser parser = factory.newSAXParser();**  

第三步：从SAXPsrser中得到一个XMLReader实例，代码如下：

**XMLReader reader = parser.getXMLReader();  **

第四步：把自己写的handler注册到XMLReader中，一般最重要的就是ContentHandler,代码如下：  

**CotentHandler_Sax handler = new CotentHandler_Sax();**
**reader.setContentHandler(handler);**

 
第五步：将一个xml文档或者资源变成一个java可以处理的InputStream流后，解析正式开始，代码如下：

**parser.parse(is);**  

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
  
###创建ContenntHandler类
{% highlight java %}
package com.itxuye.sax_xml.HttpUtils;

import android.util.Log;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**
 * Created by itxuye on 2015/2/9.
 */
public class CotentHandler_Sax extends DefaultHandler {

    private String nodename;
    private StringBuilder to;
    private StringBuilder from;
    private StringBuilder heading;

    ////用于处理文档解析开始事件
    @Override
    public void startDocument() throws SAXException {
        to = new StringBuilder();
        from = new StringBuilder();
        heading = new StringBuilder();
    }

    //处理元素开始事件，从参数中可以获得元素所在名称空间的uri，元素名称，属性类表等信息
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        //记录当前节点名
        nodename = localName;
    }

    //处理元素的字符内容，从参数中可以获得内容
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        //根据当前节点名判断将内容添加到哪一个StringBuilder对象中
        if ("to".equals(nodename)) {
            to.append(ch, start, length);
        } else if ("from".equals(nodename)) {
            from.append(ch, start, length);
        } else if ("heading".equals(nodename)) {
            heading.append(ch, start, length);
        }
    }

    //处理元素结束事件，从参数中可以获得元素所在名称空间的uri，元素名称等信息
    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if ("note".equals(localName)) {
            Log.i("Sax", "to is" + to.toString().trim());
            Log.i("Sax", "from is" + from.toString().trim());
            Log.i("Sax", "heading is" + heading.toString().trim());
        }
    }


    @Override
    public void endDocument() throws SAXException {
        super.endDocument();
    }
}
{% endhighlight %}    
  
###创建解析方法
{% highlight java %}
private void parseXMLWithSax(String Xml_data_) {
        try {
            SAXParserFactory factory = SAXParserFactory.newInstance();
            XMLReader xmlReader = factory.newSAXParser().getXMLReader();

            CotentHandler_Sax cotentHandler_sax = new CotentHandler_Sax();
            //将CotentHandler_Sax的实例放到xmlReader中
            xmlReader.setContentHandler(cotentHandler_sax);
            //开始解析
            xmlReader.parse(new InputSource(new StringReader(Xml_data_)));

        } catch (Exception ex) {
            Log.i("Sax", "解析失败");
        }

    }
{% endhighlight %} 

###输出结果：
```
   1679-1699/com.itxuye.sax_xml I/Sax﹕ to isGeorge 

   1679-1699/com.itxuye.sax_xml I/Sax﹕ from isJohn  

   1679-1699/com.itxuye.sax_xml I/Sax﹕ heading isReminder   
```  
  

####参考阅读：
> 《安卓 第一行代码》  
 
  
####代码完整地址：
[https://github.com/itxuye/Sax_xml](https://github.com/itxuye/Sax_xml)
    
  

本文永久链接[http://itxuye.com/android-network-sax-xml.html](http://itxuye.com/android-network-sax-xml.html),转载请注明出处，欢迎交流讨论。