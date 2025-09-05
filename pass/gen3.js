const fs = require("fs");

aee0=['a','b','c','d','e','f','g','h','i','j','k','l','n','m','o','p','q','r','s','t','u','v','w','x','y','z',
'A','B','C','D','E','F','G','H','I','J','K','L','N','M','O','P','Q','R','S','T','U','V','W','X','Y','Z']
arr1=[
    '000000',
    '111111',
    '222222',
    '333333',
    '444444',
    '555555',
    '666666',
    '777777',
    '888888',
    '999999',
    '123456',
    '234567',
]
let res=""
for (let i of aee0){
    for (let j of aee0){
        for (let k of arr1){
            let s=i+j+k;
            res=res+s+"\n"
        }
    }
}
fs.writeFile("aa.txt",res,function (){})