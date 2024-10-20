# 安装

```sh
https://github.com/termux/termux-app/releases
```

包更新

```sh
pkg update
```

# openssh

用于远程连接termux,需要先装openssl

```sh
pkg install openssl-tool
pkg install openssh
```

**免密登录**

在客户机生成密钥ssh-keygen复制到服务机./ssh/authorized_keys文件

服务机启动,可设置密码,ifconfig查看ip

```sh
sshd
passwd
```

客户机: 第一次yes,连接成功将在客户机.ssh/下产生known_hosts文件,

Host key verification failed问题,需要清理一下know_hosts

```
ssh 192.168.x.xxx -p 8022
```

**密码登录**

参见sshpass

# python

```sh
pkg install python
```

# nodejs

```sh
pkg install nodejs
```

## canvas

需要依赖于python环境

**安装cairo pango**

```sh
pkg install libcairo
```

**安装pango**

```sh
pkg install pango
```

**安装jpeg**

```sh
pkg install libjpeg-turbo
pkg install openjpeg
```

**编译xproto**

```sh
pkg install openssl1.1-tool
#添加环境变量
echo "export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib/openssl-1.1" >> ~/.bashrc
#使当前shell生效
export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib/openssl-1.1

git clone https://gitlab.freedesktop.org/xorg/proto/xorgproto.git

#需要
pkg install autoconf
pkg install automake

cd xorgproto
./autogen.sh

#编译
sudo ./configure --prefix=$PREFIX && make && make install
```

**gyp编译canvas**

```sh
npm install canvas --build-from-source
npm install canvas
```

### 案例1

```js
const {Image,createCanvas}=require('canvas')

const img=new Image()
img.onload=function(){
    const cv=createCanvas(img.width,img.height)
    const ctx=cv.getContext('2d')
    ctx.drawImage(img,0,0,img.width,img.height)
    ctx.fillText("你好啊",10,10)
    const b64Str=cv.toDataURL()
    console.log(b64Str)
    //doSomething
}
img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAn1BMVEUAAAD//////1X//2b/41X/6lX/51D/4lL/41D/41D/4k3/403/4k7/4U7/4k//4U7/4U3/4U7/4U3/4k7/4k7/4k7/4U7/4U7/4k3/4U7/4k7/4U7/4U5cOSVdOSVeOiVgPSZsSiluSylvTClwTiqLaTGpiDe3lzvHpj/Hpz/OrkHSskLVtELZukPszEj620z73Ez83Uz83kz+303/4U29C7t3AAAAHXRSTlMAAQMFCQwgNTZJT2NyeYWam6ussMLS1d/k6ezw+ZtQLqkAAAGTSURBVEjHpZfZkoIwEEUjLiibIKsRF1wQ1xm1///bBodxSpOASXseUx6ry3S6r4QI0HRrGMQ0TWkcDC1dI1K0DW8CL0w8o/1W69gUBFC706hpZgI1JGZDxYMIGogGNVrLgTc4LZHX9eEtfpf3eiFIEPY4bwxSjBmzG4Ik4Uu1LR+k8Z9/IQcUcJ7uD5T4v08tUhOjRw+ZoIj519eJqphUHW+DMvbv+6PqIr2/TwMQGKU4woheeRfMnLjkWZZfmk/KaaKRPvNd+bQkbz4p0YnFnGT3j2XNJyUWcXGiSwJcqQGJAfPjQEwooKAkxYkpXkSXGuPEmLsOSQKuASQZci0niUV09uiwnnKsD8A1OfusQOCVJnDPinvIUqInGB1bkbgVjA52WH0teW/5LRhW3HgsZqw3K0TjkR/IxeLVWxTigcyvgOPq2Vsda1aAYOnc9pt5Zc03+1vt0hGuuev5tNudztemNYdfrPhVjg4P+LiCD0j4SIYPgfjY+UHQxUfrKsyP2DA/kgjzVcV9y338fXCtvrDGH8zB1O/tBTH2AAAAAElFTkSuQmCC"
```

### 案例2

做一个后台,前端发送base64,后端接收base64,转图片,处理完成返回base64给前端

可行: 对于图片处理的结果可以response对象返回,而不是所谓函数return

img.onload是异步

# openjdk

```sh
pkg install openjdk
```

# clang/gcc

# Aircack-ng

安装必要的依赖

```shell
apt install libc++ libnl libpcap libsqlite openssl pcre zlib -y
```

下载aarch64的包

```shell
wget https://raw.githubusercontent.com/pitube08642/aircrack-ng-for-termux/main/dists/termux/aircrack-ng/binary-aarch64/aircrack-ng_3_1.7_aarch64.deb
```

安装

```shell
dpkg -i aircrack-ng_3_1.7_aarch64.deb
```

运行

```shell
aircrack-ng -S
```

跑包

```shell
aircrack-ng xxx.cap -w mima.txt
```

# 网速限制

添加限制

```sh
sudo tc qdisc add dev wlan0 root tbf rate 72Kbi latency 50ms burst 15kb
```

解除限制

```sh
sudo tc qdisc del dev wlan0 root
```

# FFMPEG

安装ffmpeg
pkg install ffmpeg
pkg install libexpat
pkg install openssl1.1-tool
缺什么库就装什么库

# openssl安装

```sh
安装openssl
pkg install openssl1.1-tool
添加环境变量
echo "export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib/openssl-1.1" >> ~/.bashrc
使当前shell生效
export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib/openssl-1.1
```

# nginx

```sh
安装nginx
pkg install nginx
启动nginx
nginx
停止nginx
nginx -s stop
设置nginx自启动
nano -w  ~/.bashrc
粘贴内容
if pgrep -x "nginx" >/dev/null
  then
    echo "nginx运行中..."
  else
    nginx >/dev/null
    echo "nginx已开启..."
fi

保存Ctrl+o退出Ctrl+x

nginx目录位置
/usr/share/nginx/html
进入
cd $PREFIX/share/nginx/html
nginx配置文件位置
$PREFIX/etc/nginx/nginx.conf
```

