---
author: itxuye
comments: true
date: 2015-09-16 10:22:08 +0800
layout: post
slug: android-activity
title: Activity详细总结
postid: 1123
categories: 
- android
tags:
- android
- activity
---   
Activity是android四大组件中使用频率最为频繁的组件，相当于负责与用户交互的窗口。我们调用setContentView(R.layout.xxxviewId)来指定当前actvity的界面。  

###Activity的生命周期
学习新的知识是可以类比的，以前在学习servlet的时候，就知道servlet有lifecycle，都有一系列创建实例，初始化，销毁的过程。同样，activity也是具有自己的lifecycle，android官网关于生命周期有一张经典的图：
[![Activity](http://7s1s78.com1.z0.glb.clouddn.com/activity_lifecycle.png)](http://7s1s78.com1.z0.glb.clouddn.com/activity_lifecycle.png)
<!-- more -->    
{% highlight java %}
    /**
     * activity创建的时候调用
     */
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 ｝
  /**
     * activity可见的时候调用
     */
    @Override
    protected void onStart() {
        super.onStart();
        Log.i(TAG, "onStart called.");
    }

    //Activity从后台重新回到前台时被调用
    @Override
    protected void onRestart() {
        super.onRestart();
        Log.i(TAG, "onRestart called.");
    }

    /**
    Activity创建或者从被覆盖、后台重新回到前台时被调用
     获取焦点的时候调用
     *
     */
    @Override
    protected void onResume() {
        super.onResume();
        Log.i(TAG, "onResume called.");
    }

    //Activity窗口获得或失去焦点时被调用,在onResume之后或onPause之后
    /*@Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        Log.i(TAG, "onWindowFocusChanged called.");
    }*/

    //Activity被覆盖到下面或者锁屏时被调用,失去焦点时候调用
    @Override
    protected void onPause() {
        super.onPause();
        Log.i(TAG, "onPause called.");
        //有可能在执行完onPause或onStop后,系统资源紧张将Activity杀死,所以有必要在此保存持久数据
    }

    //退出当前Activity或者跳转到新Activity时被调用
    @Override
    protected void onStop() {
        super.onStop();
        Log.i(TAG, "onStop called.");
    }

    //退出当前Activity时被调用,调用之后Activity就结束了
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i(TAG, "onDestory called.");
    }

    /**
     * Activity被系统杀死时被调用.
     * 例如:屏幕方向改变时,Activity被销毁再重建;当前Activity处于后台,系统资源紧张将其杀死.
     * 另外,当跳转到其他Activity或者按Home键回到主屏时该方法也会被调用,系统是为了保存当前View组件的状态.
     * 在onPause之前被调用(3.0之前).3.0之后在onPause()之后调用
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {

        outState.putInt("param", param);
        Log.i(TAG, "onSaveInstanceState called. put param: " + param);
        super.onSaveInstanceState(outState);
    }

    /**
     * Activity被系统杀死后再重建时被调用.
     * 例如:屏幕方向改变时,Activity被销毁再重建;当前Activity处于后台,系统资源紧张将其杀死,用户又启动该Activity.
     * 这两种情况下onRestoreInstanceState都会被调用,在onStart之后.
     */
    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        param = savedInstanceState.getInt("param");
        Log.i(TAG, "onRestoreInstanceState called. get param: " + param);
        super.onRestoreInstanceState(savedInstanceState);
    }
{% endhighlight %}  
  
###Activity之间传递数据
####通过Intent传递数据
通过Intent.putExtra方法可以将简单数据类型或可序列化对象(对象必须实现Serializable或者Parcelable接口)保存在Intent对象中，然后在另一个Activity中使用getInt、getString等方法获得这些数据。代码示例如下:  
{% highlight java %}
  Intent intent = new Intent(MainActivity.this, TargetActivity.class);
  intent.putExtra("boolean", true); 
  intent.putExtra("string", "string");
  startActivity(intent);
{% endhighlight %}   
下面是获取数据:
{% highlight java %}
 Intent intent=getIntent();
 intent.getBooleanExtra("boolean"); 
 intent.getStringExtra("string");
{% endhighlight %}     
####通过Intent和bundle传递数据  
{% highlight java %}
  Intent intent = new Intent(MainActivity.this, TargetActivity.class);
  Bundle bundle =new Bundle();
  bundle.putExtra("boolean", true); 
  bundle.putExtra("string", "string");
  intent.putExtras(bundle);
  startActivity(intent);
{% endhighlight %}   
下面是获取数据:
{% highlight java %}
 Intent intent=getIntent();
 Bundle bundle = intent.getExtras();
 bundle.getBooleanExtra("boolean"); 
 bundle.getStringExtra("string");
{% endhighlight %}    
####从Activity返回数据  
启动新的Activity  
{% highlight java %}
  Intent intent = new Intent(MainActivity.this, TargetActivity.class);
  startActivityForResult(intent,1); //注意调用的方法，1是约定的响应值(requestCode)
{% endhighlight %}    
在新的Activity中处理
{% highlight java %}  
 Intent intent = new Intent(); 
 Bundle bundle = new Bundle();
 bundle.putString("result", "返回的数据"); 
 intent.putExtras(bundle); 
 setResult(RESULT_OK, intent); //RESULT_OK是返回状态码 this.finish();
{% endhighlight %}  
在Activity1的中的处理,重写onActivityResault方法，接受数据
  
