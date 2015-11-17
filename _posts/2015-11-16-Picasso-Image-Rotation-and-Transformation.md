---
author: itxuye
comments: true
date: 2015-11-16 14:55:08 +0800
layout: post
slug: Picasso-Image-Rotation-and-Transformation
title: (译)Picasso-图像旋转和转换
postid: 1133
categories: 
- Picasso
tags:
- android
- Picasso
--- 
这是Square Picasso 图片加载开源库使用的一系列翻译文章,记录作为个人学习资料，翻译错误或者不当之处请在下方留言。  
  
你可以移动鼠标到上方的归档选择这一系列的文章进行阅读。  
  
原文地址 : [https://futurestud.io/blog/tag/picasso](https://futurestud.io/blog/tag/picasso)  
  
如果你阅读了所有以前的博客文章,你获得了一些综合知识关于picasso如何加载和处理图像。到目前为止,我们一直保持图像不变(除非调整和扩展,使其适合更好)。本周的博客文章都是关于操纵输入图像。  
  
<!-- more -->  
  
###Image Rotation  
  
在学习图像转换之前,你可能需要学习图像旋转。picasso内置支持旋转图像,然后显示它们。有两个选择:简单和复杂的旋转。  
  
####Simple Rotation  
  
简单的旋转调用是这样的:rotate(float degrees)。这个简单的旋转度的图像作为参数传递。之间的一个值0~360度最有意义(0到360的图像依然完好无损)。让我们看一个代码示例:  
{% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .rotate(90f)
    .into(imageViewSimpleRotate);
{% endhighlight %}  
  
这将把图像旋转90度。  
   
####Complex Rotation   
  
默认情况下,旋转中心(“支点”)是0,0。有时你可能需要指定不是标准的旋转中心来作为一个特定的轴心点旋转图像。你可以使用rotate(float degrees, float pivotX, float pivotY)。扩展的版本现在看起来像这样:   
{% highlight java %}  
Picasso
    .with(context)
    .load(R.drawable.floorplan)
    .rotate(45f, 200f, 100f)
    .into(imageViewComplexRotate);   
{% endhighlight %}  
  
###Transformation  
  
旋转只是一个小小的可能的图像处理技术的部分。毕加索是不可知的足以让任何图像处理的通用Transformation接口。您可以实现一个Transformation与执行的一个主要方法：transform(android.graphics.Bitmap source). 此方法实现位图转换。  
  
####Example #1: Blurring an Image(模糊图像)  
  
我们已经在以前的博客介绍了单个图像(independent of Picasso)模糊。我们优化这段代码，获得灵感来自两个类似的解决方案1、2。该类将扩展Transformation和执行必要的方法：  
{% highlight java %}  
public class BlurTransformation implements Transformation {
    RenderScript rs;
    public BlurTransformation(Context context) {
        super();
        rs = RenderScript.create(context);
    }
    @Override
    public Bitmap transform(Bitmap bitmap) {
        // Create another bitmap that will hold the results of the filter.
        Bitmap blurredBitmap = bitmap.copy(Bitmap.Config.ARGB_8888, true);
        // Allocate memory for Renderscript to work with
        Allocation input = Allocation.createFromBitmap(rs, blurredBitmap, Allocation.MipmapControl.MIPMAP_FULL, Allocation.USAGE_SHARED);
        Allocation output = Allocation.createTyped(rs, input.getType())
        // Load up an instance of the specific script that we want to use.
        ScriptIntrinsicBlur script = ScriptIntrinsicBlur.create(rs, Element.U8_4(rs));
        script.setInput(input);
        // Set the blur radius
        script.setRadius(10);
        // Start the ScriptIntrinisicBlur
        script.forEach(output);
        // Copy the output to the blurred bitmap
        output.copyTo(blurredBitmap);
        bitmap.recycle();
        return blurredBitmap;
    }
    @Override
    public String key() {
        return "blur";
    }
}
{% endhighlight %}  
  
转换添加到picasso是超级简单的：  
  
{% highlight java %}  
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .transform(new BlurTransformation(context))
    .into(imageViewTransformationBlur);  
{% endhighlight %}  
  
在它会显示在目标图像视图之前，这将模糊图像。  
  
####Example #2: Blurring and Gray-Scaling an Image(模糊和灰缩放图像)   
  
picasso也允许Transformations的参数是一个列表:transform(List<? extends Transformation> transformations)。这意味着你可以应用一系列Transformation到图像中。  
   
{% highlight java %} 
public class GrayscaleTransformation implements Transformation {
    private final Picasso picasso;
    public GrayscaleTransformation(Picasso picasso) {
        this.picasso = picasso;
    }
    @Override
    public Bitmap transform(Bitmap source) {
        Bitmap result = createBitmap(source.getWidth(), source.getHeight(), source.getConfig());
        Bitmap noise;
        try {
            noise = picasso.load(R.drawable.noise).get();
        } catch (IOException e) {
            throw new RuntimeException("Failed to apply transformation! Missing resource.");
        }
        BitmapShader shader = new BitmapShader(noise, REPEAT, REPEAT);
        ColorMatrix colorMatrix = new ColorMatrix();
        colorMatrix.setSaturation(0);
        ColorMatrixColorFilter filter = new ColorMatrixColorFilter(colorMatrix);
        Paint paint = new Paint(ANTI_ALIAS_FLAG);
        paint.setColorFilter(filter);
        Canvas canvas = new Canvas(result);
        canvas.drawBitmap(source, 0, 0, paint);
        paint.setColorFilter(null);
        paint.setShader(shader);
        paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.MULTIPLY));
        canvas.drawRect(0, 0, canvas.getWidth(), canvas.getHeight(), paint);
        source.recycle();
        noise.recycle();
        return result;
    }
    @Override
    public String key() {
        return "grayscaleTransformation()";
   }}  
{% endhighlight %}  
  
添加多个转换到picasso请求可能通过建立一个列表并将其作为参数传递：  
  
{% highlight java %}  
List<Transformation> transformations = new ArrayList<>();
transformations.add(new GrayscaleTransformation(Picasso.with(context)));
transformations.add(new BlurTransformation(context));
Picasso
    .with(context)
    .load(UsageExampleListViewAdapter.eatFoodyImages[0])
    .transform(transformations)
    .into(imageViewTransformationsMultiple);  
{% endhighlight %}  
  
转换图像应该给你足够的工具来更改根据您的需要。还有两个事实在执行一个自定义转换之前，你应该知道：  
  
> 仅返回原始，当不需要转换   

> 创建一个新的位图时，回收旧的位图  

本文永久链接[http://itxuye.com/Picasso-Image-Rotation-and-Transformation.html](http://itxuye.com/Picasso-Image-Rotation-and-Transformation.html),转载请注明出处，欢迎交流讨论。    
  
