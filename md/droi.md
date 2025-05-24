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
## 设置Activity为默认

```xml
<activity
    android:name=".MainActivity"
    android:exported="true" >
    <intent-filter>
	<action android:name="android.intent.action.MAIN" />
	<category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
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

# Compose

## 对齐

采用kotlin开发

@Preview(showBackground = true)为预览
@Composable 为组件

```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {

    Column {
        Top()
        Down()
        Foot()
    }
}
```

对齐: 水平对齐和垂直对齐

```kotlin
Column(
    modifier = Modifier
        .fillMaxHeight()
        .fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
)
```
如下fillMaxWidth(0.5f)占据宽度一半,另一半则直接fillMaxWidth()可分配另一半,如果是fillMaxWidth(0.5f)则为分配剩下一半的一半,即宽度得到是1/4
```kotlin
modifier = Modifier
            .fillMaxHeight()
            .fillMaxWidth(0.5f),
```

## 事件

```kotlin
Button(onClick = {
    setBt("level 9")
}) {
    Text(text = "按钮")
}
```

## 组件

Column

Row

Text

Button

Image

等等

## 未完待续的跨应用存储
不管是用sp存储还是ContentProvider似乎都难以实现跨应用配置保存，在Xposed中这很重要。
问题在于跨应用的非本模块获取cursor为空
也许只有用http将配置保存到网上再读这种方法了吗？如果未来还有兴趣，我将完善。

hook代码
```java
package app.nooneb.getsb2;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodReplacement;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage.LoadPackageParam;

public class HookInit implements IXposedHookLoadPackage {

	@Override
	public void handleLoadPackage(LoadPackageParam lpparam) throws Throwable {
		if (BuildConfig.APPLICATION_ID.equals(lpparam.packageName)) {
			XposedHelpers.findAndHookMethod(
				MainActivity.class.getName(),
				lpparam.classLoader,
				"isModuleActivated",
				XC_MethodReplacement.returnConstant(true));

            final Uri queryUri = Uri.withAppendedPath(
                Uri.parse("content://app.nooneb.getsb2.provider/settings"),
                "id3" // 要查询的键名
            );

            // 延迟查询确保数据已写入
            
		}
        if(lpparam.packageName.equals("app.nooneb.batterysetter")){
            XposedBridge.log("电池。。。。");
            final ClassLoader cll=lpparam.classLoader;
            new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        try {



                            // 获取当前应用的Context
                           // Context context = (Context) XposedHelpers.callStaticMethod(
                            //    Class.forName("android.app.ActivityThread"),
                            //    "currentApplication"
                            //);
                            
                            // 使用应用的ClassLoader获取Context
                            Class<?> activityThreadClass = Class.forName("android.app.ActivityThread", false, cll);
                            Object activityThread = XposedHelpers.callStaticMethod(activityThreadClass, "currentActivityThread");
                            Context context = (Context) XposedHelpers.callMethod(activityThread, "getApplication");
                            Context targetContext = context.createPackageContext("app.nooneb.getsb2", Context.CONTEXT_IGNORE_SECURITY);
                            
                            
                            XposedBridge.log("contextTar:"+targetContext);
                          

                            Cursor cursor = targetContext.getContentResolver().query(Uri.parse("content://app.nooneb.getsb2.provider2/users"), null, null, null, null);

                            // iteration of the cursor
                            // to print whole table

                            if(cursor.moveToFirst()) {
                                StringBuilder strBuild=new StringBuilder();
                                while (!cursor.isAfterLast()) {
                                    strBuild.append("\n"+cursor.getString(cursor.getColumnIndex("id"))+ "-"+ cursor.getString(cursor.getColumnIndex("name")));
                                    cursor.moveToNext();
                                }
                                XposedBridge.log("读取到:"+strBuild.toString());
                            }
                            else {
                                XposedBridge.log("No Records Found");
                            }

                        } catch (Exception e) {
                            XposedBridge.log(e);
                        }
                    }
                }, 2000);    
        }
        

	}

}
```

mainactivity
```java
package app.nooneb.getsb2;

import android.app.ActionBar;
import android.app.Activity;
import android.content.ContentValues;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.database.Cursor;
import android.net.Uri;

public class MainActivity extends Activity {
 	private EditText editText3;
    private TextView tvShow;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ActionBar actionBar = getActionBar();
        if (actionBar != null) {
            actionBar.setSubtitle(isModuleActivated() ? R.string.xposed_activated : R.string.xposed_unactivated);
        }
		
