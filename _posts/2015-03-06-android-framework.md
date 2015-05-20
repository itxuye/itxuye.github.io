---
author: itxuye
comments: true
date: 2015-03-06 20:11:08 +0800
layout: post
slug: android-framework
title: Android常用框架整理
postid: 19
categories: 
- android
tags:
- android
- framework
---

###一、Volley

下载地址: [https://github.com/mcxiaoke/android-volley](https://github.com/mcxiaoke/android-volley)  
由于谷歌被墙，可以访问volley在github上的镜像地址。

特点:Volley是Android平台上的网络通信库，能使网络通信更快，更简单，更健壮。
 <!-- more --> 
####功能点:

1. JSON，图像等的异步下载

2. 网络请求的排序（scheduling）

3. 网络请求的优先级处理

 缓存

多级别取消请求

和Activity和生命周期的联动（Activity结束时同时取消所有网络请求）

架构设计:

  ***Volley使用了线程池来作为基础结构，主要分为主线程，cache线程和network线程。主线程和cache线程都只有一个，而NetworkDispatcher线程可以有多个，这样能解决比并行问题。***

优点:volley简化了网络通信这块的开发，特别是针对数据量不大但网络通信频繁，对JSON对象，图片加载这两块进行了很好的封装和支持，

缺点:对大数据（large payloads ），流媒体，这些case不能很好的支持，还需要使用原始的方法，比如Download Manager等。  
  
###二、android-async-http

项目地址：[https://github.com/loopj/android-async-http](https://github.com/loopj/android-async-http)
文档介绍：[http://loopj.com/android-async-http/](http://loopj.com/android-async-http/)

####特点:  

1. 此网络请求库是基于Apache HttpClient库之上的一个异步网络请求处理库，网络处理均基于Android的非UI线程，通过回调方法处理请求结果。

2. 处理异步Http请求，并通过匿名内部类处理回调结果

3. Http请求均位于非UI线程，不会阻塞UI操作

4. 通过线程池处理并发请求

5. 处理文件上传、下载

6. 响应结果自动打包JSON格式、支持解析成json格式

7. 自动处理连接断开时请求重连

8. 可将Cookies持久化到SharedPreferences

####主要类介绍:

AsyncHttpRequest :继承自Runnabler，被submit至线程池执行网络请求并发送start，success等消息

AsyncHttpResponseHandler:接收请求结果，一般重写onSuccess及onFailure接收请求成功或失败的消息，还有onStart，onFinish等消息

TextHttpResponseHandler:继承自AsyncHttpResponseHandler，只是重写了AsyncHttpResponseHandler的onSuccess和onFailure方法，将请求结果由byte数组转换为String

JsonHttpResponseHandler:继承自TextHttpResponseHandler，同样是重写onSuccess和onFailure方法，将请求结果由String转换为JSONObject或JSONArray

BaseJsonHttpResponseHandler: 继承自TextHttpResponseHandler，是一个泛型类，提供了parseResponse方法，子类需要提供实现，将请求结果解析成需要 的类型，子类可以灵活地使用解析方法，可以直接原始解析，使用gson等。

RequestParams:请求参数，可以添加普通的字符串参数，并可添加File，InputStream上传文件

AsyncHttpClient: 核心类，使用HttpClient执行网络请求，提供了 get，put，post，delete，head等请求方法，使用起来很简单，只需以url及RequestParams调用相应的方法即可，还可以选 择性地传入Context，用于取消Content相关的请求，同时必须提供 ResponseHandlerInterface（AsyncHttpResponseHandler继承自 ResponseHandlerInterface）的实现类，一般为AsyncHttpResponseHandler的子 类，AsyncHttpClient内部有一个线程池，当使用AsyncHttpClient执行网络请求时，最终都会调用sendRequest方法， 在这个方法内部将请求参数封装成AsyncHttpRequest（继承自Runnable）交由内部的线程池执行。

SyncHttpClient: 继承自AsyncHttpClient，同步执行网络请求，AsyncHttpClient把请求封装成AsyncHttpRequest后提交至线程 池，SyncHttpClient把请求封装成AsyncHttpRequest后直接调用它的run方法。

####请求流程

调用AsyncHttpClient的get或post等方法发起网络请求

所有的请求都走了sendRequest，在sendRequest中把请求封装为了AsyncHttpRequest，并添加到线程池执行

当 请求被执行时（即AsyncHttpRequest的run方法），执行AsyncHttpRequest的 makeRequestWithRetries方法执行实际的请求，当请求失败时可以重试。并在请求开始，结束，成功或失败时向请求时传的 ResponseHandlerInterface实例发送消息

基本上使用的都是AsyncHttpResponseHandler的子类，调用其onStart，onSuccess等方法返回请求结果

###三、xutils框架

 下载地址:[https://github.com/wyouflf/xUtils](https://github.com/wyouflf/xUtils)
  
####特点:

1. xUtils 包含了很多实用的android工具。

2. xUtils 最初源于Afinal框架，进行了大量重构，使得xUtils支持大文件上传，更全面的http请求协议支持(10种谓词)，拥有更加灵活的ORM，更多的事件注解支持且不受混淆影响...

3. xUitls最低兼容android 2.2 (api level 8)

####功能点:

#####DbUtils模块：

android中的orm框架，一行代码就可以进行增删改查；

支持事务，默认关闭；

可通过注解自定义表名，列名，外键，唯一性约束，NOT NULL约束，CHECK约束等（需要混淆的时候请注解表名和列名）；

支持绑定外键，保存实体时外键关联实体自动保存或更新；

自动加载外键关联实体，支持延时加载；

支持链式表达查询，更直观的查询语义，参考下面的介绍或sample中的例子。

ViewUtils模块：

android中的ioc框架，完全注解方式就可以进行UI绑定和事件绑定；

新的事件绑定方式，使用混淆工具混淆后仍可正常工作；

目前支持常用的11种事件绑定，参见ViewCommonEventListener类和包com.lidroid.xutils.view.annotation.event。

#####HttpUtils模块：

支持同步，异步方式的请求；

支持大文件上传，上传大文件不会oom；

支持GET，POST，PUT，MOVE，COPY，DELETE，HEAD请求；

下载支持301/302重定向，支持设置是否根据Content-Disposition重命名下载的文件；

返回文本内容的GET请求支持缓存，可设置默认过期时间和针对当前请求的过期时间。

#####BitmapUtils模块：

加载bitmap的时候无需考虑bitmap加载过程中出现的oom和android容器快速滑动时候出现的图片错位等现象；

支持加载网络图片和本地图片；

内存管理使用lru算法，更好的管理bitmap内存；

可配置线程加载线程数量，缓存大小，缓存路径，加载显示动画等...

###四、ThinkAndroid
下载地址:[https://github.com/white-cat/ThinkAndroid](https://github.com/white-cat/ThinkAndroid)
#### 特点:
ThinkAndroid是一个免费的开源的、简易的、遵循Apache2开源协议发布的Android开发框架，其开发宗旨是简单、快速的进行 Android应用程序的开发，包含Android mvc、简易sqlite orm、ioc模块、封装Android httpclitent的http模块, 具有快速构建文件缓存功能，无需考虑缓存文件的格式，都可以非常轻松的实现缓存，它还基于文件缓存模块实现了图片缓存功能， 在android中加载的图片的时候，对oom的问题，和对加载图片错位的问题都轻易解决。他还包括了一个手机开发中经常应用的实用工具类， 如日志管理，配置文件管理，android下载器模块，网络切换检测等等工具。

####功能点:

MVC模块：实现视图与模型的分离。

ioc模块：android中的ioc模块，完全注解方式就可以进行UI绑定、res中的资源的读取、以及对象的初始化。 

数据库模块：android中的orm框架，使用了线程池对sqlite进行操作。  

http模块：通过httpclient进行封装http数据请求，支持异步及同步方式加载。

缓存模块：通过简单的配置及设计可以很好的实现缓存，对缓存可以随意的配置

图片缓存模块：imageview加载图片的时候无需考虑图片加载过程中出现的oom和android容器快速滑动时候出现的图片错位等现象。

配置器模块：可以对简易的实现配对配置的操作，目前配置文件可以支持Preference、Properties对配置进行存取。

日志打印模块：可以较快的轻易的是实现日志打印，支持日志打印的扩展，目前支持对sdcard写入本地打印、以及控制台打印

下载器模块:可以简单的实现多线程下载、后台下载、断点续传、对下载进行控制、如开始、暂停、删除等等。

网络状态检测模块：当网络状态改变时，对其进行检测。

###五、LoonAndroid

下载地址:[https://github.com/gdpancheng/LoonAndroid](https://github.com/gdpancheng/LoonAndroid)

#### 特点:
整个框架式不同于androidannotations，Roboguice等ioc框架，这是一个类似spring的实现方式。在整应用的生命周期中找到切入点，然后对activity的生命周期进行拦截，然后插入自己的功能。

####功能点:

自动注入框架（只需要继承框架内的application既可）

图片加载框架（多重缓存，自动回收，最大限度保证内存的安全性）

网络请求模块（继承了基本上现在所有的http请求）


eventbus（集成一个开源的框架）

验证框架（集成开源框架） json解析（支持解析成集合或者对象）

数据库

多线程断点下载（自动判断是否支持多线程，判断是否是重定向）

自动更新模块

一系列工具类

类似的框架还有Retrofit、OkHttp、eventbus 等，这里就不一一做介绍了.

