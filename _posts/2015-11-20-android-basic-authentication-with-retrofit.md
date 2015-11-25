---
author: itxuye
comments: true
date: 2015-11-20 9:51:08 +0800
layout: post
slug: android-basic-authentication-with-retrofit
title: (译)Retrofit-Android上的基本身份验证
postid: 1135
categories: 
- Retrofit
tags:
- android
- Retrofit
--- 
这是Square Retrofit 网络开源库使用的一系列翻译文章,仅记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/retrofit](https://futurestud.io/blog/tag/retrofit)  
  
这是Retrofit系列文章的第二篇文章。它解释了如何使用Retrofit集成身份验证用户名/电子邮件和密码.  
  
在本系列的入门文章,我们创建了一个初始版本的Android客户端执行API/HTTP请求。从前面的文章，我们将使用客户基础和加强它与其他功能用于基本身份验证。  
  
再次，你可以阅读Retrfit入门来获得更多的信息来创建一个android客户端。  
   
<!-- more -->   
 
###整合基本身份验证  
  
让我们更新ServiceGenerator类,并创建一个方法添加身份验证请求。下面的代码片段从上面扩展了ServiceGenerator类。我们增加了retrofit的代码更新，以下代码片段是1.9。如果你依赖于Retrofit版本的改造,就提前偷偷看看第二个代码块:  
  
####Retrofit 1.9  

{% highlight java %}
public class ServiceGenerator {
    public static final String API_BASE_URL = "http://your.api-base.url";
    private static RestAdapter.Builder builder = new RestAdapter.Builder()
                .setEndpoint(API_BASE_URL)
                .setClient(new OkClient(new OkHttpClient()));
    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null, null);
    }
    public static <S> S createService(Class<S> serviceClass, String username, String password) {
        if (username != null && password != null) {
            // concatenate username and password with colon for authentication
            String credentials = username + ":" + password;
            // create Base64 encodet string
            final String basic =
                    "Basic " + Base64.encodeToString(credentials.getBytes(), Base64.NO_WRAP);
            builder.setRequestInterceptor(new RequestInterceptor() {
                @Override
                public void intercept(RequestFacade request) {
                    request.addHeader("Authorization", basic);
                    request.addHeader("Acceppt", "application/json");
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
    public static final String API_BASE_URL = "http://your.api-base.url";

    private static OkHttpClient httpClient = new OkHttpClient();
    private static Retrofit.Builder builder =
            new Retrofit.Builder()
                    .baseUrl(API_BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create());

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null, null);
    }

    public static <S> S createService(Class<S> serviceClass, String username, String password) {
        if (username != null && password != null) {
            String credentials = username + ":" + password;
            final String basic =
                    "Basic " + Base64.encodeToString(credentials.getBytes(), Base64.NO_WRAP);
            httpClient.interceptors().clear();
            httpClient.interceptors().add(new Interceptor() {
                @Override
                public Response intercept(Interceptor.Chain chain) throws IOException {
                    Request original = chain.request();

                    Request.Builder requestBuilder = original.newBuilder()
                        .header("Authorization", basic);
                        .header("Accept", "applicaton/json");
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
  
新的(二)方法有两个参数:用户名和密码。你也可以使用用户名参数的电子邮件。创建客户机的基本方法与第一个方法是一样的:使用RestAdapter(Retrofit在2中)类创建OkHttp客户对于任何HTTP请求和响应处理。  
  
现在的区别：我们使用RequestInterceptor(Interceptor in Retrofit 2)设置与此OkHttp客户端执行的任何HTTP请求的授权标头值。这样做如果提供用户名和密码的参数。如果你不将任何用户名和密码传递给方法，它会像第一种方法创建同一客户端。这就是为什么我们可以从ServiceGenerator类简化第一个方法。  
  
为了身份验证我们必须调整格式的用户名/电子邮件和密码。基本身份验证需要两个值作为一个连接字符串冒号隔开。此外,新创建的(连接)是Base64编码的字符串。  
  
几乎所有的webservice和API会评估授权的HTTP请求头。这就是为什么我们设置凭据值编码标头字段。如果你要使用该客户端来调用webservice指定另一头字段期望用户的凭证,调整头字段授权你的头字段。  
  
Accept头是很重要的,如果你想从服务器响应收到一个特定的格式。在我们的例子中我们要接收响应JSON格式化,因为Retrofit附带谷歌GSON到JSON表示序列化对象,反之亦然。  
  
###Usage  
  
像我们之前在Retrofit入门例子一样调用ServiceGenerator类。例如,让我们假设您定义了一个LoginService像下面的代码。  
  
####Retrofit 1.9
{% highlight java %}
public interface LoginService {  
    @POST("/login")
    User basicLogin();
}  
{% endhighlight %}   
  

####Retrofit 2
{% highlight java %}
public interface LoginService {  
    @POST("/login")
    Call<User> basicLogin();
}
{% endhighlight %}   
  
上面的接口只有一个方法：basicLogin。
它具有User类的响应值，并且不期望任何额外的查询或路径参数。 
现在，你可以通过你给定的credentials(username, password)创建您的HTTP客户端。  
  
####Retrofit 1.9
{% highlight java %}
LoginService loginService =  
    ServiceGenerator.createService(LoginService.class, "user", "secretpassword");
User user = loginService.basicLogin(); 
{% endhighlight %}   
  
 
####Retrofit 2
{% highlight java %}
LoginService loginService =  
   ServiceGeneratorcreateService(LoginService.class, "user", "secretpassword");
Call<User> call = loginService.basicLogin();  
User user = call.execute().body(); 
{% endhighlight %}   
  
ServiceGenerator方法将创建HTTP客户端包括头定义的授权。一旦你调用loginService basicLogin方法,提供凭证将自动传递给请求API端点。  
  
  
本文永久链接[http://itxuye.com/android-basic-authentication-with-retrofit.html](http://itxuye.com/android-basic-authentication-with-retrofit.html),转载请注明出处，欢迎交流讨论。 