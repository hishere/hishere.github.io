### 导包

20230801方案

https://unpkg.zhimg.com/vue@3.3.4/打开目录

```html
<script src="https://unpkg.zhimg.com/vue/dist/vue.global.prod.js"></script>
<script src="https://unpkg.zhimg.com/axios/dist/axios.min.js"></script>
```

20250617方案


```html
<script src="https://s4.zstatic.net/ajax/libs/axios/1.9.0/axios.min.js" integrity="sha512-FPlUpimug7gt7Hn7swE8N2pHw/+oQMq/+R/hH/2hZ43VOQ+Kjh25rQzuLyPz7aUWKlRpI7wXbY6+U3oFPGjPOA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
<script src="https://s4.zstatic.net/ajax/libs/vue/3.5.13/vue.global.prod.min.js" integrity="sha512-66fV4MXSQdGN0KQxZ0Bw627HalhTQYQbOoF24EtMXN2FaAoKMgAZ7nDi77d9xWwrRjEEUfE+7rxjTt+cA2IuJA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

```txt
// 服务端渲染。 通过 `require()` 在 Node.js 服务器端渲染使用。
vue.cjs.js
vue.cjs.prod.js

// 使用构建工具，如 `webpack`，`rollup` 和 `parcel` 等打包出来的工程项目
vue.esm-bundler.js
vue.runtime.esm-bundler.js

// 通过浏览器中的 `<script src="...">` 直接使用，暴露全局Vue
vue.global.js
vue.global.prod.js
vue.runtime.global.js
vue.runtime.global.prod.js

// 在浏览器中通过 `<script type="module">` 来使用（浏览器原生 ES 模块导入使用）
vue.esm-browser.js
vue.esm-browser.prod.js
vue.runtime.esm-browser.js
vue.runtime.esm-browser.prod.js
```



### Vue2模板

```HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <title>我是标题</title>
  <link rel="shortcut icon" href="favicon.ico"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.14/vue.min.js" integrity="sha512-BAMfk70VjqBkBIyo9UTRLl3TBJ3M0c6uyy2VMUrq370bWs7kchLNN9j1WiJQus9JAJVqcriIUX859JOm12LWtw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body>
    <div id="app">
        <div>{{msg}}</div>
        <input type="button" :value="btnValue" @click="doIt()">
    </div>
    <script>
        //Vue2大小100KB
        //Vue3大小160KB
        const app =new Vue({
            el: "#app",
            data: {
                    msg: "hello",
                    btnValue: "点击我"
            },
            methods: {
                doIt(){
                    console.log(app);
                    console.log(this.msg);
                    console.log(app.msg);
                    console.log(this.$data.msg);
                }
            }
        });
    </script>
</body>
</html>
```
### Vue3模板

```HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>我是标题</title>
    <link rel="shortcut icon" href="favicon.ico"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.global.min.js" integrity="sha512-DJ2+sosWB5FnZAIeCWAHu2gxQ7Gi438oOZLcBQSOrW8gD0s7LIXDv/5RW76B3FcljF40BXnfqNIo6Dhp7dFHJg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body>
<div id="app">
    <div>{{msg}}</div>
    <input type="button" :value="btnValue" @click="doIt()">
</div>
<script>
    //Vue2大小100KB
    //Vue3大小160KB
    const app = Vue.createApp({
        data() {
            return {
                msg: "hello",
                btnValue: "点击我"
            }
        },
        methods: {
            doIt(){
                console.log(vm);
                console.log(vm.msg);
                console.log(vm.$data.msg);
                console.log(vm.$);
            }
        }
    });
    const vm = app.mount("#app");//ViewModel
</script>
</body>
</html>
```

#### 避免闪烁

使用v-text可以避免闪烁问题,而不是用花括号
```HTML
<div id="app">
    <p v-text="msg"></p>
</div>
```

#### 解析html

```html
<p v-html="msg"></p>
```
```html
msg: "<h2>hello</h2>"
```

#### 事件传值
```HTML
<div id="app">
    <button v-on:click="aaa($event,msg)" data-abc="666">按钮</button>
