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