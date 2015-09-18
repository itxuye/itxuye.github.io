---
author: itxuye
comments: true
date: 2014-11-20 17:25:08 +0800
layout: post
slug: Android-Json
title: Json的创建与android下的解析
postid: 03
categories: 
- android
tags:
 - android
 - Json
---

这两天在学习javaweb的东西，又一次接触到了**json**这个非常方便操作的数据结构，所以今天想从**json**的创建与解析来简单的总结下json的一些知识, **文末有代码示例下载**。
<!-- more -->
###json的基础知识：
JSON是一种取代XML的数据结构,和xml相比,它更小巧但描述能力却不差,由于它的小巧所以网络传输数据将减少更多流量从而加快速度。

那么,JSON到底是什么?[json官网](http://www.json.org/)

JSON就是一串字符串 只不过元素会使用特定的符号标注。

{} 双括号表示对象

[] 中括号表示数组

"" 双引号内是属性或值

: 冒号表示后者是前者的值(这个值可以是字符串、数字、也可以是另一个数组或对象)

所以``` {"name": "Jack"}``` 可以理解为是一个包含name为Jack的对象

而```[{"name": "jack"},{"name": "Alex"}]```就表示包含两个对象的数组

当然了,你也可以使用```{"name":["Jack","Alex"]}```来简化上面一部,这是一个拥有一个name数组的对象.

###那么下面我就通过代码示例来具体讲一下json的几种创建格式。
在讲Json数据的创建之前，我们需要在工程中加入几个依赖jar包，这些jar包我们可以在json官网和Apache官网下载到:
  
[![json](http://itxuye.qiniudn.com/JSON.png)](http://itxuye.qiniudn.com/JSON.png)

首先我们得创建一个WEB工程，在工程中加入上面我们需要的几个依赖jar包之后便可编写程序了。
  
{% highlight java %}
创建对象类：
public class Product {

    private String name;
    private double price;
    private int quantity;
    //省去了set get方法
    public Product() {
        // TODO Auto-generated constructor stub
    }
    public Product(String name, double price, int quantity) {
        super();
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    @Override
    public String toString() {
        return "Product [name=" + name + ", price=" + price + ", quantity="
                + quantity + "]";
    }    
}

创建工具类：
public class JsonTools {
    public JsonTools() {

    }
    public static String createJsonString(String key, Object value) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(key, value);
        return jsonObject.toString();

    }
}

创建服务类：
public class JsonService {

    public JsonService() {

    }

    public Product getProduct() {
        Product product = new Product("Pen", 20.00, 100);
        return product;
    }

    public List<Product> getListProduct() {

        List<Product> list = new ArrayList<Product>();
        Product product1 = new Product("Pen", 20.00, 100);
        Product product2 = new Product("Pencil", 30.00, 200);
        Product product3 = new Product("Computer", 50.00, 300);
        Product product4 = new Product("Phone", 1000.00, 400);
        
        list.add(product1);
        list.add(product2);
        list.add(product3);
        list.add(product4);
        return list;
    }

    public List<String> getListString() {
        List<String> list = new ArrayList<String>();
        list.add("上海");
        list.add("深圳");
        list.add("南京");
        return list;
    }

    public List<Map<String, Object>> getListMap() {

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> map1 = new HashMap<String, Object>();
        Map<String, Object> map2 = new HashMap<String, Object>();
        map1.put("id", 1001);
        map1.put("name", "Jack");
        map1.put("address", "南京");
        map2.put("id", 1002);
        map2.put("name", "Alex");
        map2.put("address", "北京");

        list.add(map1);
        list.add(map2);
        return list;
    }
}

创建servlet类：
public class JsonAction extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private JsonService jsonService;

    public JsonAction() {
        super();
    }

    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);

    }

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        String jsonString = "";
        String action_flag = request.getParameter("action_flag");
        if (action_flag.equals("product")) {

            jsonString = JsonTools.createJsonString("product",
                    jsonService.getProduct());
        }else if (action_flag.equals("products")) {
            jsonString = JsonTools.createJsonString("products",
                    jsonService.getListProduct());
        }else if (action_flag.equals("liststring")) {
            jsonString = JsonTools.createJsonString("liststring",
                    jsonService.getListString());
        }else if (action_flag.equals("listmap")) {
            jsonString = JsonTools.createJsonString("listmap",
                    jsonService.getListMap());
        }

        out.print(jsonString);
        out.flush();
        out.close();

    }

    @Override
    public void init() throws ServletException {
        // TODO Auto-generated method stub
        super.init();
        jsonService = new JsonService();
    }
}
{% endhighlight %}


###在解析json数据之前我们需要在android客户端代码做一下几件事情：

创建对象类，跟上面一样，这里就不再赘述了。  

创建HttpUtils类：  

