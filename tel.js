//13611148490 18820079272 18316100595
//15007067080 18722901039 13405297703 13407480652
//
let unArr = ["13727183873", "13435262478",
    "13931017707", "18617496028",
    "15579475316", "15279640944",
    "13586585754", "13575351361",
    "15815112792", "15134036248","13440157992","15541670439","15576327805","18654545221","18836776063",
    "18720421189","15095767188","13416307638",
    "18855617436","18530488321",
    "15119057644", "13689626483", "18876190378",
    "15336589382", "15753827502",
    "19845165017", "18674202860",
    "15569380710", "15363076638", "18384773757",
    "18856217368", "18086968227", "13552845001",
    "17730092538", "13439725972",
    "13673803837", "18110869099", "15322354419",
    "17818050264", "17313467652",
    "13828376230", "15538783700", "15972971093",
    "13659366408", "17641059576",
    "17520312530", "13870530097", "18732998563",
    "17829524223", "19908014556",
    "13103504716", "15149560515", "18361163087",
    "15803663325", "19537973645",
    "13107989161", "18148506968", "13129678101",
    "18739905370", "18886482032","19890953306","18295763514",
    "18367838595","17702910064","13240869657","17840083952",
    "18625036339","13662847274","17843587665","17834742913",
    "15919935497", "18264739671", "15599464719",
    "17384032241", "17688156483",
    "15198637912", "13615586846", "15035810856",
    "13638160127", "18037300930",
    "13732176658", "15972918314", "13605078823",
    "15133986576", "15883623010",
    "18684962139", "15535780702", "18528591302",
    "18566126252", "13042158810",
    "18781996926", "13670734265", "15627831563",
    "18006723827", "18655273382",
    "18604748551", "18128735167", "15965012700",
    "15791712295", "15831591226",
    "18234685357", "13328569337", "15722419836",
    "18166276671", "18028367232",
    "15845453009", "15329785904", "17320189526",
    "17325911584", "15879505955", "13781218452", "17352797720", "15992102852",
    "17627819606", "13294766976", "18296455931", "17849010924",
    "18626407860","13150063211",
    "13104879321","18669465375",
    "13611148490","18820079272","18316100595","15007067080",
    "18722901039","13405297703","13407480652",
    "18703246745","18210817995",
    "13840313743","18902249193","17673641406","13914977475",
    "13239266400","13375443519","17302658571","15139622994","13213088526",
    "19151906710","18320257505","17680881412","15521584598","18224801671",
    "13539705812","15851575013","17360731509","15579977197",
    "15034681783","13798563710",
    "15673570902","14777065438","17375946717","15279836781",
    "18312066901","15555071005","13167937279","13429985949","13697708588",
    "18535536046","18616567959","15807141309","13179663118",
    "18137821387","13080186770","13613308322",
    "18814060994","19123920719","17630846107",
    "19812191935","18703556065","13245102582","13267168096",
    "18077795631","17369229562","13600976470","13082931708",
    "18778486401","19918801949","18786766753","15563935200",
    "18327164576","13454738760","18653842906","18061119037",
    "18902647011","18143619424","13172031850","18334627792",
    "18687819913","17601262441","16287670639","15627928176","13030595681",
    "13156901354","13413102991","18824302173"];
    // "19977157218", "18182534200", "18572113235", "15307307822", "19897194195", //别的号175---
    // "18198909255", "13196213391", "18545286722", "13656693891", "17585422137"];//别的号---184
console.log("长度: "+unArr.length);


const others = ["15307307822", "19897194195", "18198909255", "13196213391",
    "13656693891", "19977157218", "18182534200", "18572113235",
    "13666719252",
    "18545286722", "17585422137"];
//临时合并
unArr=unArr.concat(others);


if(typeof(exports) != "undefined"){
    exports.unArr= unArr;
    exports.others= others;
}

console.log("长度: "+unArr.length);
console.log("index un: "+unArr[193]);

// let x=0;
// for (let u of unArr) {
//     console.log(x+" "+u+" @nooneb.uu.me");
//     x+=1;
// }