# vi命令语法
vi aaa.txt编辑文件，按i进行编辑，按esc后，按两次d删除行，输入:wq保存退出，:q退出，:q!不保存退出
# 小米路由-小强模式

小强模式能做到『路由模式』下连接wifi进行扩展，而不用通过『桥接模式』，这样就有比较多的定制权，开启方法待定。ssh或者telnet登录默认是账户root密码root，WLAN配置目标文件为/etc/config/wireless。

1开启ssh权限

需要OpenWRTInvasion项目

执行python remote_command_execution_vulnerability.py两次甚至多尝试几次最好是接2.4g的热点

然后telnet 192.168.31.1即可登录，默认账号密码root

## WISP模式

1如此配置的好处在于和上游用不同的ip段，上游可能是192.168.10.1，而桥接永远是192.168.31.1，如此上游将看不到下游设备数量

2桥接路由器后改回路由模式在往下配置

3修改文件../etc/config/wireless，找到带上游信息的wifi-iface

lan改成wan并且改disabled为0，表示不禁用，即启用

4修改文件../etc/network，找到interface 'wan'部分加入一行option type 'bridge'，注意lan部分不要改动

5配置完reboot重启

配置案例如下，ifname可能是其他名字，用iwconfig命令可以查看，scanifname中wl1是5G，极有可能wl0就是2.4G

```sh
config wifi-iface
        option ifname 'apcli0'
        option network 'wan'
        option encryption 'WPA2PSK'
        option device 'mt7628'
        option enctype 'AES'
        option scanifname 'wl1'
        option apcliband '5g'
        option key 'chck2976'
        option mode 'sta'
        option ssid 'CMCC-6c27-5G'
        option disabled '0'
        
```

## 定时wifi

对于有些网络白天开，有些网络晚上开，有必要定时连接不同的网络

wifi扫描
```sh
iwinfo wl0 scanning | grep SSID
```

做法案例

复制wireless的副本，wireless.aa，wireless.bb之类的

如果是2.4G网络，一般改apclic0 wl1 2g，总之是2.4g和5g不一样，

创建脚本，复制，重启网络
```sh
cp /etc/config/wireless.6c /etc/config/wireless
/etc/init.d/network restart
```
定时任务，执行脚本

找到/etc/crontabs/root添加两行定时任务，表示0点执行bb脚本，9点执行aa脚本
```sh
0 0    /etc/config/bb.sh
0 9    /etc/config/aa.sh
```
然后etc/init.d/cron restart重启任务
# 禁用广告iframe脚本

``` js
// ==UserScript==
// @name         ban_iframe
// @namespace    https://viayoo.com/iq3wfw
// @version      0.2
// @description  强力隐藏所有iframe
// @author       You
// @run-at       document-start
// @match        https://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // 第一道防线：使用CSS全局隐藏所有iframe，最高优先级！
    GM_addStyle('iframe { display: none !important; visibility: hidden !important; height: 0 !important; width: 0 !important; opacity: 0 !important; pointer-events: none !important; }');

    // 第二道防线：JS逻辑作为补充和兜底
    function hideAllIframes() {
        document.querySelectorAll('iframe').forEach(iframe => {
            // 尝试多种方式确保隐藏
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            iframe.style.height = '0';
            iframe.style.width = '0';
            iframe.style.opacity = '0';
            iframe.style.pointerEvents = 'none';

            // 尝试阻止iframe加载（对动态生成的iframe有效）
            iframe.src = 'about:blank';
            iframe.srcdoc = '';
        });
    }

    // 初始化执行一次
    hideAllIframes();

    // 增强的MutationObserver，监听更广泛的变化
    const observer = new MutationObserver(function(mutationsList) {
        let shouldCheck = false;
        for (let mutation of mutationsList) {
            // 监听节点添加、属性变化、子树变化
            if (mutation.type === 'childList' || mutation.type === 'attributes' || mutation.type === 'subtree') {
                shouldCheck = true;
                break;
            }
        }
        if (shouldCheck) {
            // 设置一个微小的延迟，确保DOM操作完成后再执行隐藏
            setTimeout(hideAllIframes, 100);
        }
    });

    // 开始观察body，监听所有可能的变化
    observer.observe(document.body, {
        childList: true,
        attributes: true,
        attributeFilter: ['src', 'style', 'class'], // 监听这些属性变化
        subtree: true
    });

    // 最后一道防线：周期性检查（根据需要启用）
    // setInterval(hideAllIframes, 2000); // 每2秒检查一次
})();

```

