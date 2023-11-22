# 编程的总结

编程就像是制定规则,逆向hook侵入则是修改规则,

总有人不愿意受制于他人的规则.

但最后,技术更多地是用在自己的生活上,有什么需求都可以写个脚本去自动化完成某些任务,写个拦截器去截获修改某些东西.

让别人去做App吧,自己只要会懂会用基本上就差不多了.

# 开发一个空壳App

## 在build.gradle中

1.添加仅中文

2.minifyEnabled,shrinkResources

3.依赖全部注释掉

```groovy
android {
    defaultConfig {
        resConfigs "zh-rCN"
    }
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
        }
    }
}
dependencies {}
```

## 布局文件

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Button" />
</LinearLayout>
```

## Activity

```java
public class HelloActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hello);
        Button btn = findViewById(R.id.btn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(HelloActivity.this,"你好",Toast.LENGTH_LONG).show();
            }
        });
    }
}
```

## 打包

一个空壳结构大小为20kb左右

res	8k

META-INF	2.6k

AndroidManifest.xml	800b

resources.arsc	2k

classes.dex	511b

# 对android.jar的分析

==每个api版本都有jar==

所谓v4,v7包其实也是一个jar

## 部件

**android.view.widget**下

有些是原生自带的如TextView,Button...

# 愿景

## 万能的Adapter

## Apk最小

## 手写而不是引用第三方

# Xposed模块开发

1.一个空项目,Activity可要可不要

2.setting.gradle加入xposed仓库地址

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url "https://api.xposed.info/" }
    }
}
```

3.依赖,以82版本普遍

```groovy
compileOnly 'de.robv.android.xposed:api:82'
```

4.清单文件加入

```xml
<application>
<meta-data
            android:name="xposedmodule"
            android:value="true" />
        <meta-data
            android:name="xposeddescription"
            android:value="洛雪去更新" />
        <meta-data
            android:name="xposedminversion"
            android:value="89" />
        <meta-data
            android:name="xposedscope"
            android:resource="@array/scope" />
</application>
```
scope就是默认勾选的作用域
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="scope">
        <item>cn.toside.music.mobile</item>
    </string-array>
</resources>
```

5.assets文件夹创建文件xposed_init加入内容,告诉xposed的Hook类是什么.
new --> folder --> assets folder创建文件夹

```java
com.xxx.yyy.MyHook
```

6.创建MyHook类,因为上面定义的名字对应,包名对应

```java
public class MyHook implements IXposedHookLoadPackage{
    //实现handleLoadPackage方法...
    if (lpparam.packageName.contains("cn.toside.music")) {
        XposedBridge.log("LX Music Hook成功...");
       // XposedHelpers.findAndHookMethod("com.a.b.Cc",lpparam.classloader,"d",new XC_MethodHook(){
		   //beforeHookedMethod
		   //param.setResult(0);//设置结果将拦截方法不再返回.
	   });
        
        
    }
}
```

## context获取

```java
void setContext() {
        final Class<?> clazz = XposedHelpers.findClass("android.app.Instrumentation", null);
        XposedHelpers.findAndHookMethod(clazz, "callApplicationOnCreate", Application.class
                , new XC_MethodHook() {

                    @Override
                    protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                        super.beforeHookedMethod(param);
                    }

                    @Override
                    protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                        super.afterHookedMethod(param);

                        if (param.args[0] instanceof Application) {
                            context = ((Application) param.args[0]).getApplicationContext();
                        } else {
                            XposedBridge.log("hook callApplicationOnCreate failed");
                            return;
                        }
                        tos("得到context");//Toast.makeText().show();
                    }
                });
    }
```

## 按钮hook

thisObject获取本类

args[0]获取第一个参数

```java
 XposedHelpers.findAndHookMethod(View.class, "setOnClickListener", View.OnClickListener.class, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                View view = (View) param.thisObject;
                String s=null;
                if (view instanceof Button){
                    Button b= (Button) view;
                    String text = b.getText().toString();

                    if (text.equals("按钮")){
                        tos(b.getId());
                    }
                }
            }
        });
```

```java
XposedHelpers.findAndHookMethod(View.class, "setOnClickListener", View.OnClickListener.class, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {

                if (param.thisObject instanceof Button) {

                    //正确方式
                    param.args[0] = new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                           tos(LocalTime.now().toString());
                        }
                    };

                    //不要这样做,setOnClickListener循环调用死机
//                    Button b= (Button) param.thisObject;
//                    b.setOnClickListener(v -> XposedBridge.log("jss888ss"));
                }
            }
        });
```



## View Hook

View下有TextView,ImageView,ViewGroup,ProgressBar

TextView下有Button,EditText

## 文本域Hook

前者是静态,即inflate渲染xml后就会执行的,后者是动态,set后执行

```java
XposedHelpers.findAndHookMethod(TextView.class, "onTextChanged", CharSequence.class, int.class, int.class, int.class, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                String s = param.args[0].toString();
                String arg = param.args[0].toString();
                Object thisObject = param.thisObject;
                TextView to = (TextView) thisObject;
                if (s.equals("这是一段文本")) {
                    to.setText("我是被修改的文本");
                }
            }
        });
```

```java
XposedHelpers.findAndHookMethod(TextView.class, "setText", CharSequence.class, new XC_MethodHook() {
            @Override
            protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                param.args[0]="我是被修改的文本";
            }
        });
```

## 方法Hook

```java
 XposedHelpers.findAndHookMethod("app.nooneb.myapplication.MainActivity", lpparam.classLoader, "fuckMe",
               String.class, String.class, String.class, new XC_MethodHook() {
           @Override
           protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
               Object[] args = param.args;
               args[0]="窗前";
               args[1]="明月";
               args[2]="白光";
           }
       });
```

## 方法

**beforeHookedMethod** 执行前hook,可改参数,返回值(改参数首选)

**afterHookedMethod** 执行后hook,可改返回值(改返回值首选)

replaceHookedMethod 返回值可以直接return,setresult不生效(不知道)

