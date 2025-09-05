const fs = require("fs");


y = 2050
m = 0;
d = 0;

function zeroize(obj) {
    if (obj < 10) {
        return '0' + obj
    } else {
        return obj
    }
}

let temp = 0;
let write = ""
for (let i = 48; i <= 122; i++) {
    if (i>=58&&i<=63)continue;
    if (i>=91&&i<=96)continue;
    for (let j = 48; j <= 122; j++) {
        if (j>=58&&j<=63)continue;
        if (j>=91&&j<=96)continue;
        var ii=String.fromCharCode(i);
        var jj=String.fromCharCode(j);
        let res=""+ii+ii+ii+ii+jj+jj+jj+jj
        if (temp === 0)
            write = write + res;
        else
            write = write + "\n" + res;
        temp += 1;
    }
}
fs.writeFile("txt2.txt", write, function () {
})
console.log("密码数:" + temp)