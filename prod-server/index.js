import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
var port = process.env.PORT || 3000;
import { registerRoutes } from './routes.js';
import { setEnviroment } from './config/env.js';
import { connectToDB } from './config/db.js';
setEnviroment(app);
connectToDB();
registerRoutes(app);
app.route('/*').get(function (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    app.get('/', function (req, res) {
      return res.send('Running server in development mode.');
    });
  } else {
    return res.sendFile(path.join(__dirname + '/../dist/index.html'));
  }
});
app.listen(port, function () {
  console.log("Trang MEVN app listening at http://localhost:".concat(port, " in ") + process.env.NODE_ENV + 'model!');
});