{% highlight java %}
public class HttpUtils {
    public HttpUtils() {

    }

    public static String getJsonContent(String path) {
        try {
            URL url = new URL(path);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(3000);
            connection.setRequestMethod("GET");
            connection.setDoInput(true);
            int code = connection.getResponseCode();
            if (code == 200) {
                return  changeInputStream(connection.getInputStream());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    private static String changeInputStream(InputStream inputStream) {
        String jsonString = "";
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        int len =0 ;
        byte [] data = new byte[1024];
        try {
            while ((len = inputStream.read(data))!=-1){
                byteArrayOutputStream.write(data,0,len);
            }
            jsonString = new String(byteArrayOutputStream.toByteArray());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
{% endhighlight %}

###得到的几种以及解析方式：
1.第一种方式的输出json格式，可从服务类的第一个getProduct方法看出：

```{"product":{"quantity":100,"price":20,"name":"Pen"}}```

解析代码：
  
{% highlight java %}
public static Product getProduct(String key , String jsonString)
{
        Product product = new Product();

        try {
            //得到整个Json数据
            JSONObject jsonObject = new JSONObject(jsonString);
            //通过健值得到里面的数据
            JSONObject productObject = jsonObject.getJSONObject("product");
            //解析分别得到数据
            product.setName(productObject.getString("name"));
            product.setPrice(productObject.getDouble("price"));
            product.setQuantity(productObject.getInt("quantity"));

        }catch (Exception e){

        }
        return null;
    }
{% endhighlight %}

2.第二种方式的输出json格式，可从服务类的getListProduct方法看出：

```{"products":[{"quantity":100,"price":20,"name":"Pen"},{"quantity":200,"price":30,"name":"Pencil"},{"quantity":300,"price":50,"name":"Computer"},{"quantity":400,"price":1000,"name":"Phone"}]}```

解析代码：
  
{% highlight java %}
public static List<Product> getListProduct(String key, String jsonString) {
        List<Product> list = new ArrayList<Product>();
        try {
            JSONObject jsonObject = new JSONObject(jsonString);
            //返回json的数组
            JSONArray jsonArray = jsonObject.getJSONArray(key);
            for (int i = 1; i < jsonArray.length(); i++) {
                JSONObject jsonObject1 = jsonArray.getJSONObject(i);
                Product product = new Product();
                product.setName(jsonObject1.getString("name"));
                product.setPrice(jsonObject1.getDouble("price"));
                product.setQuantity(jsonObject1.getInt("quantity"));
                list.add(product);
            }

        } catch (Exception e) {

        }
        return list;
    }
{% endhighlight %}

3.第三种方式的输出json格式，可从服务类的getListString方法看出：

```{"liststring":["上海","深圳","南京"]}```

解析代码：
  
{% highlight java %}
public static List<String> getListString(String key, String jsonString) {
        List<String> list = new ArrayList<String>();
        try {
            JSONObject jsonObject = new JSONObject(jsonString);
            //返回json的数组
            JSONArray jsonArray = jsonObject.getJSONArray(key);
            for (int i = 1; i < jsonArray.length(); i++) {
                String msg = jsonArray.getString(i);
                list.add(msg);
            }
        } catch (Exception e) {

        }
        return null;
    }
{% endhighlight %}

4.第四种方式的输出json格式，可从服务类的getListMap方法看出：

```{"listmap":[{"address":"南京","name":"Jack","id":1001},{"address":"北京","name":"Alex","id":1002}]}```

解析代码：
  
{% highlight java %}
public  static List<Map<String,Object>> getListMap(String key, String jsonString){
        List<Map<String,Object>> list = new ArrayList<Map<String, Object>>();
        try {
            JSONObject jsonObject = new JSONObject(jsonString);
            //返回json的数组
            JSONArray jsonArray = jsonObject.getJSONArray(key);
            for (int i = 1; i < jsonArray.length(); i++) {
                JSONObject jsonObject1 = jsonArray.getJSONObject(i);
                Map<String,Object> map = new HashMap<String, Object>();
                Iterator<String> iterator = jsonObject1.keys();
                while (iterator.hasNext()){
                    String json_key = iterator.next();
                    Object json_value = jsonObject1.get(json_key);
                    if (json_value==null){
                        json_value = "";
                    }
                    map.put(json_key,json_value);
                }
                list.add(map);
            }
        }catch (Exception e){

        }
        return list;
    }
{% endhighlight %}

 感谢林洪同学对错字的校验！！！  

###源码下载链接:
[https://github.com/itxuye/JsonProject](https://github.com/itxuye/JsonProject)

[https://github.com/itxuye/AndroidJson](https://github.com/itxuye/AndroidJson)  


本文永久链接[http://www.itxuye.com/Android-Json.html](http://www.itxuye.com/Android-Json.html),可随意copy文中代码，转载请注明出处！