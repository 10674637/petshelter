import express from 'express';
var app = express();
var port = 3000;
import { registerRoutes } from './routes.js';
import { setEnviroment } from './config/env.js';
import { connectToDB } from './config/db.js';
setEnviroment(app);
connectToDB();
registerRoutes(app);
app.get('/', function (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    return res.send('Running server in development mode.');
  } else {
    return res.sendFile('http://index.html', {
      root: __dirname + '/../dist/'
    });
  }
});
app.listen(port, function () {
  console.log("Trang MEVN app listening at http://localhost:".concat(port, " in ") + process.env.NODE_ENV + 'model!');
});