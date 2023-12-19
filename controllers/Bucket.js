const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const AWS = require('aws-sdk');

const bucketOption = {
    region: process.env.BKREGION,
    endpoint: `https://${process.env.BKNAMESPACE}.compat.objectstorage.${process.env.BKREGION}.oraclecloud.com`,
    accessKeyId: process.env.BKACCESSKEY,
    secretAccessKey: process.env.BKSECRET,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
}
const bucketName = process.env.BKNAME;

exports.bucketController = {
    upload: async (req,res) => {
        const s3 = new AWS.S3(bucketOption);
        
    },
    test: async(req,res)=>{
        const s3 = new AWS.S3(bucketOption);

        return res.status(200).json();
    }
}

