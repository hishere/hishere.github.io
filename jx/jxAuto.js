const tel = require("../tel");
let unArr = tel.unArr;
const axios = require("axios");
// const {createCanvas } = require('@napi-rs/canvas');
const Canvas = require("canvas");

const imgBase64 ="data:image/jpeg;base64,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";


function textForImg(text,author) {
    const img = new Canvas.Image;
    img.src = imgBase64;
    const cv = new Canvas.createCanvas(img.width, img.height);
    const ctx = cv.getContext("2d");

    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.font = "20px Sans";
    ctx.fillStyle = "#fff";

    let t1="";
    let t2="";
    if (text.length>=28){
        t1=text.slice(0,28);
        t2=text.slice(28);
    }else {
        t1=text;
    }
    ctx.fillText(t1, 20, 980);
    ctx.fillText(t2, 20, 1010);

    //擦除作者
    // ctx.fillStyle = "#000";
    // ctx.fillText("▇▇▇▇▇▇▇▇", 60, 1100-14);
    //写入作者
    ctx.fillStyle = "#fff";
    ctx.fillText(author, 60, 1100-14);


    ctx.font = "15px Sans";
    const d = new Date();
    const hTime=d.getHours()>9?d.getHours():'0'+d.getHours();
    const mTime=d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes();
    ctx.fillText(hTime+":"+mTime, 20, 40);

    ctx.fillStyle="#343434"
    ctx.fillText(Math.random().toString(),200,500)

    return cv.toDataURL();
}

const body = {taskType: 1, pageSize: 10};
let mid = 1601180774730694656
// mid=1601612990568857600 //你好,老板
mid=1602299724893913088 //新老板
// mid=1601148603215249408 //jd
// mid=1606885397969895424 //fs
// mid=1647277669714362368 //181号选手
// mid=1635203758491303936 //150号选手
let ua = "5.0 (Linux; Android 13; CSE12 Build/QP1A.199811.020; wv) AppleWebKit/528.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4340.99 XWEB/4375 MMWEBSDK/20220804 Mobile Safari/537.36 MMWEBID/7789 MicroMessenger/8.0.27.2120(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64";
var token = 2;
var now = 0;
var host = "http://mvd1322.laihezuo.cn";

const auList=["搞笑大牛","爱在风景里","金毛轮胎","小金毛nn","柯基蛋黄","拉布拉多呀",
"云享音乐库","丸来丸又去","喝水的鱼鱼啊","空空绿植","每日伴读",
             "解压水果乐园","牛牛聊足球","莉姐家常菜li","怀旧经典88",
			 "电视剧推荐+","家常菜美食","倩倩创意美术","创意美术库","漠阳园林",
			 "齐鲁传统文化交流","解压日记","美味在民间","折纸匠","杜宾凤九"];
let passAu=false;

//3.提交任务
function cT(img, token, ua, un,i,stamp,fileSign) {
    var obj = {
        taskType: 1,
        pageSize: 10,
        imgUrl: img,
        stamp: stamp,
        imgSign: fileSign
    }
    axios.post("http://u.aoaos.cn/duobaoapi/task/commitTask", obj, {
        headers: {
            mid: mid,
            "User-Agent": ua,
            token: token,
            un: un,
            Origin: host,
            Referer: host
        }
    }).then(res => {
        if (res.data.code === 0) {
            console.log(un + " : "+i+"成功✅")
        }
    })
}

//2.上传图片
function up64(img64, token, ua, un,i) {
    const obj = {base64Str: img64};
    axios.post("http://u.aoaos.cn/duobaoapi/task/uploadImgBase64", obj, {
        headers: {
            mid: mid,
            "User-Agent": ua,
            token: token,
            un: un,
            Origin: host,
            Referer: host
        }
    }).then(res => {
        if (res.data.code === 0) {
            const imgUrl = res.data.result.filePath;
            const stamp = res.data.result.stamp;
            const fileSign = res.data.result.fileSign;
            cT(imgUrl, token, ua, un,i,stamp,fileSign);
        }
    });
}

//1.获取任务
var k = 4050+51;
var step=1021;
function gT(ua, token, un, i) {
    axios.post("http://u.aoaos.cn/duobaoapi/task/getTask", body, {
        headers: {
            mid: mid,
            "User-Agent": ua,
            token: token,
            un: un,
            Origin: host,
            Referer: host
        }
    }).then(res => {
        // console.log(res);//code 0 msg null result...
        //code 1001 msg 当前没有任务 result null
        if (res.data.code === 1001) {
            console.log(un + " : " + i + res.data.msg+"❌")
        } else if (res.data.code === 0) {
            k = k + step;
            setTimeout(function () {
                const title = res.data.result.title;
                const author = res.data.result.authorName;
                if (title=="人工处理"||title=="人工"){
                    console.log(i+" : 发生人工处理xxxxxxxxxxxxxx: "+un)
                    return;
                }
				if(auList.indexOf(author)!==-1 && !passAu){
					//存在作者
					console.log(i+": "+author+" : ❌");
					return;
				}
                console.log(un + " : " + i +" : "+author+" : "+ title.substring(0, 40))
                const img64 = textForImg(title,author.substring(0,7));
                up64(img64, token, ua, un,i);
            }, k);
        } else if (res.data.code === 99) {
            console.log(un + " : " + i + res.data.msg);
        }
    })
}


function range(start,end){
    const arr = [];
    for (let i=start; i<=end; i++){
        arr.push(i);
    }
    return arr;
}
//提现,3,9,47,13,7,6

let mRange=range(0,9);
// mRange=range(10,19);
// mRange=range(20,29);
// mRange=range(30,39);
// mRange=range(40,49);
// //
// mRange=range(50,59);
// mRange=range(60,69);
// mRange=range(70,79);
// mRange=range(80,89);
// mRange=range(90,99);
//
// mRange=range(100,109);
// mRange=range(110,119);
// mRange=range(120,129);
// mRange=range(130,139);
// mRange=range(140,149);
//
// mRange=range(150,159);
// mRange=range(160,169);
// mRange=range(170,179);
// mRange=range(180,199);
// mRange=range(200,203);

// mRange=range(3,9);
mRange=[2];

passAu=false;
let j = 0;
for (let i of mRange) {
    j = j + 3150;
    setTimeout(function () {
        console.log("当前: " + i);
        const newUa = ua + i;
        // const newToken = token + i + "" + i;
        const newToken = i+i;
        gT(newUa, newToken, unArr[i], i);
    }, j)
}
