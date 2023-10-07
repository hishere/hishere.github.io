
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
    img.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wEEEAAQABAAEAAQABEAEAASABQAFAASABkAGwAYABsAGQAlACIAHwAfACIAJQA4ACgAKwAoACsAKAA4AFUANQA+ADUANQA+ADUAVQBLAFsASgBFAEoAWwBLAIcAagBeAF4AagCHAJwAgwB8AIMAnAC9AKkAqQC9AO4A4gDuATcBNwGiEQAQABAAEAAQABEAEAASABQAFAASABkAGwAYABsAGQAlACIAHwAfACIAJQA4ACgAKwAoACsAKAA4AFUANQA+ADUANQA+ADUAVQBLAFsASgBFAEoAWwBLAIcAagBeAF4AagCHAJwAgwB8AIMAnAC9AKkAqQC9AO4A4gDuATcBNwGi/8IAEQgEsAIcAwEiAAIRAQMRAf/EABsAAQACAwEBAAAAAAAAAAAAAAADBQECBAYH/9oACAEBAAAAAPn4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsPUed6LzyGOUAAAS+jrkdjTaWNZ3MVie2hjrAAAF97/xVv7D5L6nn8SAAASer56mP1dBvaUHZf03nFnJW3vnQAAE3fxb9dZoAAAG9ppx8+7Q3300ZsM8vOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB18gLHh0AAAAAAAAAHfzQjZZ1QAAAAAAAAASdleO+aqAAAAAAAAAAzgbagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
    img.onload = function () {
        let canvas = document.createElement("CANVAS");
        let context = canvas.getContext("2d");
        canvas.setAttribute("width", img.width);
        canvas.setAttribute("height", img.height);
        context.drawImage(img, 0, 0, img.width, img.height);
        context.font = "0.3rem Arial";
        context.fillStyle = "#fff";
        console.log(text);
        context.fillText(text, 20, 1000);
        //const jximg = document.createElement("IMG");

        //擦除作者
        context.fillStyle = "#000";
        context.fillText("▇▇▇▇▇▇▇▇▇▇▇▇▇▇", 60, 1100-13);
        //写入作者
        context.fillStyle = "#fff";
        context.fillText(author, 60, 1100-13);

        context.font = "15px Sans";
        const d = new Date();
        context.fillText(d.getHours()+":"+d.getMinutes()+":"+d.getDate(), 20, 40);

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
            shortText.substring(0,55-1);
        }

        ct.innerHTML=shortText;//赋值由text改为author,又改回了text
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

setTimeout(doit, 4100);