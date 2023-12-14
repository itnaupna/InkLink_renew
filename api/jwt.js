const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

const express = require('express');

const router = express.Router();
router.use(express.json());

exports.jwt = {
    sign: async (data) => {
        const p = {
            id: data.id,
            nick: data.nick,
            email: data.email,
        };
        const result = {
            token: jwt.sign(p, key, { expiresIn: "30m" }),
            // refreshToken: jwt.sign(p, key, { expiresIn: "1d" })
        }
        return result;
    },
    verify: async (token) => {
        let verifid;
        try{
            verifid = jwt.verify(token,key);
        }catch(err){
            console.log(err);
            return err;
        }
    }
}
