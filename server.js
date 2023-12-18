require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 2320;
const registerRouter = require('./routers/Register');
const loginRouter = require('./routers/Login');
const cookieParser = require('cookie-parser');
// let db = require('./dbcon');
// let a = await db.connect('ink');

// app.use(routes);
app.use(cookieParser());

app.listen(port, async () => {
  console.log(`* 서버 시작 >>> ${port} 포트`);

});


app.use(express.static(path.join(__dirname, 'front/build')));
app.use(registerRouter);
app.use(loginRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});

