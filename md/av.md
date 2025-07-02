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

## 大小质量问题

```sh
-b:v 5000k
```

## 裁剪画面

宽 : 高 : x : y

```sh
ffmpeg -i a.mp4 -vf crop=200:400:0:120 -threads 4 -preset ultrafast -strict -2 b.mp4
```

## 剪切片段

```sh
ffmpeg -ss 00:03:46 -to 00:17:55 -i ssa.mp4 -c:v copy -c:a copy "seg_$(date +"%s%3N").mp4" -y
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

