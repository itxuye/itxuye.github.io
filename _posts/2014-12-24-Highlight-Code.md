---
author: itxuye
comments: true
date: 2014-12-24 17:25:08 +0800
layout: post
slug: Highlight-Code
title: jekyll搭建博客实现代码显示行号
postid: 06
categories: 
- 实用技术
tags:
- jekyll
---

昨晚将jekyll更新到了2.5.0，今天优化了博客，增加了响应式布局，原作者并未用到行号显示，因为学习了jquery，想自己实现一下，谷歌到可以通过css样式结合js想、实现。
<!-- more -->
###原先想实现代码显示行号，可以用  

`{% highlight bash linenos %} some code ...{% endhighlight %}`

，但是这样做，当想复制代码的时候，行号也会复制进去。
###css和js实现
使用jekyll搭建的博客，通常要使代码区高亮，大多数人会使用pygments。pygments有很多样式，这个各位可以自己百度，我自己选择了friendly这个样式。

各位可以在选择的css样式中增加以下代码：
  

<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/8f48afdbec2772b5d685.pibb" frameborder=0 ></iframe>  
  
js代码：  
  

<iframe width="100%" height="200" src="http://gist.stutostu.com/itxuye/72d67ff36a2cd64fc600.pibb" frameborder=0 ></iframe>   

就是这么简单就可以实现了，还没实现的快去试试吧。  


本文永久链接[http://www.itxuye.com/jekyll/Highlight-Code.html](http://www.itxuye.com/Highlight-Code.html),可随意copy文中代码，转载请注明出处！