# 基础

如下,api为自带csp

并且制定了jar,,此处type=3

```json
{
  "sites": [
    {
      "key": "kuaikan",
      "name": "快看直链",
      "type": 3,
      "api": "csp_Kuaikan",
      "searchable": 1,
      "quickSearch": 1,
      "filterable": 1,
      "jar": "https://jihulab.com/xhkw/vip/-/raw/main/jar/kuaikan.jar"
    }
  ]
}

```

白沙苏宁无jar,只靠api即可,但是api其实只有推荐,此处type=1

```json
{
  "sites": [
    {
      "key": "jszy",
      "name": "🚄白沙苏宁",
      "type": 1,
      "api": "https://jszyapi.com/api.php/provide/vod/from/jsm3u8",
      "searchable": 1,
      "changeable": 1,
      "quickSearch": 1,
      "filterable": 1,
      "categories": [
        "动作片",
        "喜剧片",
        "科幻片",
        "恐怖片",
        "剧情片",
        "战争片",
        "记录片",
        "灾难片",
        "悬疑片",
        "犯罪片",
        "奇幻片",
        "动画片",
        "中国动漫",
        "日本动漫",
        "欧美动漫",
        "内地剧",
        "欧美剧",
        "香港剧",
        "台湾剧",
        "韩剧",
        "马泰剧",
        "体育赛事",
        "大陆综艺",
        "港台综艺",
        "日韩综艺",
        "欧美综艺"
      ]
    }

  ]
}
```

南瓜,,

drpy2应该是某些固定的爬虫

个人能写的只有ext了吗???

在drpy2中,使用了cheerio爬虫,最后export

此type=3

```json
{
  "sites": [
     {
            "key": "南瓜",
            "name": "🎃南瓜┃卡顿时请切换NG速播A或SEVEN源",
            "type": 3,
            "api": "http://8.210.232.168/ys/dr_py/libs/drpy2.min.js",
            "ext": "http://8.210.232.168/ys/dr_py/js/南瓜.js"
        }
  ]
}
```

```js
import cheerio from "assets://js/lib/cheerio.min.js";
import "assets://js/lib/crypto-js.js";
import 模板 from "../js/模板.js";
import {gbkTool} from "./gbk.js";
```

```js
export default {
    init: init,
    home: home,
    homeVod: homeVod,
    category: category,
    detail: detail,
    play: play,
    search: search,
    proxy: proxy,
    sniffer: sniffer,
    isVideo: isVideo,
    DRPY: DRPY
};
```

结构

sites首页parse解析spider不知道什么爬虫,lives直播

```json
{
    sites:[],
    parses:[],
    spider:[],
    wallpaper:[],
    lives:[],
    rules:[],
    ijk:[],
    ads:[]
}
```

