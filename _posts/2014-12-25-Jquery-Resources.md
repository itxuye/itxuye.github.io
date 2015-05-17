---
author: itxuye
comments: true
date: 2014-12-25 17:25:08 +0800
layout: post
slug: Jquery-Resources
title: jQuery 常用资源
postid: 07
categories: 
- 实用技术
tags:
- jQuery 
---

## 官方资源

- [官方首页](http://jquery.com/)
- [官方插件](http://plugins.jquery.com/)

## 资源分享

- [jquery css特效](http://www.jqshare.com/)
<!-- more -->
## 常用代码

### 禁用a的链接

{% highlight javascript %} 

    href="return false;"或href="javascript;"
    $().live('click',function(e){
      e.preventDefault();
      });
{% endhighlight %}

### 清空file的内容
  {% highlight javascript %} 
    var cfile = $('#id').clone();
    $('#id').replaceWith(cfile);
{% endhighlight %}
### jquery.form.js 和 jquery.validate.js配合使用
这两个脚本搭配在表单验证和提交是非常的好用,顺便增加了对bootstrap表单的支持  

{% highlight javascript %} 
    $("#page_form").validate({
      highlight: function(element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
      },
      success: function(element) {
        element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
      },
      submitHandler:function(form) {
        $(form).ajaxSubmit(options);
    }});
{% endhighlight %}
### 选择父节点  
使用$(this)来将dom对象转为jquery对象 
 
{% highlight javascript %}
    $(this).parents('tr');
{% endhighlight %}
### 多重操作
{% highlight javascript %}
    $(this).parents('tr').remove();  
{% endhighlight %} 
    因为jquery函数返回jquery节点

本文永久链接[http://www.itxuye.com/jquery/2014/12/25/Jquery-Resources.html](http://www.itxuye.com/jquery/2014/12/25/Jquery-Resources.html),可随意copy文中代码，转载请注明出处！