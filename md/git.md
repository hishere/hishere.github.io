# Github Action

在项目根目录创建.github/workflows/xxx.yml即可

## 用途

在项目push后做一些操作,或者定时器按时执行一些东西

## yml结构

如下最重要的当然是jobs
actions/checkout@v4是得到项目所有文件的能力

```yml
name: '3 body sign'

# Controls when the workflow will run
on:
  # Triggers the workflow
  schedule:
    - cron: '* 2 * * *'
     
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  bot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: 'wb sign'
        run: bash ./wb.sh
      - name: 'fs sign'
        run: bash ./fs.sh
      - name: 'jd sign'
        run: bash ./jd.sh
```

## hello world

```yml
name: 'say hello'
on: push
jobs:
  myjob:
    runs-on: ubuntu-latest
    steps:
      - name: 'hello'
        run: echo 'hello world'
```

## on

只要push时就执行

```yml
on: [ push ]
```

或者可以更简便

```yml
on: push
```

push和pull一起的情况

```yml
on: [push,pull_request]
```

main分支push时执行

```yml
on:
  push:
    branches:
      - main
```

多个分支的情况,dev分支不会触发,如果dev分支没有yml的话

```yml
on:
  push:
    branches: [dev,main]
```

仅当yml变化才触发

```yml
on:
  push:
    paths:
      - '.github/workflows/to.yml'
```

另一个比较常用的事件是定时器

### schedule和cron语法

案例

```yml
on:
  schedule:
    - cron: '30 5 * * 1,3'
    - cron: '30 5 * * 2,4'
```

五个通配符星星

分 0到59

时 0到23

日 1到31

月 1到12

周 0到6

案例语法

```sh
每天每个小时的15分运行,相当于每小时运行一次,一天能运行24次
15 * * * *

每天每个小时的15分和20分运行,相当于每小时运行两次,一天能运行48次
15,20 * * * *

在每天的第4和第5个小时的第2和第10分运行,一天能运行4次,即4:02,4:10,5:02,5:10
2,10 4,5 * * *

在每天的第4和5和6小时的30分运行,一天能运行3次
30 4-6 * * *

在每天的每个小时中，从第20分钟到59分钟每隔15分钟运行一次（即20分、35分和50分运行）
20/15 * * * *
```

实战

```sh
每天凌晨1点30分运行一次
30 1 * * *

每分钟运行一次
0/1 * * * *

每15分钟运行一次,(即0 15 30 45,一小时能运行刚好4次)
0/15 * * * *

每个月6号和8号的0点执行，即一个月两次。
0 0 6,8 * *

注意不要省略掉0，否则会执行很多次
如下，将在6号和8号的每分钟执行一次，服务器都要炸了
所以执行任务要具体到时和分
* * 6,8 * *

```

为什么只有5项?

因为年是可以省略的

## job

多个job

```yml
jobs:
  a:
    name: a job
  b:
    name: b job
```

运行的顺序

以下,job2依赖于job1,job3依赖于job1,2,即job1,2,3是依次执行的

```yml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1,job2]
```

## runs-on

```yml
runs-on: ubuntu-latest
```

环境

ubuntu-latest,ubuntu-18.04

windows-latest,windows-2019

macOS-latest,macOS-10.14

## steps

每个steps包含name,run,env

```yml
name: 'do some test'
on: 
  push:
    branches: [main]
jobs:
  myjob:
    runs-on: ubuntu-latest
    steps:
      - run: echo 'xxxx'
      - run: echo 'yyyy'
```

```yml
steps:
  - name: xxx
    run: 
```

## 变量

```yml
name: 'do some test'
on: 
  push:
    branches: [main]
jobs:
  myjob:
    runs-on: ubuntu-latest
    steps:
      - env:
          HUB: ${{toJSON(github)}}
        run: echo $HUB
```

常用

github.repository

github.actor

## 函数

contains(search,item)

startsWith(src,value)

endsWith

format

join

toJSON

fromJSON

hashFiles

状态检查函数

success()

always()

cancelled()

## 条件

```yml
jobs:
  myjbo:
    if: xxx==yyy
    runs:on:
    steps:
```

## uses和with

只有checkout才能访问仓库文件

这里fetch-depth 0是完全拉取所有历史，默认值是1，即只拉取最新一次
当然为了避免不必要的麻烦可以显示设置1比较合理些

```yml
steps:
  - uses: actions/checkout@v4
    with: 
      fetch-depth: 0
    run: ls -a
```

## git clone加速
其实也可以加depth 1，否则会默认为0
```sh
git clone --depth=1 https://xxx.git
```

## 只检出部分文件
对于只检出某些特定文件，必须mode false，如果是文件夹则可true
```yml
- uses: actions/checkout@v4
  with:
     fetch-depth: 1
     sparse-checkout: |
     sss.ps1
     ask.exe
     sparse-checkout-cone-mode: false
```

# 孤儿分支覆盖主分支

创建一个没有历史的孤儿分支，然后推送到远程，如此远程仓库历史初始化，在clone时负担将没那么重。

```sh
#1进入项目目录
cd /myrepo
```
```sh
#2创建孤儿分支，名称随意
git checkout --orphan new_branch
```
```sh
#3添加文件
git add -A
```
```sh
#4初始提交
git commit -m "init commit"
```
```sh
#5旧分支删除，可能是main或者master
git branch -D main
```
```sh
#6重命名孤儿分支到主分支
git branch -m main
```
```sh
#7远程强制推送
git push -f origin main
```

# 重置本地仓库和远程一致

```sh
git reset --hard HEAD;git clean -fd;git pull;git status
```
