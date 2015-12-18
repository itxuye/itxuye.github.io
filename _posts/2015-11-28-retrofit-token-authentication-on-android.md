---
author: itxuye
comments: true
date: 2015-11-28 15:46:08 +0800
layout: post
slug: oauth-2-on-android-with-retrofit
title: (译)Retrofit-Android上的token验证
postid: 1137
categories: 
- Retrofit
tags:
- android
- Retrofit
--- 
这是Square Retrofit 网络开源库使用的一系列翻译文章,仅记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/retrofit](https://futurestud.io/blog/tag/retrofit)   
  
这篇文章是一个除了前面的帖子使用retrofit进行基本的身份验证和使用基于OAuth的基本APIS。我们将讨论的话题token认证从一个Android应用到任何网络服务或API支持这种认证。    
  
<!-- more -->   
  
###Integrate Token Authentication  
如果你读前面的帖子关于使用retrofit的身份验证,你会猜到我们要怎么做:扩展ServiceGenerator类和集成方法处理token认证。让我们直接与第二个扩展ServiceGenerator createService方法:  
  
####Retrofit 1.9
{% highlight java %}
public class ServiceGenerator {

    public static final String API_BASE_URL = "https://your.api-base.url";

    private static RestAdapter.Builder builder = new RestAdapter.Builder()
                .setEndpoint(API_BASE_URL)
                .setClient(new OkClient(new OkHttpClient()));

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null);
    }

    public static <S> S createService(Class<S> serviceClass, final String authToken) {  
      if (authToken != null) {
          builder.setRequestInterceptor(new RequestInterceptor() {
              @Override
              public void intercept(RequestFacade request) {
                  request.addHeader("Authorization", authToken);
              }
          });
      }

      RestAdapter adapter = builder.build();
      return adapter.create(serviceClass);
    }
}  
{% endhighlight %} 
  
####Retrofit 2  

{% highlight java %}
public class ServiceGenerator {

    public static final String API_BASE_URL = "https://your.api-base.url";

    private static OkHttpClient httpClient = new OkHttpClient();
    private static Retrofit.Builder builder =
            new Retrofit.Builder()
                    .baseUrl(API_BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create());

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null);
    }

    public static <S> S createService(Class<S> serviceClass, final String authToken) {
        if (authToken != null) {
            httpClient.interceptors().clear();
            httpClient.interceptors().add(new Interceptor() {
                @Override
                public Response intercept(Interceptor.Chain chain) throws IOException {
                    Request original = chain.request();

                    // Request customization: add request headers
                    Request.Builder requestBuilder = original.newBuilder()
                            .header("Authorization", authToken)
                            .method(original.method(), original.body());

                    Request request = requestBuilder.build();
                    return chain.proceed(request);
                }
            });
        }

        Retrofit retrofit = builder.client(httpClient).build();
        return retrofit.create(serviceClass);
    }
}
{% endhighlight %}   
  
正如你所看到的,我们通过身份验证标记作为一个字符串变量方法,使用RequestInterceptor(Interceptor in Retrofit 2)设置HTTP标头字段进行授权。如果你使用另一个HTTP报头字段为您的身份验证token,上面的代码调整或创建一个新的方法处理所需的功能。   
  
从现在开始,每一个HTTP客户端创建该方法集成了令牌授权头字段的值,并自动传递token值与任何请求API端点。  
  
###Example Usage  
  
让我们创建一个例子,看看一些代码。下面的UserService接口声明一个方法叫me()。这个示例方法返回一个用户对象从API创建响应。  
  
####Retrofit 1.9
{% highlight java %}
public interface UserService {  
    @POST("/me")
    User me();
}  
{% endhighlight %}    

####Retrofit 2
{% highlight java %}
public interface UserService {  
    @POST("/me")
    Call<User> me();
}
{% endhighlight %}   
  
要特殊照顾调用API等待在终点HTTP任何要求：//your.api-base.url/me并要求身份验证以获取用户数据的响应。现在，让我们创建一个用户服务对象，做实际的请求 .  
  
####Retrofit 1.9
{% highlight java %}
UserService userService =  
    ServiceGenerator.create(UserService.class, "auth-token");
User user = userService.me();  
{% endhighlight %}   
    
####Retrofit 2
{% highlight java %}
UserService userService =  
    ServiceGenerator.create(UserService.class, "auth-token");
Call<User> call = userService.me();  
User user = call.execute().body();  
{% endhighlight %}  
  
这段代码演示了如何使用了类。当然,你必须要经过实际验证token值ServiceGenerator方法。  
  
  
本文永久链接[http://itxuye.com/oauth-2-on-android-with-retrofit.html](http://itxuye.com/oauth-2-on-android-with-retrofit.html),转载请注明出处，欢迎交流讨论。  
  
