### HTML模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>我是标题</title>
    <link rel="shortcut icon" href="../favicon.ico"/>
</head>
<body>

</body>
</html>
```
### Ajax请求
```HTML
//在HTML中自带有xhr,而在node中没有,要引入
//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function ajax(options) {
    options = options || {};
    const xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.error && options.error(status);
            }
        }
    };
    return xhr;
}

const req = ajax({
    url: "http://127.0.0.1/aaa?name=tom",
    type: "post",
    success(res) {
        console.log(res);
    }
});
const data = {age: 18};
// req.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
// req.send(new URLSearchParams(data).toString());

req.setRequestHeader("Content-Type","application/json")
req.send(JSON.stringify(data));

//axios.post(请求URL,请求体,请求配置{params,headers}).then(res=>{});
//一般的get和delete不需要请求体
```