# 修改文件的hash

双箭头可以向文件追加内容，如下是追加换行符，当然也可以添加一些实体内容，视频音乐之类可以，其他格式就不一定了

`echo >> a.mp4`等价于`echo "" >> a.mp4`

注意不要单箭头，否则表示为覆盖原文件内容

# MIUI的刷ROOT案例

Note11Tpro

1.绑号等待168小时解锁

2.提取boot.img

3.magisk修补boot.img在Download中

4.刷入修补后的镜像fastboot flash boot_a xxx.boot，默认是a分区，ota升级后是b分区，查看fastboot getvar current-slot

5.magisk启用zygisk，刷入zygisk版LSPosed

# 从拨号进入lsposed

当 #lsposed 快捷方式被删掉后
进入lsposed的方式
*#*#5776733#*#*
手敲而不是复制

# PC没有网络的修复方法

万物皆可winsock
netsh winsock reset
没网，有网但黄色，都可以试试

# 记录我的Realme Q2

当我想要找刷机包时找不到，直接到twrp刷入magisk-v28，
一般就是apk改zip后缀直接刷就行，开机默认shamiko_052版本，然后，magisk又提示了个修复/直接安装，开启zygisk，又重启，再刷了shamiko_1.1和lsposed-zygisk_192，hide隐藏建行生活，完美解决。


# 从magisk迁移到apatch

解决电信、银行打不开，隐藏root更加彻底。
查内核adb shell cat /proc/version，一般情况都符合arm64

1.完全卸载magisk

2.apatch设置密钥，修补boot.img

3.fastboot刷入

4.安装系统补丁

5.装zygisk next

6.装lsposed

设置可以打开全局空间模式
shamiko似乎没用了
以上模块为非内核模块通用magisk

# fastboot免电脑

0.手机otg连接手机

1.termux-setup-storage给内存权限

2.termux-usb -l显示设备，应该有一台usb。

3.执行termux-usb -r -e $SHELL -E "/dev/bus/usb/001/002"

4.目标手机进入fastboot，此时fastboot devices可以显示设备

5.如果fastboot刷入提示permission denied，img文件位置/storage/emulated/0/xxx

# termux-adb工具
安装
``` shell
pkg upgrade
curl -s https://raw.githubusercontent.com/nohajc/termux-adb/master/install.sh | bash
```
安装完成后即可使用termux-adb devices显示列表

# apatch系统分区读写

apatch系统分区读写
前提条件：至少刷入一个模块，且 /data/adb/ap/modules.img 文件存在
然后在
/data/adb/modules/.rw/system下添加即可
此方案不会直接修改system分区的文件，而是通过OverlayFS的方式修改。
如果改坏了或者想还原，直接删除.rw 文件夹再重启手机即可恢复。

用途: hosts规则,抓包ca证书等

# 延迟截图

延迟执行

date;sleep 2;date

```sh
sleep 2;uiautomator dump /sdcard/xx.xml
```

# 探测路由器ip地址

```sh
for i in {2..13}; do echo "正在尝试访问 192.168.1.$i"; if curl -s --connect-timeout 0.1 "http://192.168.1.$i/" | grep -q "html"; then echo "找到路由器地址: 192.168.1.$i"; break; fi; done
```
```sh
m3=1;
start=2;
end=13;
for i in $(seq $start $end); do echo "正在尝试访问 192.168.$m3.$i"; if curl -s --connect-timeout 0.1 "http://192.168.$m3.$i/" | grep -q "html"; then echo "找到路由器地址: 192.168.$m3.$i"; break; fi; done
```

对于扩展器桥接，没法找到地址，可尝试此方案

# 学会使用正则表达式


正则表达式

1.开始
3
12345匹配3

2.匹配模式(放在最尾部)
g全局匹配
i忽略大小写
m多行模式

3.子表达式
通过括号括起来的内容

\d匹配一个数字

\d\d匹配连续两个数字,例如1233匹配结果有12和33

4.对子表达式的引用
(\d)\1
12233匹配22和33

(\d)\1(\d)\2
12233匹配到2233

(\d)(\d)\1\2
12123434匹配1212和3434

(\d)(\d)\2\1
11221匹配1221

([A-Z])\1([A-Z])\2
查找如AABB,ZZEE之类的

