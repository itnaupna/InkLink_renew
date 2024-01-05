const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

exports.objId2Hex = (objectId) => {
    console.log(objectId);
    return objectId.data.map(v => v.toString(16).padStart(2, '0')).join('');
}

exports.getGuestNick = () => {
    const db = require('../res/guest.json');
    return `${db.v[Math.floor(Math.random() * db.v.length)]} ${db.a[Math.floor(Math.random() * db.a.length)]}`
}

exports.generateRes = (raw) => {
    // raw 문자열을 배열로 변환
    const rawArray = raw.split('');

    // 각 문자 사이에 16진수를 추가
    let resArray = [];
    let hexValue = parseInt(rawArray[rawArray.length - 1], 16);

    for (let i = 0; i < rawArray.length - 1; i++) {
        resArray.push(rawArray[i]);
        resArray.push(hexValue.toString(16));
        hexValue = (hexValue + 1) % 16;
    }

    // 마지막 문자 추가
    resArray.push(rawArray[rawArray.length - 1]);

    // 배열을 문자열로 변환하여 반환
    return resArray.join('');
}

exports.generateRaw = (res) => {
    let result=  '';
    for(let i = 0; i<res.length; i++){
        if(i%2===0){
            result += res[i];
        }
    }
    return result;
}
