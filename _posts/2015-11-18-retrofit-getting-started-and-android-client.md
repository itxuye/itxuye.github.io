---
author: itxuye
comments: true
date: 2015-11-18 9:51:08 +0800
layout: post
slug: retrofit-getting-started-and-android-client
title: (译)Retrofit-入门
postid: 1134
categories: 
- Retrofit
tags:
- android
- Retrofit
--- 
这是Square Retrofit 网络开源库使用的一系列翻译文章,仅记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/retrofit](https://futurestud.io/blog/tag/retrofit)  
  
这是在Retrofit一系列文章的第一篇文章。该系列通过几个用例来检查Retrofit功能和可扩展性的范围。  
  
<!-- more -->  
在这篇博文中，我们会通过Retrofit的基础知识，创建一个android客户端API或HTTP请求。然而，这篇文章不包括太多的入门信息和Retrofit是怎么回事。对于那些信息，请访问[项目主页](http://square.github.io/retrofit/)。  
  
###What is Retrofit  
  
官方描述是:  
***一个提供给java和android类型安全的Rest客户端***  
  
您将使用注解来描述HTTP请求URL参数替换默认情况下查询参数支持集成。此外，它提供了多重请求体和文件上传的功能。  
  
###如何声明(API)请求
请访问和阅读上面的Retrofit主页Api声明来找到如何发出请求。通过清楚地描述和代码示例，你会发现所有重要的信息。  
  
###准备你的Android项目  
  
让我们动手回归到键盘，如果你已经创建了Android项目，直接到下一步，你可以选择你喜欢的IDE创建你的工程。我们喜欢用gradle构建项目，当然你也可以用Maven构建项目。  
  
###Define Dependencies: Gradle or Maven  
  
####Retrofit 1.9
#####pom.xml  
  
{% highlight xml %}  
<dependency>  
    <groupId>com.squareup.retrofit</groupId>
    <artifactId>retrofit</artifactId>
    <version>1.9.0</version>
</dependency>  
<dependency>  
    <groupId>com.squareup.okhttp</groupId>
    <artifactId>okhttp</artifactId>
    <version>2.2.0</version>
</dependency>  
{% endhighlight %}   
  
#####build.gradle  
  
{% highlight groovy %}   
dependencies {  
    // Retrofit & OkHttp
    compile 'com.squareup.retrofit:retrofit:1.9.0'
    compile 'com.squareup.okhttp:okhttp:2.2.0'
}
{% endhighlight %}  
  
  
####Retrofit 2

#####pom.xml  

{% highlight xml %} 
<dependency>  
    <groupId>com.squareup.retrofit</groupId>
    <artifactId>retrofit</artifactId>
    <version>2.2.0-beta2</version>
</dependency>  
{% endhighlight %}   
  
#####build.gradle

{% highlight groovy %} 
dependencies {  
    // Retrofit & OkHttp
    compile 'com.squareup.retrofit:retrofit:2.0.0-beta2'
}  
{% endhighlight %}  
  
默认情况下，Retrofit2在它的顶部利用OkHttp作为网络层。你不需要为您的项目明确地定义OkHttp作为一个依赖，除非您有特定的版本要求。  
  
现在，您的项目准备整合Retrofit，让我们创建一个持久的Android APIHTTP客户端。  
  
###可持续的安卓客户端 
为了研究Retrofit，我们举一个repository of Bart Kiers的例子。事实上，这是一个retrofit的OAuth身份验证例子。然而，它提供了一个可持续的android客户端的所有必要的基础条件。这就是为什么我们会把它当成一个稳定的基础，扩展它在以后的博客文章进一步的验证功能。  
  
  
###Service Generator  
ServiceGenerator是我们的API/HTTP客户端。在其当前状态,它只定义一个方法来创建一个基本的REST为给定的类/接口适配器。这是代码:  
  
####Retrofit 1.9  
   
{% highlight java %}  
public class ServiceGenerator {

    public static final String API_BASE_URL = "http://your.api-base.url";

    private static RestAdapter.Builder builder = new RestAdapter.Builder()
                .setEndpoint(API_BASE_URL)
                .setClient(new OkClient(new OkHttpClient()));

    public static <S> S createService(Class<S> serviceClass) {
        RestAdapter adapter = builder.build();
        return adapter.create(serviceClass);
    }
}   
{% endhighlight %}  
  
  
####Retrofit 2  
    
{% highlight java %}
public class ServiceGenerator {

    public static final String API_BASE_URL = "http://your.api-base.url";

    private static OkHttpClient httpClient = new OkHttpClient();
    private static Retrofit.Builder builder =
            new Retrofit.Builder()
                    .baseUrl(API_BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create());

    public static <S> S createService(Class<S> serviceClass) {
        Retrofit retrofit = builder.client(httpClient).build();
        return retrofit.create(serviceClass);
    }
}
{% endhighlight %}   
  
ServiceGenerator类使用Retrfit的RestAdapter-Builder与给定的API来创建一个新的REST客户端基础url。例如,GitHub的API基础url是https://developer.github.com/v3/。运行serviceClass定义了注释的类或接口API请求。以下部分显示了Retrfit的具体用法,以及如何定义一个例样客户端。  
  
  
###JSON Mapping   
Retrofit 1.9默认附带谷歌GSON。所有您需要做的就是定义响应对象的类,响应将被自动映射.  
  
当使用Retrofit2,您需要添加一个转换器影响改造对象。这就是为什么我们调用.addConverterFactory(GsonConverterFactory.create())整合GSON作为默认JSON转换器。  
  
###GitHub Client  
  
下面的代码定义了GitHubClient列表和一个方法来请求一个仓库的贡献者。它还说明了Retrofit的参数替换功能的使用({owner} and {repo}定义的路径将被替换为给定的变量调用对象方法)。  

####Retrofit 1.9
  
{% highlight java %}  
public interface GitHubClient {  
    @GET("/repos/{owner}/{repo}/contributors")
    List<Contributor> contributors(
        @Path("owner") String owner,
        @Path("repo") String repo
    );
}  
{% endhighlight %}   
  
  
  
####Retrofit 2
  
{% highlight java %}
public interface GitHubClient {  
    @GET("/repos/{owner}/{repo}/contributors")
    Call<List<Contributor>> contributors(
        @Path("owner") String owner,
        @Path("repo") String repo
    );
}   
{% endhighlight %} 
 

 
这是Contributor的定义类。这个类包含必需的类属性映射响应数据。  
  
{% highlight java %}  
static class Contributor {  
    String login;
    int contributions;
}  
{% endhighlight %}  
  
关于之前提到的JSON映射:GitHubClient定义定义了一个方法叫contributors与返回类型List<Contributor>.Retrofit确保服务器响应正确的映射(以防响应匹配给定的类)。  
  
###API示例请求  
  
下面的代码片段演示了使用ServiceGenerator来实例化你的github客户端,方法调用贡献者使用创建客户端。这段代码的修改版本提供Retrofit的github-client例子。  
  
在执行GitHub的例子，您需要手动定义ServiceGenerator内的基础url“https://developer.github.com/v3/”。另一种选择是创建一个额外的createService()方法接受两个参数:客户端类和基础url。  
  
####Retrofit 1.9
  
{% highlight java %}
public static void main(String... args) {  
    // Create a very simple REST adapter which points the GitHub API endpoint.
    GitHubClient client = ServiceGenerator.createService(GitHubClient.class);

    // Fetch and print a list of the contributors to this library.
    List<Contributor> contributors =
        client.contributors("fs_opensource", "android-boilerplate");

    for (Contributor contributor : contributors) {
        System.out.println(
                contributor.login + " (" + contributor.contributions + ")");
    }
} 
{% endhighlight %}  
   
 
####Retrofit 2  

{% highlight java %}
public static void main(String... args) {  
    // Create a very simple REST adapter which points the GitHub API endpoint.
    GitHubClient client = ServiceGenerator.createService(GitHubClient.class);

    // Fetch and print a list of the contributors to this library.
    Call<List<Contributor>> call =
        client.contributors("fs_opensource", "android-boilerplate");

    List<Contributor> contributors = call.execute().body();

    for (Contributor contributor : contributors) {
        System.out.println(
                contributor.login + " (" + contributor.contributions + ")");
    }
} 
{% endhighlight %}  
 
  
###接下来 
接下来的文章将介绍了如何使用Retrofit实现基本身份验证。我们将展示代码例子来验证web服务或api使用用户名/电子邮件和密码。此外,未来的文章将介绍API认证tokens(包括OAuth)。  

我们希望你喜欢这个Retrofit的概述,以及如何实现你的第一个请求。  
  
  

本文永久链接[http://itxuye.com/retrofit-getting-started-and-android-client.html](http://itxuye.com/retrofit-getting-started-and-android-client.html),转载请注明出处，欢迎交流讨论。    