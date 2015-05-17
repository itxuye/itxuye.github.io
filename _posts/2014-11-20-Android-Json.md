---
author: itxuye
comments: true
date: 2014-11-20 17:25:08 +0800
layout: post
slug: Android-Json
title: Json的创建与android下的解析
postid: 03
categories: 
- android
tags:
 - android
 - Json
---

这两天在学习javaweb的东西，又一次接触到了**json**这个非常方便操作的数据结构，所以今天想从**json**的创建与解析来简单的总结下json的一些知识, **文末有代码示例下载**。
<!-- more -->
###json的基础知识：
JSON是一种取代XML的数据结构,和xml相比,它更小巧但描述能力却不差,由于它的小巧所以网络传输数据将减少更多流量从而加快速度。

那么,JSON到底是什么?[json官网](http://www.json.org/)

JSON就是一串字符串 只不过元素会使用特定的符号标注。

{} 双括号表示对象

[] 中括号表示数组

"" 双引号内是属性或值

: 冒号表示后者是前者的值(这个值可以是字符串、数字、也可以是另一个数组或对象)

所以``` {"name": "Jack"}``` 可以理解为是一个包含name为Jack的对象

而```[{"name": "jack"},{"name": "Alex"}]```就表示包含两个对象的数组

当然了,你也可以使用```{"name":["Jack","Alex"]}```来简化上面一部,这是一个拥有一个name数组的对象.

###那么下面我就通过代码示例来具体讲一下json的几种创建格式。
在讲Json数据的创建之前，我们需要在工程中加入几个依赖jar包，这些jar包我们可以在json官网和Apache官网下载到:
  
[![json](http://itxuye.qiniudn.com/JSON.png)](http://itxuye.qiniudn.com/JSON.png)

首先我们得创建一个WEB工程，在工程中加入上面我们需要的几个依赖jar包之后便可编写程序了。
  
<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/6d10c2061a280a6e9752.pibb" frameborder=0 ></iframe>


###在解析json数据之前我们需要在android客户端代码做一下几件事情：

创建对象类，跟上面一样，这里就不再赘述了。  

创建HttpUtils类：  

<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/8f2dfd239a336fb06131.pibb" frameborder=0 ></iframe>

###得到的几种以及解析方式：
1.第一种方式的输出json格式，可从服务类的第一个getProduct方法看出：

```{"product":{"quantity":100,"price":20,"name":"Pen"}}```

解析代码：
  
<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/0b6ddebdc7176fe4298e.pibb" frameborder=0 ></iframe>

2.第二种方式的输出json格式，可从服务类的getListProduct方法看出：

```{"products":[{"quantity":100,"price":20,"name":"Pen"},{"quantity":200,"price":30,"name":"Pencil"},{"quantity":300,"price":50,"name":"Computer"},{"quantity":400,"price":1000,"name":"Phone"}]}```

解析代码：
  
<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/3e61d236ba02cbf96063.pibb" frameborder=0 ></iframe>

3.第三种方式的输出json格式，可从服务类的getListString方法看出：

```{"liststring":["上海","深圳","南京"]}```

解析代码：
  
<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/2cc00325727eb31bc3f2.pibb" frameborder=0 ></iframe>

4.第四种方式的输出json格式，可从服务类的getListMap方法看出：

```{"listmap":[{"address":"南京","name":"Jack","id":1001},{"address":"北京","name":"Alex","id":1002}]}```

解析代码：
  
<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/77b97c565dd28fa58945.pibb" frameborder=0 ></iframe>

 感谢林洪同学对错字的校验！！！  

###源码下载链接:
[https://github.com/itxuye/JsonProject](https://github.com/itxuye/JsonProject)

[https://github.com/itxuye/AndroidJson](https://github.com/itxuye/AndroidJson)  


本文永久链接[itxuye](http://www.itxuye.com/Android-Json.html),可随意copy文中代码，转载请注明出处！