
function up(base64){
    var base = base64;
    var params = {}
    var un = getStorage('un');
    var token = getStorage('token');
    var mid = getStorage('mid');
    params.base64Str = base;
    $.ajax({
        url: framework.itf + '/task/uploadImgBase64',
        type: 'post',
        data: JSON.stringify(params),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        // processData: false,
        beforeSend: function (request) {
            request.setRequestHeader("un", un);
            request.setRequestHeader("token", token);
            request.setRequestHeader("mid", mid);
        },
        success: function (data) {
            // console.log(data);
            //成功
            // $("#fs1").val(data.result.filePath)
            $("#fs1Img").html('<img src="' + data.result.filePath + '" alt=""/>');
            imgUrls = data.result.filePath;
            stamps = data.result.stamp;
            imgSigns = data.result.fileSign;
        },
        error: function (err) {
            // alert("上传图片失败！");
            console.log(err);
        }
    })
}
function doit() {
    let ht=document.getElementsByClassName("head-tip")[0];
    let ct=document.getElementsByClassName("con-tip")[0];

    //无法得到价值了...taskIntegral
    ht.innerHTML=localStorage.getItem("un");

    let img = new Image();
    let text = "人工智能";
    let author = "百度";
    const vTitle = document.getElementById("v-title");
    const vName = document.getElementById("v-name");
    text = vTitle.innerText;
    author = vName.innerText;
    if(text==="--")return;
// img.src = "https://nooneb.netlify.app/src.jpg";
    img.src ="data:image/jpeg;base64,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";

    img.onload = function () {
        let canvas = document.createElement("CANVAS");
        let ctx = canvas.getContext("2d");
        canvas.setAttribute("width", img.width);
        canvas.setAttribute("height", img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        ctx.font = "0.3rem Arial";
        ctx.fillStyle = "#fff";
        console.log(text);

        let t1=".";
        let t2=".";
        if (text.length>=28){
            t1=text.slice(0,28);
            t2=text.slice(28);
        }else {
            t1=text;
        }
        ctx.fillText(t1, 20, 980);
        ctx.fillText(t2, 20, 1010);

        //const jximg = document.createElement("IMG");

        //擦除作者
        // context.fillStyle = "#000";
        // context.fillText("▇▇▇▇▇▇▇▇▇▇▇▇▇▇", 60, 1100-13);
        //写入作者
        ctx.fillStyle = "#fff";
        ctx.fillText(author, 60, 1100-13);

        ctx.font = "15px Sans";
        const d = new Date();
        let mp2=d.getMinutes()+2;
        if (mp2>57){
            mp2=59;
        }
        const hTime=d.getHours()>9?d.getHours():'0'+d.getHours();
        const mTime=mp2>9?mp2:'0'+mp2;
        ctx.fillText(hTime+":"+mTime, 20, 40);

        ctx.fillStyle="#343434"
        ctx.fillText(Math.random().toString(),200,500)

        const url = canvas.toDataURL();
        //jximg.src = url;
        //jximg.width = 54;
        // jximg.height=120;
        // document.body.append(text);
        // const upImg = document.getElementsByTagName("img")[3];
        // upImg.src=url;
        up(url);

        ct.className="con-tip";

        //识别内容
        // const auList=["搞笑大牛","爱在风景里","金毛轮胎","空空绿植","每日伴读",
        //     "解压水果乐园","牛牛聊足球","莉姐家常菜li","怀旧经典88","齐鲁传统文化交流","解压日记"];
        // if(auList.includes(author)){
        //     author+="❤❤❤❤";
        // }
        //内容缩减一部分吧
        let shortText=text;
        if (shortText.length>55){
            shortText=shortText.substring(0,55-1);
        }

        ct.innerHTML=author+"_"+shortText;//
//         const aLink = document.createElement('A');
//         aLink.style.display = 'none';
//         aLink.href = url; // base64Url就是你要下载的base64格式图片代码
//         aLink.download = '2023.jpg';
// // 模拟点击
//         document.body.appendChild(aLink);
//         aLink.click();
// //移除节点
//         document.body.removeChild(aLink);
    }
}

setTimeout(doit, 4200);
