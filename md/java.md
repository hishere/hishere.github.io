# 开始
欢迎，敲代码最方便的当然是电脑的idea，Eclipse相关的开发工具，没条件只能在手机上自嗨了
## 安装
以termux为案例，这里安装运行的环境，
```shell
# 选择一个版本安装
pkg install openjdk-17
pkg install openjdk-21
pkg install openjdk-25
# 安装完查看版本信息
java -version

```


## hello
创建文件HelloWorld.java，类名要求和文件同名，否则javac编译时会报错
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
运行java文件
```shell
java HelloWorld.java
```
运行class文件，此时是不需要java文件的，并且速度上更快，因为是编译过的字节码
```shell
java HelloWorld
```

## jar包
多个class明显是需要打成一个包，这样才适合传输到任何地方运行
```shell
# 编译到目录
javac -d out HelloWorld.java
# 目录打包成jar
jar cf myapp.jar -C out .
# 打包成jar和指定主类
jar cfe myapp2.jar HelloWorld -C out .
# 指定主类才能运行
java -jar myapp2.jar
```

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
class a{}
```

# 后记
我很怀念，学习java的这段时光，虽然，没有从事这方面的工作，
这种思维是值得学习的，
封装，一些属性是可以访问的，一些是私有的，都封装成一个整体。
继承，避免重复的编写，从模板上继承已有的属性。
多态，传入不同的对象，调用的方法，呈现不同的形态
抽象，向上抽取，你对接一大堆人，而我只跟你对接即可，简化我的逻辑