const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const common = require('oci-common');
const os = require('oci-objectstorage');
const sharp = require('sharp');

const bInfo = {
    bucketName: process.env.BKNAME,
    bucketCID: process.env.BKCID,
    nameSpace: process.env.BKNAMESPACE,
}

exports.bucketController = {
    upload: async (req, res) => {
        try {
            const provider = new common.ConfigFileAuthenticationDetailsProvider(path.resolve(__dirname, 'config'), "DEFAULT");
            const client = new os.ObjectStorageClient({ authenticationDetailsProvider: provider });
            const resizedImg = await sharp(req.file.buffer)
            .resize({
                width:250,
                height: 250,
                fit:'inside'
            }).toFormat('png')
            .toBuffer();

            console.log(req.cookies.t || "없음");
            console.log(`${req.file.originalname}, ${req.file.mimetype}`);
            //업로드한 날짜시각의 역순
            //23122110471 => 17401122132
            let fileDate = (Number(new Date().toISOString().replace(/[-T:]/g, '').slice(0, -6).slice(2)) + 9000).toString().split('').reverse().join('');

            let response = await client.putObject({
                bucketName: bInfo.bucketName,
                namespaceName: bInfo.nameSpace,
                objectName: `profile/${req.userData.nick}_${fileDate}.png`,
                putObjectBody: resizedImg,
                contentType: 'image/png',
            });
            return res.status(200).json({msg:"업로드 성공"});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({msg:"업로드를 실패하였습니다."});
        }
    },
    multer2: multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 },
    })
}