([0-9A-Za-z])\1
匹配如44,DD,cc之类的这里范围可随意改

5.匹配符(查什么)
字符簇[a-z] [A-Z] [0-9] [abcd]都是根据ascii码进行的查找

匹配任意一个[as83dA]

取反符号如[^0-9]可以得到非数字

特殊匹配符
\d匹配数字
\D匹配非数字
\w匹配下划线数字字母
\W匹配非下划线数字字母
\s匹配空白字符
\S匹配非空白字符
.匹配非\n换行符
[\u4e00-\u9fa5]匹配中文

6.限定符(查多少)
*表示0到多次
+表示1到多次
?表示0或1次
{n}表示n次
{n,}表示至少n次
{n,m}表示n到m次

案例
查数字串[1-9]\d+
查手机号1[34578]\d{9}

7.定位符(从哪查)

例如限定一个字符串为手机号^1[34578]\d{9}$

这里用到了^和$定位了开头和结尾

\b单词边界

\B非单词边界

8.转义

$, (, ), *, +, ., [, ], ?, \, ^, {, }, |

9.一个网址的匹配案例

^\w+:\/\/\w+\.\w+(\.\w+)?$

解析

^和$限定开头结尾

\w+对应1级

\.\w+对应2级

然后第3级可有可无

10.一个匹配串的例子
(12)(\S)+(34)
从uyfgyg12gytd34fyug匹配出12gytd34

11.json中对象数组的去除的例子
实现匹配到的内容替换成空和去逗号，只留下需要的
```shell
(,*)\{[^{}]*?"[^"]+"\s*:\s*"[^"]*?(?:单车|车1)[^"]*?"[^{}]*\}(,*)
```

# 电视adb调试

创维电视远程安装APP

0.开启adb调试
关于界面上上下下左右左右进入工厂模式

1.挂载存储
termux-setup-storage

2.安装adb工具
pkg install android-tools

3.连接(同一局域网)
adb connect 192.168.xxx.xxx

4.安装
adb install storage/download/xxx.apk

其它

查看已连接 adb devices

停止 adb kill-server

断连 adb disconnect ip

列举包 adb shell pm list packages

禁用 adb shell pm disable --user 0 xxx

推送 adb push xxx yyy

拉取 adb pull yyy xxx

# appops权限表

