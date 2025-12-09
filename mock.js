let mockBaseUrl="https://mock.nodjoy.com";
let mockProjectId="69373cd1d674ea00189e6e9b";//项目的id，下面是子接口id
let oneb0_id="6938408bd674ea00189e6ea1";
let oneb1_id="6938408bd674ea00189e6ea2";
let mykey_id="6938408bd674ea00189e6ea3";
let history_id="69384069d674ea00189e6ea4";
let noby_id="6938408bd674ea00189e6ea5";


function gToken(){
    fetch(mockBaseUrl+"/api/u/login", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            //"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDhiMGE2ZmEyOTQwMTQ3ODQzNzNmOSIsImlhdCI6MTcxNjAzOTg0NiwiZXhwIjoxNzE3MjQ5NDQ2fQ.QTh9yilYpgssRjsSPEEyUF0LvNJ7NAJss-4giP-EMXQ",
           // "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzczYzk3ZDY3NGVhMDAxODllNmU5MiIsImlhdCI6MTc2NTIyNzY3MiwiZXhwIjoxNzY2NDM3MjcyfQ.-LCcSQFwHl29A8i3rd4YqfhkhJoImCQdP0pvcolrsFA",
            "content-type": "application/json;charset=UTF-8",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": mockBaseUrl+"/login",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"name\":\"BuFeiYan\",\"password\":\"BuFeiYan\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(res=>res.json()).then(res=>{
        let mockAuth=res.data.token
        localStorage.setItem("mockTok",mockAuth);
        
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
    exports.mockBaseUrl= mockBaseUrl;
    exports.mockProjectId= mockProjectId;
    exports.oneb0_id= oneb0_id;
    exports.oneb1_id= oneb1_id;
    exports.mykey_id= mykey_id;
    exports.history_id= history_id;
    exports.noby_id= noby_id;
}