		editText3 = findViewById(R.id.editText3);
        tvShow=findViewById(R.id.tvShow);
		SharedPreferences prefs = getSharedPreferences("settings", MODE_PRIVATE);
		editText3.setText(prefs.getString("id3", "接单2131298297"));
		//findViewById(R.id.saveButton).setOnClickListener(v -> saveSettings());
		
        
        
		findViewById(R.id.saveButton).setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View v) {
//					ContentValues values = new ContentValues();
//                    values.put("key", "id3");
//                    values.put("value", editText3.getText().toString());
//
//                    // 插入/更新数据到ContentProvider
//                    getContentResolver().insert(
//                        SettingsProvider.CONTENT_URI,
//                        values
//                    );
                    // class to add values in the database
                    ContentValues values = new ContentValues();

                    // fetching text from user
                    values.put(MyContentProvider.name, editText3.getText().toString());

                    // inserting into database through content URI
                    getContentResolver().insert(MyContentProvider.CONTENT_URI, values);

                    // displaying a toast message
                    Toast.makeText(getBaseContext(), "数据插入成功！", Toast.LENGTH_LONG).show();
				}
			});
		findViewById(R.id.showButton).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                // content URI
                Cursor cursor = getContentResolver().query(Uri.parse("content://app.nooneb.getsb2.provider2/users"), null, null, null, null);

                // iteration of the cursor
                // to print whole table
                if(cursor.moveToFirst()) {
                    StringBuilder strBuild=new StringBuilder();
                    while (!cursor.isAfterLast()) {
                        strBuild.append("\n"+cursor.getString(cursor.getColumnIndex("id"))+ "-"+ cursor.getString(cursor.getColumnIndex("name")));
                        cursor.moveToNext();
                    }
                    tvShow.setText(strBuild);
                }
                else {
                    tvShow.setText("No Records Found");
                }
                
            
            }
  
        });
    }

    public static boolean isModuleActivated() {
        return false;
    }
	
}
```

ContentProvider
```java
package app.nooneb.getsb2;

import android.content.ContentProvider;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteQueryBuilder;
import android.net.Uri;
import java.util.HashMap;

public class MyContentProvider extends ContentProvider {
    public MyContentProvider() {
    }

    // defining authority so that other application can access it
    static final String PROVIDER_NAME = "app.nooneb.getsb2.provider2";

    // defining content URI
    static final String URL = "content://" + PROVIDER_NAME + "/users";

    // parsing the content URI
    static final Uri CONTENT_URI = Uri.parse(URL);

    static final String id = "id";
    static final String name = "name";
    static final int uriCode = 1;
    static final UriMatcher uriMatcher;
    private static HashMap<String, String> values;

    static {

        // to match the content URI
        // every time user access table under content provider
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);

        // to access whole table
        uriMatcher.addURI(PROVIDER_NAME, "users", uriCode);

