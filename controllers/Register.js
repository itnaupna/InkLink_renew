const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());

const salts = 10;
let mongo = require('../db/dbcon');

exports.registerController = {

    signUp: async (req, res) => {
        try {
            let db = await mongo.connect('member');
            let data = req.body?.inputs;
            // console.log(data);
            if (data) {
                const chks = await chkExist(db, data);
                if (chks.idDup) {
                    return res.status(400).json({ success: false, msg: '이미 사용중인 아이디입니다.' });
                }
                if (chks.nickDup) {
                    return res.status(400).json({ success: false, msg: '이미 사용중인 닉네임입니다.' });
                }
                if (data.email.length > 0 && chks.emailDup) {
                    return res.status(400).json({ success: false, msg: '이미 사용중인 이메일입니다.' });
                }

                //PW 암호화
                data.pw = await bcrypt.hash(data.pw, salts)

                //DB에 삽입
                await db.insertOne(data);
                console.log(`* 회원가입 >>> ${JSON.stringify(data)}`);
                return res.status(200).json({ success: true });
            } else {
                return res.status(400).json({ success: false, msg: '입력된 데이터가 유효하지 않습니다.' });
            }
        } catch (err) {
            console.log(`* ERR >>> ${err}`);
            res.status(500).json({ success: false, msg: '회원가입에 실패하였습니다. 잠시 후 다시 시도해보시고 오류가 계속되면 관리자에게 문의해주세요.' })
        }
        finally {
            await mongo.close();
        }
    },

    chkId: async (req, res) => {
        try {
            let db = mongo.connect('member');
            let id = req.body?.id;
            if (id) {
                if (await db.findOne({ id }))
                    res.status(400).json({ success: false, msg: '이미 존재하는 아이디입니다.' });
                else
                    res.status(200).json({ success: true });
            }
        } catch (err) {
            console.log(`* ERR >>> ${err}`);
            res.status(500).json({ success: false, msg: '중복검사를 실패하였습니다 잠시 후 다시 시도해보시고 오류가 계속되면 관리자에게 문의해주세요.' })
        }
        finally {
            await mongo.close();
        }
    },

    chkNick: async (req, res) => {
        try {
            let db = mongo.connect('member');
            let id = req.body?.nick;
            if (id) {
                if (await db.findOne({ id }))
                    res.status(400).json({ success: false, msg: '이미 존재하는 닉네임입니다.' });
                else
                    res.status(200).json({ success: true });
            }
        } catch (err) {
            console.log(`* ERR >>> ${err}`);
            res.status(500).json({ success: false, msg: '중복검사를 실패하였습니다 잠시 후 다시 시도해보시고 오류가 계속되면 관리자에게 문의해주세요.' })
        }
        finally {
            await mongo.close();
        }
    },

    chkEmail: async (req, res) => {
        try {
            let db = mongo.connect('member');
            let id = req.body?.email;
            if (id) {
                if (await db.findOne({ id }))
                    res.status(400).json({ success: false, msg: '이미 존재하는 이메일입니다.' });
                else
                    res.status(200).json({ success: true });
            }
        } catch (err) {
            console.log(`* ERR >>> ${err}`);
            res.status(500).json({ success: false, msg: '중복검사를 실패하였습니다 잠시 후 다시 시도해보시고 오류가 계속되면 관리자에게 문의해주세요.' })
        }
        finally {
            await mongo.close();
        }
    }
}

const chkExist = async (db, data) => {
    console.log(data);
    const p = [
        db.findOne({ id: data.id }),
        db.findOne({ nick: data.nick }),
        db.findOne({ email: data.email }),
    ];
    const [idDup, nickDup, emailDup] = await Promise.all(p);

    return {
        idDup: idDup !== null,
        nickDup: nickDup !== null,
        emailDup: emailDup !== null
    }
}