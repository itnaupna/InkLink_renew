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
        // const p = {
        //     data
        // };
        const result = {
            token: jwt.sign({ ink: data }, key, {
                // expiresIn: "30m"
            }),
        }
        return result;
    },
    verify: async (token) => {
        let verifid;
        try {
            verifid = jwt.verify(token, key);
            return verifid;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}
