//文件转数组,带j为1,否则为0

const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('mail.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split("\n");

    var acT=[]
    // print all lines
    lines.forEach((line) => {
        if(line.indexOf("j")!=-1){
            acT.push(1)
        }else {
            acT.push(0)
        }
    });
    console.log(JSON.stringify(acT));
    console.log(acT.length);
} catch (err) {
    console.error(err);
}