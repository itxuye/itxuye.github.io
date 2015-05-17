---
author: itxuye
comments: true
date: 2014-12-18 17:25:08 +0800
layout: post
slug: Android-Studio-Tools
title: android studio 更新时连接服务器失败
postid: 04
categories: 
- android
tags:
 - android
 - tool
---

谷歌的亲儿子Android studio安卓开发工具，在一星期多前推出了正式版本，由于大天朝的墙的原因，每次更新android studio都会失败，找了很多方法，可能最适用的方法就是挂VPN,但是VPN都很贵，免费的很难找。
<!-- more -->
我在谷歌上找了很久的方法是：

###windows下的解决方法：

如果是运行的是32位的android studio需要在修改一下文件：

在andriod studio的启动目录下。找到studio.exe.vmoptions这个文件。在后面加上

```
-Djava.net.preferIPv4Stack=true

-Didea.updates.url=http://dl.google.com/android/studio/patches/updates.xml  
-Didea.patches.url=http://dl.google.com/android/studio/patches/ 
```

如果是64位的就找到studio64.exe.vmoptions这个文件，在后面加上

```
-Djava.net.preferIPv4Stack=true

-Didea.updates.url=http://dl.google.com/android/studio/patches/updates.xml  
-Didea.patches.url=http://dl.google.com/android/studio/patches/ 
```

保存。。重启studio一般即可解决问题。。

如果有vpn的或者代理的，可以配置代理。

本文永久链接[http://www.itxuye.com/Android-Studio-Tools.html](http://www.itxuye.com/Android-Studio-Tools.html),可随意copy文中代码，转载请注明出处！