</div>
<script>
    const app = {
        data() {
            return {msg: "123"}
        },
        methods: {
            aaa(ev, m) {
                console.log(ev.target.dataset.abc);
                console.log(m);
            }
        }
    };
    Vue.createApp(app).mount("#app");
</script>
```

#### V-Model与持久化
```HTML
<div id="app">
    名字: <input type="text" v-model="mData.name"><br>
    城市: <select v-model="mData.address">
        <option value="" disabled>请选择</option>
        <option value="gz">广州</option>
        <option value="fs">佛山</option>
    </select><br>
    男: <input type="radio" value="1" v-model="mData.sex">
    女: <input type="radio" value="2" v-model="mData.sex"><br>
    java: <input type="checkbox" value="j" v-model.lazy="mData.cb">
    python: <input type="checkbox" value="p" v-model.lazy="mData.cb">


</div>
<script>
    const app = Vue.createApp({
        data() {
            return {
                mData: {
                    name: "张三",
                    address: "gz",
                    sex: 1,
                    cb: ["j"]
                }
            }
        },
        methods: {
            beforeUnload() {
                localStorage.setItem("mData", JSON.stringify(this.$data.mData));
            }
        },
        beforeMount() {
            window.addEventListener('beforeunload', e => this.beforeUnload(e));
            const mData = JSON.parse(localStorage.getItem("mData"));
            if (mData!==null)this.$data.mData = JSON.parse(localStorage.getItem("mData"));
        },
        destroyed() {
            window.removeEventListener('beforeunload', e => this.beforeUnload(e))
        }
    });
    const vm = app.mount("#app");
</script>
```
##### v-model修饰符
v-model.lazy 光标离开再赋值
v-model.trim 过滤空格
v-model.number 文本转数字
#### 跑马灯效果
```HTML
<div id="app">
    <p v-text="msg" @click="changeStatus(flag)"></p>
</div>
<script>
    const app = {
        data() {
            return {msg: "hello world! ", interval: null, flag: false}
        },
        mounted() {
            this.interval = setInterval(() => {
                var begin = this.msg.substring(0, 1);
                var end = this.msg.substring(1);
                this.msg = end + begin;
            }, 400);
        },
        methods: {
            changeStatus() {
                if (!this.flag) {
                    clearInterval(this.interval);
                    this.flag = !this.flag;
                } else {
                    this.interval = setInterval(() => {
                        const begin = this.msg.substring(0, 1);
                        const end = this.msg.substring(1);
                        this.msg = end + begin;
                    }, 400);
                    this.flag = !this.flag;
                }
            }
        }
    };
    Vue.createApp(app).mount("#app");
</script>
```
#### 避免在v-for中使用v-if
使用函数过滤数据后,再进行for循环
```HTML
<div id="app">
    <div v-for="(i,index) in mLimit(10)">
        <li :class="{'red': index%2===0}" v-text="i"></li>
    </div>
</div>
<script>
    const app = {
        data() {
            return {
                mList: [1,2,5,22,32,3,41,21,34,4,52,61,44],
            }
        },
        methods:{
            mLimit(num){
                return this.mList.filter(item=>item>num);
            }
        }

    };
    Vue.createApp(app).mount("#app");
</script>
```
#### 阻止冒泡

```html
<div id="app">
    <div @click="maopao">
        <button @click.stop="hello">hello</button>
    </div>
</div>
<script>
    var app = new Vue({
        el: "#app",
        methods: {
            hello() {
                console.log("hello")
            },
            maopao() {
                console.log("冒泡")
            }

        }
    })
</script>
```

#### 阻止默认行为

```html
<a href="http://www.baidu.com" @click.prevent="hello">baidu</a>
```

#### 只有自己触发

```html
<div @click.self="maopao">
   <button @click="hello">hello</button>
</div>
```

#### 触发一次

@click.once

### Yox

#### 开始

yox,ptitevue都是轻量几十k,但是vue多占据的内存100多k,只能忍下
