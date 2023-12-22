const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
router.use(express.json());

const salts = 10;
let mongo = require('../db/dbcon');
const { jwt } = require('../api/jwt');
const { ObjectId, UUID } = require('mongodb');
const { getGuestNick } = require('../api/etc');

exports.loginController = {
    doFreshLogin: async (req, res) => {
        try {
            let db = await mongo.connect('member');
            let data = req.body?.inputs;
            // data.pw = await bcrypt.hash(data.pw, salts);
            console.log(data);
            let user = await db.findOne({ id: data.id });
            if (user) {
                const isVaildPw = await bcrypt.compare(data.pw, user.pw);
                if (isVaildPw) {
                    //jwt 생성 후 쿠키설정 및 정보반환
                    const token = await getJwtToken([user._id, user.uuid]);
                    res.cookie('t', token, { httpOnly: true });
                    const data = {
                        nick: user.nick,
                        email: user.email,
                        total: user.total,
                        current: user.current,
                        profile: user.profile,
                        role: user.role,
                        item: user.item
                    }
                    return res.status(200).json({ success: true, data });
                }
                else {
                    res.cookie('t', '', { httpOnly: true });
                    return res.status(401).json({ success: false, msg: '아이디 또는 비밀번호를 다시 확인해주세요.' });
                }
            } else {
                res.cookie('t', '', { httpOnly: true });
                return res.status(401).json({ success: false, msg: '아이디 또는 비밀번호를 다시 확인해주세요.' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, msg: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' });
        } finally {
            mongo.close();
        }
    },
    doReconnect: async (req, res) => { 
        let resultData;
        try {
            let tokenStr = req.cookies.t;
            if (!tokenStr) return;
            let db = await mongo.connect('member');
            const token = (await jwt.verify(tokenStr)).ink;
            let user  = null;
            try {
                user = await db.findOne({
                    _id: new ObjectId(token[0]),
                    uuid: new UUID(token[1])
                });

                if (user) {
                    resultData = {
                        nick: user.nick,
                        email: user.email,
                        total: user.total,
                        current: user.current,
                        profile: user.profile,
                        role: user.role,
                        item: user.item
                    };
                }
            }
            catch {
                resultData = {
                    nick: '애옹',
                    email: '',
                    total: 0,
                    current: 0,
                    profile: 'default.jpg',
                    role: 0,
                    item: []
                }
            }

        }
        catch (err) {
            res.cookie('t', '', { expires: new Date(0) });
            console.error(`! ERR >>> ${err}`);
        }
        finally {
            mongo.close();
            return res.status(200).json(resultData);
        }
    },
    //DONOTUSE
    //미완성
    doGuestLogin: async (req, res) => {
        const token = await getJwtToken([new ObjectId(), new UUID()]);
        console.log(getGuestNick());
        const data = {
            nick: getGuestNick(),
            email: '',
            total: 0,
            current: 0,
            profile: 'default.jpg',
            role: 0,
            item: []
        }

        res.cookie('t', token, { httpOnly: true });
        return res.status(200).json({ success: true, data });
    }
}

const getJwtToken = async (data) => {
    return (await jwt.sign(data)).token;
}