        // to access a particular row
        // of the table
        uriMatcher.addURI(PROVIDER_NAME, "users/*", uriCode);
    }
    @Override
    public String getType(Uri uri) {
        switch (uriMatcher.match(uri)) {
            case uriCode:
                return "vnd.android.cursor.dir/users";
            default:
                throw new IllegalArgumentException("Unsupported URI: " + uri);
        }
    }
    // creating the database
    @Override
    public boolean onCreate() {
        Context context = getContext();
        DatabaseHelper dbHelper = new DatabaseHelper(context);
        db = dbHelper.getWritableDatabase();
        if (db != null) {
            return true;
        }
        return false;
    }
    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        SQLiteQueryBuilder qb = new SQLiteQueryBuilder();
        qb.setTables(TABLE_NAME);
        switch (uriMatcher.match(uri)) {
            case uriCode:
                qb.setProjectionMap(values);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri);
        }
        if (sortOrder == null || sortOrder == "") {
            sortOrder = id;
        }
        Cursor c = qb.query(db, projection, selection, selectionArgs, null,
                            null, sortOrder);
        c.setNotificationUri(getContext().getContentResolver(), uri);
        return c;
    }

    // adding data to the database
    @Override    
    public Uri insert(Uri uri, ContentValues values) {
        long rowID = db.insert(TABLE_NAME, "", values);
        if (rowID > 0) {
            Uri _uri = ContentUris.withAppendedId(CONTENT_URI, rowID);
            getContext().getContentResolver().notifyChange(_uri, null);
            return _uri;
        }
        throw new SQLiteException("Failed to add a record into " + uri);
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
                      String[] selectionArgs) {
        int count = 0;
        switch (uriMatcher.match(uri)) {
            case uriCode:
                count = db.update(TABLE_NAME, values, selection, selectionArgs);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri);
        }
        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        int count = 0;
        switch (uriMatcher.match(uri)) {
            case uriCode:
                count = db.delete(TABLE_NAME, selection, selectionArgs);
                break;
            default:
                throw new IllegalArgumentException("Unknown URI " + uri);
        }
        getContext().getContentResolver().notifyChange(uri, null);
        return count;
    }

    // creating object of database
    // to perform query
    private SQLiteDatabase db;

    // declaring name of the database
    static final String DATABASE_NAME = "UserDB";

    // declaring table name of the database
    static final String TABLE_NAME = "Users";

    // declaring version of the database
    static final int DATABASE_VERSION = 1;

    // sql query to create the table
    static final String CREATE_DB_TABLE = " CREATE TABLE " + TABLE_NAME
    + " (id INTEGER PRIMARY KEY AUTOINCREMENT, "
    + " name TEXT NOT NULL);";

    // creating a database
    private static class DatabaseHelper extends SQLiteOpenHelper {

        // defining a constructor
        DatabaseHelper(Context context) {
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        // creating a table in the database
        @Override
        public void onCreate(SQLiteDatabase db) {

            db.execSQL(CREATE_DB_TABLE);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

            // sql query to drop a table
            // having similar name
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
            onCreate(db);
        }
    }
}
```
manifest
```xml
<?xml version='1.0' encoding='utf-8'?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="app.nooneb.getsb2">
    <queries>
        <package android:name="app.nooneb.getsb2"/>
    </queries>
    <application
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        android:resizeableActivity="true">

        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
	
		<meta-data
			android:name="xposedmodule"
			android:value="true" />
		
		<meta-data
			android:name="xposeddescription"
			android:value="Xposed module demo" />
		
		<meta-data
			android:name="xposedminversion"
			android:value="89" />
		
		<meta-data
            android:name="xposedscope"
            android:resource="@array/xposed_scope" />
		
        <meta-data
          android:name="android.max_aspect"
          android:value="4.0"/>

        
        <provider
                
                android:name=".SettingsProvider"
                android:authorities="app.nooneb.getsb2.provider"
                android:exported="true" /> <!-- 允许跨进程访问 -->
                
        <provider 
            android:name=".MyContentProvider"
            android:authorities="app.nooneb.getsb2.provider2"
            android:exported="true"/>
        
        
    </application>
    <uses-permission android:name="android.permission.READ_USER_DICTIONARY"/>
    <uses-permission android:name="android.permission.WRITE_USER_DICTIONARY"/>
    
</manifest>
```

# 关于smali的那些事

我做了什么？

我想对一个arraylist进行Collator的Locale.CHINA排序操作，然后加了一个匿名内部类MainActivity$100000004
然后我在MainActivity定义一个sortList去调用内部类04，

``` java
.method public static sortList(Ljava/util/List;)V
    .registers 4
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/util/List<",
            "Ljava/util/Map<",
            "Ljava/lang/String;",
            "Ljava/lang/String;",
            ">;>;)V"
        }
    .end annotation

    .prologue
    new-instance v0, Lcn/kaicity/apps/wifikeylook/MainActivity$100000004;

    invoke-direct {v0}, Lcn/kaicity/apps/wifikeylook/MainActivity$100000004;-><init>()V

    invoke-static {p0, v0}, Ljava/util/Collections;->sort(Ljava/util/List;Ljava/util/Comparator;)V

    return-void
.end method
```
然后在list被渲染到adapter之前，只需要调用sortList即可
``` java
invoke-static {v3}, Lcn/kaicity/apps/wifikeylook/MainActivity;->sortList(Ljava/util/List;)V
```
按葫芦画瓢，04加入到member class

```
# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcn/kaicity/apps/wifikeylook/MainActivity$100000000;,
        Lcn/kaicity/apps/wifikeylook/MainActivity$100000001;,
        Lcn/kaicity/apps/wifikeylook/MainActivity$100000002;,
        Lcn/kaicity/apps/wifikeylook/MainActivity$100000003;,
        Lcn/kaicity/apps/wifikeylook/MainActivity$100000004;
    }
.end annotation
```

一切都是如此完美。并且借助于ai工具，我们不再执着smali语法。而专注自己的逻辑，期间apktool_m是个更好的工具，可以反编译工程为smali再转成java查看。对，仅仅只是查看java代码，别想把smali转成java再转回smali，行不通的。转成java只是用于研究smali是否改得正确而已。tip:在修改dex前备份出来，如果改失败了就覆盖回去，能够运行起来就可以覆盖备份，不断改进smali，直到完成我们所需要的增加删除修改smali代码目标，编译后的apk正常运行，期间操作dex是mt管理器。