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