```java
// AppOpsManager.java - operation ids for logging
enum AppOpEnum {
    APP_OP_NONE = -1;
    APP_OP_COARSE_LOCATION = 0;//粗略位置
    APP_OP_FINE_LOCATION = 1;//精准位置
    APP_OP_GPS = 2;//定位
    APP_OP_VIBRATE = 3;//震动
    APP_OP_READ_CONTACTS = 4;//读通讯录联系人
    APP_OP_WRITE_CONTACTS = 5;//写通讯录联系人
    APP_OP_READ_CALL_LOG = 6;//读通话记录
    APP_OP_WRITE_CALL_LOG = 7;//写通话记录
    APP_OP_READ_CALENDAR = 8;//读日历
    APP_OP_WRITE_CALENDAR = 9;//写日历
    APP_OP_WIFI_SCAN = 10;//扫描WiFi
    APP_OP_POST_NOTIFICATION = 11;//通知
    APP_OP_NEIGHBORING_CELLS = 12;//手机网络扫描
    APP_OP_CALL_PHONE = 13;//打电话
    APP_OP_READ_SMS = 14;//读短信
    APP_OP_WRITE_SMS = 15;//写短信
    APP_OP_RECEIVE_SMS = 16;//收短信
    APP_OP_RECEIVE_EMERGENCY_SMS = 17;//收紧急短信
    APP_OP_RECEIVE_MMS = 18;收彩信
    APP_OP_RECEIVE_WAP_PUSH = 19;收wap push消息(广告)
    APP_OP_SEND_SMS = 20;//发短信
    
    
    
    APP_OP_READ_ICC_SMS = 21;//读取icc短信，不知道是啥
    APP_OP_WRITE_ICC_SMS = 22;//写入icc短信
    APP_OP_WRITE_SETTINGS = 23;//修改系统设置(网络音量亮度等)
    APP_OP_SYSTEM_ALERT_WINDOW = 24;//显示在其他应用的上层(悬浮窗)
    APP_OP_ACCESS_NOTIFICATIONS = 25;访问通知(查询，修改)
    APP_OP_CAMERA = 26;//相机
    APP_OP_RECORD_AUDIO = 27;//录音
    APP_OP_PLAY_AUDIO = 28;//播放音频
    APP_OP_READ_CLIPBOARD = 29;//读取剪切板
    APP_OP_WRITE_CLIPBOARD = 30;//写入剪切板
    APP_OP_TAKE_MEDIA_BUTTONS = 31;//媒体按钮
    APP_OP_TAKE_AUDIO_FOCUS = 32;//音频焦点
    APP_OP_AUDIO_MASTER_VOLUME = 33;//主音量
    APP_OP_AUDIO_VOICE_VOLUME = 34;//语音音量
    APP_OP_AUDIO_RING_VOLUME = 35;//铃声音量
    APP_OP_AUDIO_MEDIA_VOLUME = 36;//媒体音量
    APP_OP_AUDIO_ALARM_VOLUME = 37;//闹钟音量
    APP_OP_AUDIO_NOTIFICATION_VOLUME = 38;//通知音量
    APP_OP_AUDIO_BLUETOOTH_VOLUME = 39;//蓝牙音量
    APP_OP_WAKE_LOCK = 40;//保持唤醒
    APP_OP_MONITOR_LOCATION = 41;//监测位置
    APP_OP_MONITOR_HIGH_POWER_LOCATION = 42;//监控高电耗位置信息服务
    APP_OP_GET_USAGE_STATS = 43;//使用情况统计
    APP_OP_MUTE_MICROPHONE = 44;//麦克风操作
    APP_OP_TOAST_WINDOW = 45;//吐司Toast
    APP_OP_PROJECT_MEDIA = 46;//投影媒体
    APP_OP_ACTIVATE_VPN = 47;//激活vpn
    APP_OP_WRITE_WALLPAPER = 48;//写入壁纸
    APP_OP_ASSIST_STRUCTURE = 49;//辅助结构
    APP_OP_ASSIST_SCREENSHOT = 50;//辅助屏幕截图
    APP_OP_READ_PHONE_STATE = 51;//读取手机状态(号码，运营商，设备状态等)
    APP_OP_ADD_VOICEMAIL = 52;//添加语音邮件
    APP_OP_USE_SIP = 53;//使用sip
    APP_OP_PROCESS_OUTGOING_CALLS = 54;//处理拨出电话
    APP_OP_USE_FINGERPRINT = 55;//指纹
    APP_OP_BODY_SENSORS = 56;//身体传感器
    APP_OP_READ_CELL_BROADCASTS = 57;//读取小区广播
    APP_OP_MOCK_LOCATION = 58;//模拟位置
    APP_OP_READ_EXTERNAL_STORAGE = 59;//读取外部存储，一般是sdcard
    APP_OP_WRITE_EXTERNAL_STORAGE = 60;//写入外部存储
    APP_OP_TURN_SCREEN_ON = 61;//点亮屏幕
    APP_OP_GET_ACCOUNTS = 62;//获取账号，如华米OV之类账号
    APP_OP_RUN_IN_BACKGROUND = 63;//在后台运行
    APP_OP_AUDIO_ACCESSIBILITY_VOLUME = 64;//无障碍功能音量
    APP_OP_READ_PHONE_NUMBERS = 65;//读取手机号码
    APP_OP_REQUEST_INSTALL_PACKAGES = 66;//请求安装应用
    APP_OP_PICTURE_IN_PICTURE = 67;//进入画中画
    APP_OP_INSTANT_APP_START_FOREGROUND = 68;
    APP_OP_ANSWER_PHONE_CALLS = 69;//接听电话
    APP_OP_RUN_ANY_IN_BACKGROUND = 70;//后台限制问题
    APP_OP_CHANGE_WIFI_STATE = 71;//更改WiFi状态
    APP_OP_REQUEST_DELETE_PACKAGES = 72;//请求删除应用
    APP_OP_BIND_ACCESSIBILITY_SERVICE = 73;//使用无障碍服务
    APP_OP_ACCEPT_HANDOVER = 74;//继续进行来自其他应用的通话
    APP_OP_MANAGE_IPSEC_TUNNELS = 75;//管理ip隧道什么的
    APP_OP_START_FOREGROUND = 76;//运行前台服务(通知Service，防被杀)
    APP_OP_BLUETOOTH_SCAN = 77;//蓝牙扫描
    APP_OP_USE_BIOMETRIC = 78;//生物识别硬件
    APP_OP_ACTIVITY_RECOGNITION = 79;//识别身体活动，可能是计步器
    APP_OP_SMS_FINANCIAL_TRANSACTIONS = 80;//付费短信权限
    APP_OP_READ_MEDIA_AUDIO = 81;//存储的细分，读取音频
    APP_OP_WRITE_MEDIA_AUDIO = 82;//存储的细分，写入音频
    APP_OP_READ_MEDIA_VIDEO = 83;//读取视频
    APP_OP_WRITE_MEDIA_VIDEO = 84;//写入视频
    APP_OP_READ_MEDIA_IMAGES = 85;//读取图片
    APP_OP_WRITE_MEDIA_IMAGES = 86;//写入图片
    APP_OP_LEGACY_STORAGE = 87;//旧有存储，很少见
    APP_OP_ACCESS_ACCESSIBILITY = 88;//无障碍
    APP_OP_READ_DEVICE_IDENTIFIERS = 89;//读取设备识别码
    APP_OP_ACCESS_MEDIA_LOCATION = 90;//从媒体文件读取位置(访问共享空间媒体文件)
    APP_OP_QUERY_ALL_PACKAGES = 91;//获取应用列表
    APP_OP_MANAGE_EXTERNAL_STORAGE = 92;//管理所有文件
    APP_OP_INTERACT_ACROSS_PROFILES = 93;//必须固件签名密钥
    APP_OP_ACTIVATE_PLATFORM_VPN = 94;//与vpn相关
    APP_OP_LOADER_USAGE_STATS = 95;//允许数据加载器读取包的访问日志
    APP_OP_DEPRECATED_1 = 96 [deprecated = true];
    APP_OP_AUTO_REVOKE_PERMISSIONS_IF_UNUSED = 97;//未使用权限移除
    APP_OP_AUTO_REVOKE_MANAGED_BY_INSTALLER = 98;管理安装的权限
    APP_OP_NO_ISOLATED_STORAGE = 99;//数据虚拟文件系统隔离
}
```

