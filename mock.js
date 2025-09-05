function gToken(){
    fetch("https://mock.presstime.cn/api/u/login", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDhiMGE2ZmEyOTQwMTQ3ODQzNzNmOSIsImlhdCI6MTcxNjAzOTg0NiwiZXhwIjoxNzE3MjQ5NDQ2fQ.QTh9yilYpgssRjsSPEEyUF0LvNJ7NAJss-4giP-EMXQ",
            "content-type": "application/json;charset=UTF-8",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://mock.presstime.cn/login",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"name\":\"BuFeiYan\",\"password\":\"BuFeiYan\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(res=>res.json()).then(res=>{
        localStorage.setItem("mockTok",res.data.token)
    });
}

//获取时间,超过一天就去拿token
if (localStorage.getItem("mockAuth")){
    const mockAuth=localStorage.getItem("mockAuth");
    localStorage.setItem("mockAuth",Date.now().toString());
    if (Date.now()-parseInt(mockAuth)>86400000)gToken();
}else {
    //第一次
    localStorage.setItem("mockAuth",Date.now().toString());
    gToken()
}

let mockAuth="Bearer "+localStorage.getItem("mockTok");

if(typeof(exports) != "undefined"){
    exports.mockAuth= mockAuth;
}