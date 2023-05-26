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