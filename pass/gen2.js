const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('top2000.txt'),
    output: process.stdout,
    terminal: false
});

let s=""
rl.on('line', (line) => {
    line=line.trim()
    s=s+line+"\n";
});
setTimeout(function (){
    fs.writeFile("top.txt",s,function (){})
},3000)
