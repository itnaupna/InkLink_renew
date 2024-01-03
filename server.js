require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 2320;
const registerRouter = require('./routers/Register');
const loginRouter = require('./routers/Login');
const bucketRouter = require('./routers/Bucket');
const lobbyRouter = require('./routers/Lobby');
const cookieParser = require('cookie-parser');
const { createServer } = require('node:http');
const server = createServer(app);
const socket = require('./api/socket');

// let db = require('./dbcon');
// let a = await db.connect('ink');

// app.use(routes);
app.use(cookieParser());
socket(server);

server.listen(port, async () => {
  console.log(`* 서버 시작 >>> ${port} 포트`);
});

app.use(express.static(path.join(__dirname, 'front/build')));
app.use(registerRouter);
app.use(loginRouter);
app.use(bucketRouter);
app.use(lobbyRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});