{% highlight java %}
 @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode==1&&resultCode==RESULT_OK){
		Bundle bundle =data.getExtras(); 
        String result = bundle.getInt("result");
     }
    }
{% endhighlight %}   
###Activity的状态保存  
在Activity生命周期的代码中我已经使用到这两个方法：  
{% highlight java %}
  /**
     * Activity被系统杀死时被调用.
     * 例如:屏幕方向改变时,Activity被销毁再重建;当前Activity处于后台,系统资源紧张将其杀死.
     * 另外,当跳转到其他Activity或者按Home键回到主屏时该方法也会被调用,系统是为了保存当前View组件的状态.
     * 在onPause之前被调用(3.0之前).3.0之后在onPause()之后调用
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {

        outState.putInt("param", param);
        Log.i(TAG, "onSaveInstanceState called. put param: " + param);
        super.onSaveInstanceState(outState);
    }

    /**
     * Activity被系统杀死后再重建时被调用.
     * 例如:屏幕方向改变时,Activity被销毁再重建;当前Activity处于后台,系统资源紧张将其杀死,用户又启动该Activity.
     * 这两种情况下onRestoreInstanceState都会被调用,在onStart之后.
     */
    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        param = savedInstanceState.getInt("param");
        Log.i(TAG, "onRestoreInstanceState called. get param: " + param);
        super.onRestoreInstanceState(savedInstanceState);
    }
{% endhighlight %}  
但是在onSaveInstanceState中只适合保存瞬态数据，持久化数据应该在onPause中保存.

###AndroidMainifest启动模式  
####standard  
默认的启动模式，如果不指定Activity的启动模式，就会默认调用的模式。这种启动模式每次都会创建新的实例，如果此时Activity栈里面有个MainActivity,当调用standard模式启动的时候，会创建新的MainActivity实例覆盖在原先的之上。  
####singleTop
系统会先判断栈顶的Activity是否是要启动的Activity，如果是，则调用onNewIntent()方法，不再生成实例，启动栈顶的实例。如果不是，则会创建新的实例，那么下次则不会创建新的实例。适用于类似QQ信息的弹窗。
####singleTask  
如果在栈中已经有该Activity的实例，就重用该实例(会调用实例的 onNewIntent())。重用时，会让该实例回到栈顶，因此在它上面的实例将会被移出栈。如果栈中不存在该实例，将会创建新的实例放入栈中。singleTask 模式可以用来退出整个应用。将主Activity设为SingTask模式，然后在要退出的Activity中转到主Activity，然后重写主Activity的onNewIntent函数，并在函数中加上一句finish。  
####singleInstance  
在一个新栈中创建该Activity的实例，并让多个应用共享该栈中的该Activity实例。一旦该模式的Activity实例已经存在于某个栈中，任何应用再激活该Activity时都会重用该栈中的实例( 会调用实例的 onNewIntent())。其效果相当于多个应用共享一个应用，不管谁激活该 Activity 都会进入同一个应用中。
  
###Intent Flag启动模式
 1.FLAG_ACTIVITY_NEW_TASK   
 在新的Task中启动Activity  
 2.FLAG_ACTIVITY_SINGLE_TOP  
 使用singleTop模式启动Activity  
 3.FLAG_ACTIVITY_CLEAR_TOP  
 使用singleTask模式启动Activity  
      


####参考阅读：  
  
---

> 《Android群英传》第八章节  
  
> 《安卓第一行代码》  
  
本文永久链接[http://itxuye.com/android-activity.html](http://itxuye.com/android-activity.html),转载请注明出处，欢迎交流讨论。  



