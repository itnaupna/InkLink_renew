const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});
const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

let mongo = require('../db/dbcon');
const { ObjectId, UUID } = require('mongodb');

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
    };
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
  },
  getUserData: async (req, res, next) => {
    try {
      const token = jwt.verify(req.cookies.t, key);
      let db = await mongo.connect('member');
      let user = await db.findOne({
        _id: new ObjectId(token[0]),
        uuid: new UUID(token[1]),
      });

      let resultData = {
        nick: '애옹',
        email: '',
        total: 0,
        current: 0,
        profile: 'default.jpg',
        role: 0,
        item: [],
      };

      if (user) {
        resultData = {
          nick: user.nick,
          email: user.email,
          total: user.total,
          current: user.current,
          profile: user.profile,
          role: user.role,
          item: user.item,
        };
      }
      req.userData = resultData;
      next();
    } catch (err) {
      console.error(`! ERR(jwt.js) >>> ${err}`);
      res.cookie('t', '', { expires: new Date(0) });
      return res.status(401).json({ msg: '유저 정보가 없습니다. 다시 로그인을 해 주세요.' });
    } finally {
      mongo.close();
    }
  },
};
