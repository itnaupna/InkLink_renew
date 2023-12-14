const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());

const salts = 10;
let mongo = require('../db/dbcon');
const { jwt } = require('../api/jwt');

exports.loginController = {
    doLogin: async (req, res) => {
        try {
            let db = await mongo.connect('member');
            let data = req.body?.inputs;
            // data.pw = await bcrypt.hash(data.pw, salts);
            console.log(data);
            let user = await db.findOne({ id: data.id });
            if (user) {
                const isVaildPw = await bcrypt.compare(data.pw, user.pw);
                if (isVaildPw) {
                    //jwt처리 후 토큰반환
                    // const token = await getJwtToken(user);
                    // console.log(token);
                    return res.status(200).json({ success: true, token:await getJwtToken(user)});
                }
                else {
                    return res.status(401).json({ success: false, msg: '아이디 또는 비밀번호를 다시 확인해주세요.' });
                }
            } else {
                return res.status(401).json({ success: false, msg: '아이디 또는 비밀번호를 다시 확인해주세요.' });
            }
        } catch (err) {
            return res.status(500).json({ success: false, msg: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' });
        } finally {
            mongo.close();
        }
    }
}


const getJwtToken = async (data) =>{
    return (await jwt.sign(data)).token;
}