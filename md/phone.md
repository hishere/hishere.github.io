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

# 路由器扩展器ip得到

for i in {40..50}; do curl --connect-timeout 0.05 "http://192.168.1.$i/phone"; done

红米无法访问腾达，循环curl得到管理后台地址，如上是从40试到50，找到后台是47号

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