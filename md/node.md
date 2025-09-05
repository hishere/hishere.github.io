### 在node中使用canvas
```javascript
const Canvas = require("canvas");
const imgBase64 = "data:image/jpeg;base64,/9j/4AAQ......"
//给base64图片添加文本
function textForImg(text) {
    const img = new Canvas.Image;
    img.src = imgBase64;
    const cv = new Canvas.createCanvas(img.width, img.height);
    const ctx = cv.getContext("2d");

    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.font = "20px Sans";
    ctx.fillStyle = "#fff";
    ctx.fillText(text, 20, 1000);
    ctx.font = "15px Sans";
    const d = new Date();
    ctx.fillText(d.getHours()+":"+d.getMinutes(), 20, 40);
    return cv.toDataURL();
}

//base64转图片存储到本地
// url=textForImg("bn就发生了记录是否合适就");
// const fs = require('fs');
// const path = 'aa.png';
// const base64 = url.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
// const dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
// fs.writeFile(path, dataBuffer, function(err){//用fs写入文件
//     if(err){
//         console.log(err);
//     }else{
//         console.log('写入成功！');
//     }
// })
```

### express框架案例

```javascript
const exp=require("express");
const bodyParser = require("body-parser");
const app=exp();

// 跨域设置
// app.all("*", function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Origin", req.get("Origin")); // 添加这一行代码，代理配置不成功
//     res.setHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, DELETE, PUT');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since")
//     next();
// })

app.listen(8080,()=>{
    console.log("run at http://127.0.0.1");
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.post("/aaa",function (req,resp){
    console.log(req.query);
    console.log(req.body);
    console.log(req.headers);
    resp.send("123");
});
app.get("/",(req,resp)=>{
    console.log(req.socket.remoteAddress);
    resp.send("gegjej");
});
```

### chromedriver的使用案例

```javascript
// 下载chromedriver保证和chrome版本一致
// https://googlechromelabs.github.io/chrome-for-testing/
// https://chromedriver.storage.googleapis.com/index.html

//桌面图标的目标
//"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9527 --user-data-dir="D://chroData"

(async()=>{
    let unArr = [1234,1235,1236,1237];
    const webdriver = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const until = webdriver.until;
    const chromeOptions = new chrome.Options();
    chromeOptions.debuggerAddress("127.0.0.1:9527");
    const driver = await new webdriver.Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();


    let start = 0, end = 3;

    function waitMinutes2() {
        return new Promise(function (resolve, reject) { //做一些异步操作
            setTimeout(() => {
                 console.log('等3秒');
                 resolve("等完了");
             }, 2800);
         });
    }
    for (let i=start;i<=end;i++){
        const un = unArr[i];
        console.log(i+"当前: "+un);
        await waitMinutes2();
        const script = "localStorage.setItem('un'," + un + ");";
        const script2 = "localStorage.setItem('token'," + (i+i) + ");";
        await driver.executeScript(script+script2);
        await driver.navigate().refresh();
        await waitMinutes2();
    }
})()

//配合chrome插件User-Agent Switcher and Manager不用每次换agent
//微信的标识
//Mozilla/5.0 (Linux; Android 12; 22041216C Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4434 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/992 MicroMessenger/8.0.32.2300(0x28002034) WeChat/arm32 Weixin NetType/WIFI Language/zh_CN ABI/arm64
```

### Whistle

#### 安装

```shell
npm install -g whistle
```

允许脚本运行

```shell
set-ExecutionPolicy RemoteSigned

whisle -V 
whistle help
```

#### 启动

whistle支持三种等价的命令whistle、w2、wproxy,默认8899端口

```shell
w2 start
w2 start -p 8888
```

控制台

如果无法访问,是防火墙问题

```shell
http://local.whistlejs.com/
http://127.0.0.1:8899
```

#### 安装证书

为了HTTPS能抓到

win: 控制台->https->download RootCA->下载安装->本地计算机->

所有放入下列存储->受信任颁发机构->完成

手机上到设置安装即可

#### 代理到whistle

win: 设置->网络->使用代理->127.0.0.1端口8899

手机: wlan设置代理
