---
author: itxuye
comments: true
date: 2015-11-21 15:46:08 +0800
layout: post
slug: oauth-2-on-android-with-retrofit
title: (译)Retrofit-Android上的基本身份验证
postid: 1136
categories: 
- Retrofit
tags:
- android
- Retrofit
--- 
这是Square Retrofit 网络开源库使用的一系列翻译文章,仅记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/retrofit](https://futurestud.io/blog/tag/retrofit)   
  
Retrofit系列中的这篇文章描述和说明了如何验证一个OAuth API在你的Android应用程序。让我们先从本系列中以前的文章的概述开始。   
  
这篇文章对OAuth本身不会详细赘述。它只是提出了基本原则和必要的细节了解身份验证流。  
  
###OAuth基础知识   
  
OAuth是一个基于token授权方法，它使用一个访问token来完成API与用户之间的互动。OAuth要求几个步骤来访问API来获得你的token。  
  
> 1.使用你要开发的开发者网站的公共API。注册指定的API开发应用开发程序。

> 2.在你的应用程序保存客户端id和客户端密钥。

> 3.从您的应用程序请求访问用户数据。 

> 4.使用授权代码获取访问token。

> 5.使用访问token与API进行交互。  
  
###创建您的项目  
  
我们假设您已经有一个现有的项目。如果你没有,就继续,从头创建一个Android项目。当你完成后,继续下一个部分和准备的编码.  
  
###OAuth集成   
  
因为我们使用ServiceGenerator类从我们之前Retriofit基本身份验证,我们将进一步扩展,添加一个方法来处理OAuth访问token。下面的代码片段显示了所需的ServiceGenerator类中的方法。这并不意味着你应该删除先前创建的基本身份验证方法(s),因为在OAuth中同样需要他们。 
    
  
####Retrofit 1.9
{% highlight java %}
public class ServiceGenerator {

    public static final String API_BASE_URL = "http://your.api-base.url";

    private static RestAdapter.Builder builder = new RestAdapter.Builder()
                .setEndpoint(API_BASE_URL)
                .setClient(new OkClient(new OkHttpClient()));

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null);
    }

    public static <S> S createService(Class<S> serviceClass, String username, String password) {
        // we shortened this part, because it’s covered in 
        // the previous post on basic authentication with Retrofit
    }

    public static <S> S createService(Class<S> serviceClass, AccessToken token) {
          if (token != null) {
              builder.setRequestInterceptor(new RequestInterceptor() {
                  @Override
                  public void intercept(RequestFacade request) {
                      request.addHeader("Accept", "application/json")
                      request.addHeader("Authorization", 
                          token.getTokenType() + " " + token.getAccessToken());
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
        return createService(serviceClass, null);
    }

    public static <S> S createService(Class<S> serviceClass, String username, String password) {
        // we shortened this part, because it’s covered in 
        // the previous post on basic authentication with Retrofit
    }

    public static <S> S createService(Class<S> serviceClass, AccessToken token) {
        if (token != null) {
            httpClient.interceptors().clear();
            httpClient.interceptors().add(new Interceptor() {
                @Override
                public Response intercept(Interceptor.Chain chain) throws IOException {
                    Request original = chain.request();

                    Request.Builder requestBuilder = original.newBuilder()
                        .header("Accept", "applicaton/json")
                        .header("Authorization",
                            token.getTokenType() + " " + token.getAccessToken())
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
  
我们使用RequestInterceptor设置Authorization(授权)领域内的HTTP请求头。这一领域包括两个部分:首先,token类型是对OAuth请求的凭证，第二,访问token。  
  

正如你所看到的在上面的代码片段中,该方法需要一个AccessToken作为第三个参数。这个类是这样的:  

{% highlight java %}  
public class AccessToken {

    private String accessToken;
    private String tokenType;

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        // OAuth requires uppercase Authorization HTTP header value for token type
        if ( ! Character.isUpperCase(tokenType.charAt(0))) {
            tokenType = 
                Character
                    .toString(tokenType.charAt(0))
                    .toUpperCase() + tokenType.substring(1);
        }

        return tokenType;
    }
}  
 {% endhighlight %}  
  
AccessToken类包含两个字段:accesToken和tokenType。因为OAuth API的token类型实现需要大写,所以我们首先检查样式。如果它不适合,我们将更新风格。例如,API返回token类型凭证,任何请求与这种风格会导致401未经授权,403禁止或400无法访问。  
  
HTTP报头字段将正确设置时看起来像下面的例子:  
  
***Authorization: Bearer 12345 ***  
  
###在你APP中集成OAuth  
  
首先,我们将创建一个名为LoginActivity的新activity。您可以使用一个简单的视图布局代码(如下)只有一个按钮。这是新activity的代码。  
  
{% highlight java %}  
public class LoginActivity extends Activity {

    // you should either define client id and secret as constants or in string resources
    private final String clientId = "your-client-id";
    private final String clientSecret = "your-client-secret";
    private final String redirectUri = "your://redirecturi";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button loginButton (Button) findViewById(R.id.loginbutton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse(ServiceGenerator.API_BASE_URL + "/login" + "?client_id=" + clientId + "&redirect_uri=" + redirectUri));
                startActivity(intent);
            }
        });
    }
}   
 {% endhighlight %}   
   
  
你必须为类属性调整值clientId,clientSecret redirectUri。另外,确保登录部分url是accessable /login。如果不是,更新这部分合适的一个。此外,设置一个onclick侦听器在onCreate方法定义的登录按钮。一旦onclick事件触发,它创建一个新的意图表现的webview定义的Uri。  
{% highlight xml %}    
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >
    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Login"
        android:id="@+id/loginbutton"
        android:gravity="center_vertical|center_horizontal"
        />
</RelativeLayout> 
{% endhighlight %}     
  

###在AndroidManifest.Xml中定义  
Android是一个消息对象的意图用于请求行动或信息从另一个应用程序或组件(沟通)。意图过滤器是用来捕捉一个消息从一个意图,被意图的行动、类别和数据。  
  
intent filter是必需的，使android返回到您的应用程序，所以你可以从您的意图抓住进一步响应数据。这意味着，在单击登录按钮后，在开始时，意图在你的容器组件内，此筛选器捕获任何反应，使更多的信息可用。下面的代码显示了在androidmanifest.xml中的活动定义。这acitvity的xml包括意图过滤器。   
  
{% highlight xml %}
<activity  
    android:name="com.futurestudio.oauthexample.LoginActivity"
    android:label="@string/app_name"
    android:configChanges="keyboard|orientation|screenSize">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:host="redirecturi"
            android:scheme="your" />
    </intent-filter>
</activity>    
{% endhighlight %}  
  
###捕获授权代码  
  
好了,到这里我们已经定义了意图展示的webview表现为拒绝或允许视图。你会注意到这个视图的视图风格当你看到的时候。  
  
现在我们想要得到进一步的访问token进行API交互。这个token是另一个两个API请求。首先,我们需要解析和使用返回的授权代码，当按下allow按钮来响应webview意图。下面的方法属于LoginActivity。我们分开它因为这样更容易解释。  
  
{% highlight java %}  
@Override
protected void onResume() {  
    super.onResume();

    // the intent filter defined in AndroidManifest will handle the return from ACTION_VIEW intent
    Uri uri = getIntent().getData();
    if (uri != null && uri.toString().startsWith(redirectUri)) {
        // use the parameter your API exposes for the code (mostly it's "code")
        String code = uri.getQueryParameter("code");
        if (code != null) {
            // get access token
            // we'll do that in a minute
        } else if (uri.getQueryParameter("error") != null) {
            // show an error message here
        }
    }
}  
{% endhighlight %}   
  
Android应用程序返回到生命周期onResume方法。在这里你可以看到我们使用getIntent().getData()方法来检索意图的反应。  
  
现在,当我们检查值时我们不想遇到任何NullPointerException。后来,我们从查询参数提取授权代码。当点击允许按钮时想象响应url像这样：  
  
***your://redirecturi?code=1234 *** 而不是 ***your://redirecturi?error=message ***   
  
###获得Access Token  
  
几乎就要完成了,访问token是一个请求。现在我们已经授权的代码,我们需要请求访问tooken通过client id, client secret and authorization code来调用授权代码的API。  
  
在下面，我们就扩展先前提出的控制权方法去做另一个API请求。但首先，我们必须扩展服务函数接口，并定义一个方法来请求访问令牌。用另一种方法getAccessToken从基本身份验证后，我们就延长服务函数。  
  
####Retrofit 1.9
{% highlight java %} 
public interface LoginService {  
    @POST("/token")
    AccessToken getAccessToken(
            @Query("code") String code,
            @Query("grant_type") String grantType);
}  
{% endhighlight %}  
  
     
####Retrofit 2
{% highlight java %}
public interface LoginService {  
    @POST("/token")
    Call<AccessToken> getAccessToken(
            @Query("code") String code,
            @Query("grant_type") String grantType);
}
{% endhighlight %}  
  
这是接口定义后传入ServiceGenerator创建一个Retofit的HTTP客户端。getAccessToken方法预计两个查询参数。现在onResume得到token的完整代码。   
  
  
####Retrofit 1.9
{% highlight java %}
@Override
protected void onResume() {  
    super.onResume();

    // the intent filter defined in AndroidManifest will handle the return from ACTION_VIEW intent
    Uri uri = getIntent().getData();
    if (uri != null && uri.toString().startsWith(redirectUri)) {
        // use the parameter your API exposes for the code (mostly it's "code")
        String code = uri.getQueryParameter("code");
        if (code != null) {
            // get access token
            LoginService loginService = 
                ServiceGenerator.createService(LoginService.class, clientId, clientSecret);
            AccessToken accessToken = loginService.getAccessToken(code, "authorization_code"); 
        } else if (uri.getQueryParameter("error") != null) {
            // show an error message here
        }
    }
}  
{% endhighlight %}    
  

####Retrofit 2
{% highlight java %}
@Override
protected void onResume() {  
    super.onResume();

    // the intent filter defined in AndroidManifest will handle the return from ACTION_VIEW intent
    Uri uri = getIntent().getData();
    if (uri != null && uri.toString().startsWith(redirectUri)) {
        // use the parameter your API exposes for the code (mostly it's "code")
        String code = uri.getQueryParameter("code");
        if (code != null) {
            // get access token
            LoginService loginService = 
                ServiceGenerator.createService(LoginService.class, clientId, clientSecret);
            Call<AccessToken> call = loginService.getAccessToken(code, "authorization_code");
            AccessToken accessToken = call.execute().body();
        } else if (uri.getQueryParameter("error") != null) {
            // show an error message here
        }
    }
}   
{% endhighlight %}   
  
你就完成了。你可能需要调整你reqestinggrant API类型值。grant类型作为第二个参数传递给getAccessToken(code,grantType)方法。   
  
享受任何OAuth身份验证API。如果你遇到问题或问题,就通过@futurstud_io联系我们。  
  
  
本文永久链接[http://itxuye.com/oauth-2-on-android-with-retrofit.html](http://itxuye.com/oauth-2-on-android-with-retrofit.html),转载请注明出处，欢迎交流讨论。 