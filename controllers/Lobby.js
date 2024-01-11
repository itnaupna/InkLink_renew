const mongo = require('../db/dbcon');

exports.lobbyController = {
  notice: async (req, res) => {
    try {
      let db = await mongo.connect('notice');
      let notice = await db.find().toArray();
      res.status(200).json({ success: true, notice });
    } catch (err) {
      console.log(`* ERR >>> ${err}`);
      res.status(500).json({ success: false, msg: '공지사항 목록 생성에 문제가 발생했습니다.' });
    } finally {
      await mongo.close();
    }
  },
};
