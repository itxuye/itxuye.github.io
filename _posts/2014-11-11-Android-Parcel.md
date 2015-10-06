---
author: itxuye
comments: true
date: 2014-11-11 17:25:08 +0800
layout: post
slug: Android-Parcel
title: android中的Parcel机制
postid: 02
categories: 
- android
tags:
 - android
 - parcel
---

###序列化是什么：
序列化是为了保存在内存中的各种对象的状态（也就是实例变量，不是方法），并且可以把保存的对象状态再读出来。虽然可以用自己的各种各样的方法来保存`object states`，但是**Java**提供了一种应该比较好的保存对象状态的机制，那就是序列化。
<!-- more -->
###序列化原因：
<li>永久性保存对象，保存对象的字节序列到本地文件中</li>
<li>通过序列化对象在网络中传递对象</li>
<li>通过序列化在进程间传递对象</li>


讲到**Pacel**机制，必然会想到java中的**Serializable**,在Android开发中，有时候需要从一个Activity中传递数据到另一个Activity中，在Bundle中已经封装好了简单数据类型:String 、int 、float等。但是如果想要传递一个复杂的数据类型，比如一个对象，在Bundle的方法中，有一个是putSerializable()方法，Serializable对象是一个可恢复对象接口，只需要让对象实现Serializable接口，就可以使用Bundle.putSerializable()方法传递对象数据。

**Serializable**示例代码：  
Person类：
{% highlight java %}  
   
public class Person  implements Serializable{
 String name;
 String pwd;
 String sex;
 Person(String name,String pwd,String sex){
 this.name=name;
 this.pwd=pwd;
 this.sex=sex;
}
}
 
{% endhighlight %}

activity代码：

{% highlight java %} 
 String gender=sex.isChecked()?"男":"女";
     Person p=new Person(editname.getText().toString()
     editpwd.getText().toString(),gender);
	 Bundle data=new Bundle();
	 data.putSerializable("person", p);
     Intent intent=new Intent(FirstActivity.this,ResultActivity.class);
	 intent.putExtras(data);
	 startActivity(intent);
{% endhighlight %}

###andoid中的Parcel机制
在**Android**系统中，定位为针对内存受限的设备，因此对性能要求更高，另外系统中采用了新的**IPC**（**进程间通信**）机制，必然要求使用性能更出色的对象传输方式。在这样的环境下，**Parcel**被设计出来，其定位就是轻量级的高效的对象序列化和反序列化机制。

###Android中序列化有以下几个特征：
<li>整个读写全是在内存中进行，所以效率比JAVA序列化中使用外部存储器会高很多</li>
<li>读写时是4字节对齐的</li>
<li>如果预分配的空间不够时，会一次多分配50%</li>
<li>对于普通数据，使用的是mData内存地址，对于IBinder类型的数据以及FileDescriptor使用的是mObjects内存地址。后者是通过flatten_binder()和unflatten_binder()实现的，目的是反序列化时读出的对象就是原对象而不用重新new一个新对象。</li>

**Parcel**示例代码：

{% highlight java %}
Intent mIntent =newIntent(this,ParcelableDemo.class);   
        Bundle mBundle =newBundle();   
        mBundle.putParcelable(PAR_KEY, mPolice);   
        mIntent.putExtras(mBundle);   
{% endhighlight %}

实体类：
{% highlight java %}
public class Police implements Parcelable {
        
    private String name;
    private int workTime;
    
    public String getName() {
        returnname; 
    } 
    
    public void setName(String name) {
        this.name = name;
    } 
    
    public int getWorkTime() { 
        returnworkTime; 
    } 
    
    public void setWorkTime(int workTime) {
        this.workTime = workTime;
    } 
        
    public static final Parcelable.Creator<Police> CREATOR =newCreator<Police>() {
    
        @Override 
        public Police createFromParcel(Parcel source) {
            Police police =newPolice();
            police.name = source.readString();
            police.workTime = source.readInt();
            returnpolice; 
        } 
    
        @Override 
        public Police[] newArray(int size) {
            returnnewPolice[size];
        } 
    }; 
    
    @Override 
    public int describeContents() { 
        return0; 
    } 
    
    @Override 
    public void writeToParcel(Parcel parcel, int flags) {
        parcel.writeString(name);
        parcel.writeInt(workTime);
    } 
} 
{% endhighlight %}


本文永久链接[itxuye](http://www.itxuye.com/Android-Parcel.html),可随意copy文中代码，转载请注明出处！