# DELL-PC 解锁bios

1.使用 https://bios-pw.org 生成解锁码

2.如果提示错误，将6FF1改BF97，输入新的解锁码仍然提示错误，在输入一遍，用Ctrl+Entet确认，并且是按了两遍enter，成功。

# 解决应用闪退的建议

在微信内打开网页调用摄像头拍照返回导致闪退，在我开启手机的高性能模式后，修复了闪退，很大原因是省电模式的问题。

# 部分游戏跳广告得奖励方法

由于视频是下载再播放的，明显的，找到android/data下或者data/data下的目标包名，如果广告的视频是放到某个文件夹下，便可以将该文件夹设置为不可写入即可，当然也可以保留一些几秒的视频或者删除头部一些内容成为坏文件。（对于一些对抗性强的顽固分子，俺们也无可奈何）。

# 只有root能做到的事

随着解锁难度的增加，和高性价比机子的吸引，审视一下root才能做到的行为。

APP冻结

组件禁用

GG修改器

shell sudo

抓包

chmod读写权限

系统ui优化定制

lsposed框架

以上很多都可以在虚拟机做到，是否值得舍弃。

# OpenWrt

breed刷入方式参考网上

路由器按住reset键再插电可进入breed,浏览器能访问
用telnet 192.168.1.1可进入breed命令行

hfs能开启一个http服务将镜像系统加入到http

在breed中wget目标镜像,可得到镜像大小小于600000和地址0x80000000
大小根据实际情况调整,擦除和写入应当大于镜像大小.

##不同的机型位置不一样!!!
##在14位置擦除地址大小6万
flash erase 0x140000 0x600000

##写入
flash write 0x140000 0x80000000 0x600000

##在14位置启动
boot flash 0x140000

##配置OpenWrt
1.配置lan的静态地址,防止和主路由器冲突,如果是扩展wifi的话
2.连接wifi,此时将能ping通网络,并且网线连接的设备也将有网络
3.开启热点.
3.无法访问是防火墙firewall最好不要去动,没有防火墙将无法访问,特别是lan的防火墙.

#恢复官方镜像
需要官方的bootloader,部分机型找不到bootloader,无法回到官方
为什么要回官方?官方是稳定的,openwrt有时经常掉wifi拒绝接入,每次都要拔电重插,
这是很麻烦的,至少是不方便的

# CE修改器-联合搜索

generate groupescan command

添加数据,类型group,搜索即可
