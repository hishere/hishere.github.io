## mkv转mp4


为了加快速度，用到了多线程

注意字幕丢失问题，先转再加字幕

```sh
sudo ffmpeg -i /s.mkv -threads 5 -preset ultrafast -c:v libx264 -strict -2 s2.mp4
```

## 视频分割

-ss是开始，-t是长度

```sh
sudo ffmpeg -ss 00:00:00 -t 00:10:00 -i src.mkv -acodec copy \-vcodec copy part1.mkv
```

## 软字幕

硬字幕会增大体积(渲染到视频，合为一体)，这里用了软字幕(独立通道)，需要播放器支持

```sh
ffmpeg -i in.mkv -i in.ass -c copy -c:s ass out.mkv
sudo ffmpeg -i /storage/emulated/0/ss8.mp4 -i /storage/emulated/0/ss.ass -c copy -c:s mov_text /storage/emulated/0/ss8ass.mp4
```

## 扩展字幕
在1920x1080视频底部添加空白区域放字幕案例

```sh
ffmpeg -threads 4 -i 03.mp4 -filter_complex "[0:v]pad=1920:1280:0:0[extended]; [extended]subtitles=03.srt:force_style='Alignment=2,MarginV=10,Fontsize=24'" -c:a copy -preset fast -crf 23 output.mp4
```

附加字幕获取 https://downsub.com


## 大小质量问题

```sh
-b:v 5000k
```

## 裁剪画面

宽 : 高 : x : y

```sh
crop="200:400:0:120";
sudo ffmpeg -i a.mp4 -vf crop="$crop" -threads 4 -preset ultrafast -strict -2 b.mp4
```

## 剪切片段
当然也可以精细化裁剪，如00:00:03.100，表示3.1秒的位置
```sh
start="00:03:46";
end="00:17:55";
sudo ffmpeg -ss "$start" -to "$end" -i ssa.mp4 -c:v copy -c:a copy "seg_$(date +"%s%3N").mp4" -y
```

### 自动开头结尾适应

```sh
#!/bin/bash
start_time="00:14:50"
end_time="00:33:09"
inname="ssa.mp4"

# 函数：将hh:mm:ss转换为秒数
to_seconds() {
    IFS=":" read -r h m s <<< "$1"
    echo $((10#$h * 3600 + 10#$m * 60 + 10#$s))
}

# 转换为秒数
start_seconds=$(to_seconds "$start_time")
end_seconds=$(to_seconds "$end_time")

# 判断并交换（如果end < start）
if [ "$end_seconds" -lt "$start_seconds" ]; then
    echo "警告：结束时间小于开始时间，正在交换值..."
    temp="$start_time"
    start_time="$end_time"
    end_time="$temp"
fi

# 运行FFmpeg命令（使用交换后的时间）
ffmpeg -ss "$start_time" -to "$end_time" -i "$inname" -c:v copy -c:a copy "k8_$(date +"%s%3N").mp4" -y

```

# tg下载文件操作


```js

const readline = require("readline");
const fs=require("fs").promises;
const { StringSession } = require("telegram/sessions");
const { TelegramClient, Api } = require("telegram");

const apiId = parseInt(process.env.TG_ID);
const apiHash = process.env.TG_HASH;
const stringSession = new StringSession(process.env.TG_SESSION);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 3,
});


async function main() {
    try {
        await client.connect();
        console.log("已连接到 Telegram API");

        const messageUrl = 'https://t.me/listenNice/464';
        
        // 解析链接
        const urlParts = messageUrl.split('/');
        const username = urlParts[3];
        const messageId = parseInt(urlParts[4]);
        
        // 获取对话实体
        const entity = await client.getEntity(username);
        
        // 获取消息
        const result = await client.getMessages(entity, { ids: messageId });
        console.log("获取消息成功");
        
        // 下载并写入文件
        if (result.length > 0) {
            // 1. 先确认下载的 buffer 有效（避免空数据）
            const buffer = await client.downloadMedia(result[0], {
                progressCallback: (progress) => console.log("下载进度："+(progress/1000000)+"MB")
            });
            
            if (!buffer || buffer.length === 0) {
                console.error("下载失败：未获取到有效数据");
                return; // 数据为空时终止后续操作
            }
            
            // 2. 用 Promise 版本的 writeFile，确保 await 能等待写入完成
            await fs.writeFile("./file.zip", buffer); // 这里会等待写入完成
            console.log("文件写入成功：./file（大小：", buffer.length, "字节）"); // 打印大小验证
        } else {
            console.log("未找到目标消息");
        }

    } catch (error) {
        console.error("执行出错：", error); // 捕获所有错误（包括写入失败）
    } finally {
        if (client.connected) {
            await client.disconnect();
            console.log("已断开 Telegram 连接");
        }
        process.exit(0); // 此时写入已完成，再退出
    }
}

main().catch(err => {
    console.error("全局未捕获错误：", err);
    process.exit(1);
});


```