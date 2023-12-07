# Hello

```dart
var name="dart";
var arr=["dart","java","python"];
var obj={
  'name': "张三",
  'age': 18
};
void main(){
  print("hello "+name);
  print("hello "+arr.toString());
  print("hello ${obj['age']!}");
}
```

## Flutter

写ui简直和Compose太相似

```dart
import 'package:flutter/material.dart';
import 'package:helloflutter/SecondPage.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: SecondPage()
    );
  }
}
```

```dart

import 'package:flutter/material.dart';

class SecondPage extends StatefulWidget{
  const SecondPage({super.key});

  @override
  State<SecondPage> createState() {
    return _SecondPageState();
  }

}

class _SecondPageState extends State<SecondPage>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("你好m")
      )
    );
  }
}
```

## 点击事件

```dart
class SecondPage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: GestureDetector(
          child: const Text("klk"),
          onTap: (){
            print("jfso");
          },
        ),
      ),
    );
  }
}
```