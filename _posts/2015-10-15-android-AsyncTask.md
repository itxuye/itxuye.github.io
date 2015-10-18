---
author: itxuye
comments: true
date: 2015-10-15 11:50:08 +0800
layout: post
slug: android-AsyncTask
title: AsyncTask使用总结及拓展
postid: 1124
categories: 
- android
tags:
- android
- AsyncTask
---    
###使用AsyncTask的原因  
发生了ANR(application not responding)，主线程在5秒内未响应输入事件，即主线程阻塞.BroadcastReceiver没有在10秒内完成返回,产生的主要原因是可能是,在主线程内进行了耗时操作，例如网络操作，较大的IO操作，数据库操作。或许我们会使用线程来实现，但是如何终止以及获取最后的结果都要进行处理。因此谷歌给我们提供了AsyncTask类。
<!-- more -->  
###AsyncTask的简单介绍
AsyncTask是一个抽象类，因此要使用我们要定义一个类去继承AsyncTask类，在继承的时候我们发现有三个泛型参数
{% highlight java %}
private class MyTask extends AsyncTask<Params,Process,Result>{}
{% endhighlight %}   
  
1. Params   在执行AsyncTask时需要传入的参数，可用于在后台任务中使用。
2. Progress 后台任务执行时，如果需要在界面上显示当前的进度，则使用这里指定的泛型作为进度单位。
3. Result 当任务执行完毕后，如果需要对结果进行返回，则使用这里指定的泛型作为返回值类型。
   
 

在实现的时候，发现doInBackground(Params...) 方法是我们必须实现的，其实在这个方法中实现的代码就是我们要去处理的耗时任务。如果我们要进行UI元素的更新可以在这里使用publishProgress(Progress...)方法来实现。其他通常我们还需要复写的方法有:  

***onPreExecute()***

这个方法会在后台任务开始执行之间调用，用于进行一些界面上的初始化操作，比如显示一个进度条对话框等。  

***onProgressUpdate(Progress...)***

当在后台任务中调用了publishProgress(Progress...)方法后，这个方法就很快会被调用，方法中携带的参数就是在后台任务中传递过来的。在这个方法中可以对UI进行操作，利用参数中的数值就可以对界面元素进行相应的更新。
  

***onPostExecute(Result)***

当后台任务执行完毕并通过return语句进行返回时，这个方法就很快会被调用。返回的数据会作为参数传递到此方法中，可以利用返回的数据来进行一些UI操作，当然最后一些加载进度的UI也应该这里处理。

###完整的Demo示例  
{% highlight java %}
 private class DownloadAsyncTask extends AsyncTask<String , Integer, String> {
	//进度加载框
    private ProgressDialog mDialog;

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
		 mDialog = new ProgressDialog(MainActivity.this);
         mDialog.show();//显示进度框
    }
    @Override 
    protected void onPostExecute(String aVoid) {
        super.onPostExecute(aVoid);
		//取消进度加载框
        mDialog.dismiss();
    }
    @Override 
    protected void onProgressUpdate(Integer... values)
    { super.onProgressUpdate(values);
        mProgressBar.setProgress(values[0]);
    }
   
    @Override
    protected void onCancelled() {
        super.onCancelled();
		//判断task状态是否是否是需要取消
        if(isCancled){
         mDialog.dismiss();
     }
    }
    @Override 
    protected String doInBackground(String... params) {
    String urlStr = params[0];
    FileOutputStream output = null;
	HttpURLConnection connection=null;
    try { 
		URL url = new URL(urlStr) ;
        connection = (HttpURLConnection)url.openConnection();
        String filePath = "myPac";
        File file = new File(Environment.getExternalStorageDirectory() + "/" + filePath);
        if (file.exists()) {
            file.delete();
        }
        file.createNewFile();
        InputStream input = connection.getInputStream();
        output = new FileOutputStream(file);
        int total = connection.getContentLength();
        if (total <= 0)
        { return null;
        }
        int plus = 0;
        int totalRead = 0;
        byte[] buffer = new byte[4*1024];
        while((plus = input.read(buffer)) != -1){
            output.write(buffer);
            totalRead += plus;
            publishProgress(totalRead * 100 / total);
            if (isCancelled())
            { break; }
        } output.flush();
    } catch (MalformedURLException e)
    { e.printStackTrace(); 
        if (output != null) { 
            try {
                output.close(); 
            } catch (IOException e2) {
                e2.printStackTrace(); 
            } 
        } 
    } catch (IOException e) {
        e.printStackTrace();
        if (output != null) {
            try { 
                output.close();
            } catch (IOException e2) {
                e2.printStackTrace(); 
            } 
        } 
    } finally { 
        if (output != null) { 
            try { 
                output.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } 

		if(connection!=null){
		 connection.disconnect();
	}
    } 
     return null;
        }
    }
{% endhighlight %}  
  
###使用AsyncTask的注意点  
1. AsyncTask的创建必须在主线程，execute()方法也必须在主线程中调用.
2. doInBackground(Params...)方法执行异步任务运行在子线程中，其他方法运行在主线程中，可以操作UI组件。  
3. 一个任务AsyncTask任务只能被执行一次。  
4. 我们会使用cancel(boolean)方法来是否取消任务，其实这并不能直接取消任务，此时调用这个方法，只是设定了异步任务运行的状态是可取消的还是不可取消的，cancel(true)只是说明此时任务可被取消。  
###AsyncTask的取消
{% highlight java %}
 new task.execute();
 task.cancel(true);
{% endhighlight %}   
  
{% highlight java %}
  if (isCancelled()) {
             break;
         }
{% endhighlight %}   

当然，AsyncTask的使用很简单，但是某些体验却是很糟糕的，官方也在3.0之后加入了Loaders来解决一些问题。现在还有Rxjava来优雅的处理异步，也值得去学习。
  
本文永久链接[http://itxuye.com/android-AsyncTask.html](http://itxuye.com/android-AsyncTask.html),转载请注明出处，欢迎交流讨论。  