exports.objId2Hex = (objectId) => {
    console.log(objectId);
    return objectId.data.map(v => v.toString(16).padStart(2, '0')).join('');
}