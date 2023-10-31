//开始时是否有un
let un = localStorage.getItem("un");
if(un==null){
localStorage.setItem("un","13435262478");
un="13435262478";
    const token = Math.trunc(Math.random()*1000);
    localStorage.setItem("token",token.toString());
}


const backup = unArr;

// console.log(unArr);
function tok(){
 return Math.trunc(Math.random()*1000);
 // return "79ff2b06537d08df310195df9a8f5dfa";
    // return "248";
}

const div = document.createElement("DIV");
div.style.whiteSpace="nowrap";
div.style.overflow="scroll";
div.style.padding="0.4rem";

let rindex = 0;
if(un!=null){
    const index = unArr.indexOf(un);
    document.title=un;
    const a1 = unArr.slice(0, index);
    const a2 = unArr.slice(index, unArr.length);
    unArr=a2.concat(a1);
    rindex=index;


}


const ff = document.createElement("A");
if(rindex!==0){
    ff.innerHTML="<<";
    ff.href="#?r="+rindex;
    ff.setAttribute("un",backup[rindex-1]);
    ff.style.margin="0.2rem";
    ff.style.padding="0.2rem";
    ff.style.border="1px solid lightblue";
    ff.onclick=function(){
        localStorage.setItem("un",this.getAttribute("un"));
        localStorage.setItem("token",tok());
        location.reload();
        // location.href="http://vd.gmbnkb.cn/dbuser/index.html?mid=1601180774730694656";
    };
    div.appendChild(ff);
}


for(let i in unArr){
    const a = document.createElement("A");

    if(i!=="1"){
        a.innerHTML=rindex<10?("0"+rindex):rindex;
    }else {

    }
    // console.log(rindex);

    rindex=rindex+1;
    if(rindex===unArr.length)rindex=0;

    a.href="#?r="+rindex;
    if(i==="1"){
        a.innerHTML=">>";
    }
    // a.setAttribute("index",i);
    a.setAttribute("un",unArr[i])
    a.style.margin="0.2rem"
    a.style.padding="0.2rem";
    a.style.border="1px solid lightblue";
    a.onclick=function(){
        localStorage.setItem("un",this.getAttribute("un"));
        localStorage.setItem("token",tok());
        // localStorage.setItem("now",this.getAttribute("index"))
        location.reload();
        // location.href="http://vd.gmbnkb.cn/dbuser/index.html?mid=1601180774730694656";
    };
    div.appendChild(a);

    // if(i===100){
    //     div.appendChild(document.createElement("BR"));
    // }
}


const bo = document.getElementsByClassName("page-body");//0910
bo[0].appendChild(div);


const fo = document.getElementsByClassName("page-footer");//0910
const me = document.createElement("A");
me.innerHTML="是我";
me.style.margin="0.2rem";
me.style.padding="0.2rem";
me.style.border="1px solid lightblue";
me.onclick=function (){
    localStorage.setItem("un","17306500179");
    // location.href="http://vd.jxvrqh.cn/dbuser/index.html?mid=1601148603215249408";
    // location.href="http://vd.mtbglf.cn/dbuser/index.html?mid=1601148603215249408";
    location.reload();
}
fo[0].appendChild(me);

function addPh(name,un){
    const notme = document.createElement("A");
    notme.innerHTML=name;
    notme.style.margin="0.2rem"
    notme.style.padding="0.2rem";
    notme.style.border="1px solid lightblue";
    notme.onclick=function (){
        localStorage.setItem("un",un);
        location.reload();
    }
    fo[0].appendChild(notme);

}
addPh("零号","13727183873");
addPh("壹佰","18234685357");
addPh("贰佰","18353483702");


// if (others.indexOf(un)!==-1){
//     document.title="*"+un+"*";
// }
